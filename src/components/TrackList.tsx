import { FunctionalComponent } from 'preact'
import { formatDuration } from 'date-fns'

import './TrackList.scss'

export type Track = {
  audio: Blob
  duration: number
  id: string
  name: string
}

type Props = {
  onPlay: (name: Track['name']) => unknown
  tracks: Track[]
}

const TrackList: FunctionalComponent<Props> = ({ onPlay, tracks }) => {
  const play = (name: string) => () => onPlay(name)

  return (
    <ol class="track-list">
      {tracks.map((t) => (
        <li key={t.id} onClick={play(t.id)}>
          <p class="track-title">{t.name}</p>
          <p class="track-duration">
            {formatDuration(
              { seconds: Math.ceil(t.duration / 1000) },
              { format: ['seconds'] }
            )}
          </p>
        </li>
      ))}
    </ol>
  )
}

export default TrackList
