import { format, formatDuration } from 'date-fns'
import { FunctionalComponent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { Track } from '../db'
import { TrackDisplay } from './types'

type Props = {
  onCollapse: () => unknown
  onPlay: (id: Track['id']) => unknown
  onUpdate: (track: Track) => unknown
  track: TrackDisplay
}

const ExpandedTrack: FunctionalComponent<Props> = ({
  onCollapse,
  onPlay,
  onUpdate,
  track,
}) => {
  const [name, setName] = useState(track.name)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef.current])

  const updatedTrack = () => ({ ...track, name })

  const update = (track: Track) => {
    onUpdate(track)
    setName(track.name)
  }

  return (
    <li class="expanded">
      <button className="play-button" onClick={() => onPlay(track.id)}>
        <div className={track.playing ? 'pause-icon' : 'play-icon'} />
      </button>

      <div className="track-info" onClick={onCollapse}>
        {/* <p class="track-name">{track.name}</p> */}
        <input
          class="track-name"
          onChange={(e) => setName(e.currentTarget.value)}
          onFocus={() => inputRef.current?.select()}
          onKeyDown={(e) => e.key === 'Enter' && update(updatedTrack())}
          ref={inputRef}
          value={name}
        />

        <p class="track-duration">
          {formatDuration(
            { seconds: Math.ceil(track.duration / 1000) },
            { format: ['seconds'] }
          )}
        </p>

        <p className="track-created-date">
          {`created on ${format(track.created, 'MMM do yyyy')}`}
        </p>
      </div>
    </li>
  )
}

export default ExpandedTrack
