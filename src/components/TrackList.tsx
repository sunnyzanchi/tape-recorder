import { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'

import { Track } from '../db'
import ExpandedTrack from './ExpandedTrack'
import ShortTrack from './ShortTrack'
import { TrackDisplay } from './types'
import './TrackList.scss'

type Props = {
  onPlay: (name: Track['name']) => unknown
  onEditName: (name: string, track: Track) => unknown
  onUpdate: (track: Track) => unknown
  tracks: TrackDisplay[]
}

const TrackList: FunctionalComponent<Props> = ({
  onUpdate,
  onPlay,
  tracks,
}) => {
  const [expanded, setExpanded] = useState<Track['id'] | null>()

  const collapse = () => setExpanded(null)

  const expand = (id: Track['id']) => setExpanded(id)

  const play = (id: Track['id']) => onPlay(id)

  const saveChanges = (track: Track) => onUpdate(track)

  return (
    <ol class="track-list">
      {tracks.map((t) =>
        t.id === expanded ? (
          <ExpandedTrack
            onCollapse={collapse}
            onPlay={play}
            onUpdate={saveChanges}
            track={t}
          />
        ) : (
          <ShortTrack onExpand={expand} onPlay={play} track={t} />
        )
      )}
    </ol>
  )
}

export default TrackList
