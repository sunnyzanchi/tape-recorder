import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'preact/hooks'
import { v4 as uuidv4 } from 'uuid'

import { Track } from './TrackList'

type ObjectOf<T> = { [key: string]: T }
type AudioState = ObjectOf<boolean>

export enum Status {
  ERROR,
  FINISHED_RECORDING,
  IDLE,
  PLAYING,
  RECORDING,
  SAVING_AUDIO,
  SWITCHING_TRACKS,
  WAITING_ON_MIC_ACCESS,
}

const CONSTRAINTS = { audio: true, video: false }

const getStatus = (state: AudioState): Status => {
  const { audioReady, mediaRecorder, playing, recording, switchTo } = state

  if (playing && switchTo) return Status.SWITCHING_TRACKS
  if (playing) return Status.PLAYING
  if (!recording && !mediaRecorder && !playing) return Status.IDLE
  // `recording` gets set to true first and we have to wait
  // for the Promise from getUserMedia to resolve.
  // This is the WAITING_ON_MIC_ACCESS status.
  // Once the Promise resolves, mediaRecorder is set
  // and the engine starts recording audio
  if (recording && mediaRecorder) return Status.RECORDING
  if (recording && !mediaRecorder) return Status.WAITING_ON_MIC_ACCESS
  // When the user stops recording, not all chunks of audio
  // are ready yet. We have to wait for mediaRecorder.onstop to fire
  if (!recording && mediaRecorder && !audioReady)
    return Status.FINISHED_RECORDING

  // After mediaRecorder.onstop fires, we can collect
  // the audio chunks and produce a finished track
  if (!recording && mediaRecorder && audioReady) return Status.SAVING_AUDIO
  // Something is not right, we should not get here
  console.error(
    `undefined state! Here's the state that got us here: ${Object.keys(
      state
    ).map((k) => `${k}: ${state[k]}`)}`
  )
  return Status.ERROR
}

const makeTrack = ({
  audio,
  duration,
}: {
  audio: Blob
  duration: number
}): Track => ({
  id: uuidv4(),
  audio,
  duration,
  name: format(new Date(), 'MMMM do yyyy @ h:mma'),
})

interface AudioEngine {
  play: (trackId: string) => void
  status: Status
  toggleRecord: () => void
  tracks: Track[]
}

const useAudioEngine = (): AudioEngine => {
  // This has the stream from getUserMedia once the Promise resolves
  // This is true once we have the final chunk from getUserMedia
  const [audioReady, setAudioReady] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [stopTime, setStopTime] = useState<number | null>(null)
  const [switchTo, setSwitchTo] = useState<string | null>(null)
  const [tracks, setTracks] = useState(new Map<string, Track>())
  const audio = useRef<HTMLAudioElement>()
  // This gets filled up with Blobs as mediaRecorder records.
  // We later consilidate it into one Blob, which is the binary data
  // that can be written out as a file
  const chunks = useRef<Blob[]>([])

  const status = getStatus({
    audioReady,
    mediaRecorder: Boolean(mediaRecorder),
    playing: Boolean(playing),
    recording,
    switchTo: Boolean(switchTo),
  })

  useEffect(() => {
    if (status === Status.IDLE) {
      audio.current?.pause()
      return
    }

    // This is the first step after the user presses record.
    // Prompt user for mic access,
    // then store MediaRecorder in state once we get it
    if (status === Status.WAITING_ON_MIC_ACCESS) {
      navigator.mediaDevices
        .getUserMedia(CONSTRAINTS)
        .then((stream) => {
          setMediaRecorder(new MediaRecorder(stream))
        })
        .catch((err) => console.error(err))
      return
    }

    // Once we have mic access, start recording.
    // Also hang onto the start and stop times so we can
    // calculate duration later
    if (status === Status.RECORDING) {
      // If a track is playing when the user hits record,
      // we want to stop it
      audio.current?.pause()

      mediaRecorder!.onstart = ({ timeStamp }) => setStartTime(timeStamp)
      mediaRecorder!.onstop = ({ timeStamp }) => {
        setAudioReady(true)
        setStopTime(timeStamp)
      }
      mediaRecorder!.ondataavailable = ({ data }) => chunks.current.push(data)

      mediaRecorder!.start()
      return
    }

    // Stop recording and create the final audio track.
    // Then add it to the list of tracks
    if (status === Status.FINISHED_RECORDING) {
      // TODO: Remove these !s by typeguarding correctly
      mediaRecorder!.stop()
    }

    // This waits for mediaRecorder.onstop to fire.
    // Create the final audio track.
    // Then add it to the list of tracks
    if (status === Status.SAVING_AUDIO) {
      const audio = new Blob(chunks.current, {
        type: mediaRecorder!.mimeType,
      })
      const track = makeTrack({ audio, duration: startTime! - stopTime! })

      setTracks((ts) => new Map(ts).set(track.id, track))
      setMediaRecorder(null)
      setAudioReady(false)
      // If chunks isn't reset, every recording will be cumulative.
      // It was a funny bug when i was first testing recording
      chunks.current = []
      return
    }

    if (status === Status.SWITCHING_TRACKS) {
      audio.current?.pause()
      setPlaying(switchTo)
      setSwitchTo(null)
      return
    }

    if (status === Status.PLAYING) {
      const trackToPlay = tracks.get(playing!)
      if (!trackToPlay) {
        console.error(`Couldn't get track with id ${playing} from track list`)
        return
      }

      const url = URL.createObjectURL(trackToPlay.audio)
      audio.current = new Audio(url)
      audio.current.play()
      audio.current.onended = () => setPlaying(null)
      return
    }
  }, [status])

  return {
    play: (trackId: string) => {
      setRecording(false)
      if (playing) {
        setSwitchTo(trackId)
      } else {
        setPlaying(trackId)
      }
    },
    status,
    toggleRecord: () => {
      setPlaying(null)
      setRecording((r) => !r)
    },
    tracks: Array.from(tracks.values()),
  }
}

export default useAudioEngine
