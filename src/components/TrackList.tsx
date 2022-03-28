import { FunctionalComponent } from 'preact'

import './TrackList.css'

type Track = {
  name: string
}

type Props = {
  tracks: Track[]
}

const TrackList: FunctionalComponent<Props> = ({ tracks }) => (
  <ol>
    {tracks.map((t) => (
      <li>{t.name}</li>
    ))}
  </ol>
)

export default TrackList
