import { FunctionalComponent } from 'preact'

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
    <ol class="tracklist">
      {tracks.map((t) => (
        <li key={t.id} onClick={play(t.id)}>
          <p>{t.name}</p>
        </li>
      ))}
    </ol>
  )
}

export default TrackList
