import { formatDuration } from 'date-fns'
import { FunctionalComponent } from 'preact'

import { Track } from '../db'
import { TrackDisplay } from './types'

type ShortTrackProps = {
  onExpand: (id: Track['id']) => unknown
  onPlay: (id: Track['id']) => unknown
  track: TrackDisplay
}

const ShortTrack: FunctionalComponent<ShortTrackProps> = ({
  onExpand,
  onPlay,
  track: track,
}) => (
  <li key={track.id}>
    <button className="play-button" onClick={() => onPlay(track.id)}>
      <div className={track.playing ? 'pause-icon' : 'play-icon'} />
    </button>

    <div className="track-info" onClick={() => onExpand(track.id)}>
      <p class="track-name">{track.name}</p>

      <p class="track-duration">
        {formatDuration(
          { seconds: Math.ceil(track.duration / 1000) },
          { format: ['seconds'] }
        )}
      </p>
    </div>
  </li>
)

export default ShortTrack
