import useStateMachine, { t } from '@cassiozen/usestatemachine'
import { format } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRef, useState } from 'preact/hooks'
import { nanoid } from 'nanoid'

import db, { Track } from '../db'

// These trigger transitions between states
// of the state machine.
enum Event {
  AUDIO_READY = 'AUDIO_READY',
  ERROR = 'ERROR',
  IDLE = 'IDLE',
  PLAY = 'PLAY',
  RECORD = 'RECORD',
  STOP_RECORDING = 'STOP_RECORDING',
}

// These are the possible states
// of the state machine.
export enum State {
  ERROR = 'ERROR',
  FINISHED_RECORDING = 'FINISHED_RECORDING',
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  RECORDING = 'RECORDING',
  SAVING_AUDIO = 'SAVING_AUDIO',
  WAITING_ON_MIC_ACCESS = 'WAITING_ON_MIC_ACCESS',
}

const CONSTRAINTS = { audio: true, video: false }

const makeTrack = ({
  audio,
  duration,
}: {
  audio: Blob
  duration: number
}): Track => ({
  id: nanoid(),
  audio,
  created: new Date(),
  duration,
  name: format(new Date(), 'MMMM do yyyy @ h:mma'),
})

interface AudioEngine {
  play: (trackId: string) => void
  status: State
  toggleRecord: () => void
  tracks: Track[]
}

const useAudioEngine = (): AudioEngine => {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [stopTime, setStopTime] = useState<number | null>(null)
  const addTrack = (track: Track) => db.addTrack(track)
  const tracks = useLiveQuery(() => db.getTracks()) ?? new Map()
  const audio = useRef<HTMLAudioElement | null>()
  // This gets filled up with Blobs as mediaRecorder records.
  // We later consolidate it into one Blob, which is the binary data
  // that can be written out as a file
  const chunks = useRef<Blob[]>([])
  // Holds the stream from getUserMedia once the Promise resolves
  const mediaRecorder = useRef<MediaRecorder | null>()

  const [state, send] = useStateMachine({
    initial: State.IDLE,
    schema: {
      events: {
        [Event.ERROR]: t<{ error: unknown; state: State }>(),
        [Event.PLAY]: t<{ value: string }>(),
      },
    },
    states: {
      // We aren't doing anything.
      // No audio is playing, the user isn't waiting for recording to start.
      [State.IDLE]: {
        on: {
          [Event.RECORD]: State.WAITING_ON_MIC_ACCESS,
          [Event.PLAY]: State.PLAYING,
        },
      },

      // This is the first step after the user presses record.
      // Prompt user for mic access,
      // then store MediaRecorder in state once we get it
      // and transition to the RECORDING state.
      [State.WAITING_ON_MIC_ACCESS]: {
        effect: ({ send }) => {
          navigator.mediaDevices
            .getUserMedia(CONSTRAINTS)
            .then((stream) => {
              mediaRecorder.current = new MediaRecorder(stream)
              send(Event.RECORD)
            })
            // The user can deny mic access,
            // so this may not be an actual error.
            .catch((err) =>
              send({
                error: err,
                state: State.WAITING_ON_MIC_ACCESS,
                type: Event.ERROR,
              })
            )
        },
        on: {
          [Event.ERROR]: State.ERROR,
          [Event.RECORD]: State.RECORDING,
        },
      },

      // Once we have mic access, start recording.
      // Also hang onto the start and stop times so we can
      // calculate duration later.
      [State.RECORDING]: {
        effect: ({ send }) => {
          if (mediaRecorder.current == null) {
            send({
              error: 'Tried to start recording but `mediaRecorder` is null!',
              state: State.RECORDING,
              type: Event.ERROR,
            })
            return
          }

          mediaRecorder.current.onstart = ({ timeStamp }) =>
            setStartTime(timeStamp)
          mediaRecorder.current.onstop = ({ timeStamp }) => {
            setStopTime(timeStamp)
            send(Event.AUDIO_READY)
          }
          mediaRecorder.current.ondataavailable = ({ data }) =>
            chunks.current.push(data)

          mediaRecorder.current.start()

          return () => {
            mediaRecorder.current?.stop()
          }
        },

        on: {
          [Event.ERROR]: State.ERROR,
          [Event.STOP_RECORDING]: State.FINISHED_RECORDING,
        },
      },

      // This is just an intermediate state.
      // The user has stopped recording,
      // but we have to wait on mediaRecorder.onstop to fire
      // before we can save audio, so we wait here.
      [State.FINISHED_RECORDING]: {
        on: { [Event.AUDIO_READY]: State.SAVING_AUDIO },
      },

      // We transition to this state from mediaRecorder.onstop.
      // Create the final audio track.
      // Then add it to the list of tracks.
      [State.SAVING_AUDIO]: {
        effect: ({ send }) => {
          const audio = new Blob(chunks.current, {
            type: mediaRecorder.current?.mimeType,
          })
          const track = makeTrack({ audio, duration: stopTime! - startTime! })

          addTrack(track)
          send(Event.IDLE)

          return () => {
            mediaRecorder.current = null
            // If chunks isn't reset, every recording will be cumulative.
            // It was a funny bug when i was first testing recording.
            chunks.current = []
          }
        },
        on: { [Event.IDLE]: State.IDLE },
      },

      // Before i switched to using a state machine,
      // there was an intermediate state when switching
      // tracks while playing.
      // This is no longer required!
      // The state machine will happily go from
      // PLAYING -> PLAYING.
      [State.PLAYING]: {
        effect: ({ event, send }) => {
          // If we're already playing a track and
          // we recieve an event to play another one,
          // we should clean up the old track first.
          if (audio.current) {
            // TODO: Might need to do this? Not sure
            // audio.current.onended = null;
          }

          const trackId = event.value
          const trackToPlay = tracks.get(trackId)
          if (!trackToPlay) {
            console.error(
              `Couldn't get track with id ${trackId} from track list`
            )
            send(Event.IDLE)
            return
          }

          const url = URL.createObjectURL(trackToPlay.audio)

          audio.current = new Audio(url)
          audio.current.play()
          audio.current.onended = () => send(Event.IDLE)

          return () => {
            if (audio.current) {
              audio.current.onended = null
              audio.current.pause()
              audio.current = null
            }
          }
        },
        on: {
          [Event.IDLE]: State.IDLE,
          [Event.PLAY]: State.PLAYING,
          [Event.RECORD]: State.WAITING_ON_MIC_ACCESS,
        },
      },

      [State.ERROR]: {
        effect: ({ event, send }) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(
              `Somethin's fucky. The ${event.state} state errored:`,
              event.error
            )
          }
          send(Event.IDLE)
        },
      },
    },
  })

  return {
    play: (trackId: string) => send({ type: Event.PLAY, value: trackId }),
    status: state.value,
    toggleRecord: () => {
      if (state.value === State.RECORDING) {
        send(Event.STOP_RECORDING)
      } else {
        send(Event.RECORD)
      }
    },
    tracks: Array.from(tracks.values()),
  }
}

export default useAudioEngine
