import { formatDuration } from 'date-fns'
import { FunctionalComponent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { Track } from '../db'
import './TrackList.scss'

type Props = {
  onPlay: (name: Track['name']) => unknown
  onEditName: (name: string, track: Track) => void
  tracks: Track[]
}

const TrackList: FunctionalComponent<Props> = ({
  onEditName,
  onPlay,
  tracks,
}) => {
  const [editing, setEditing] = useState<string | null>(null)
  const [name, setName] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing, inputRef])

  const editName = (track: Track) => () => {
    setEditing(track.id)
    setName(track.name)
  }

  const play = (id: string) => onPlay(id)

  const saveChanges = (track: Track) => {
    onEditName(name, track)
    setEditing(null)
    setName('')
  }

  return (
    <ol class="track-list">
      {tracks.map((t) => (
        <li
          key={t.id}
          onClick={(e) =>
            // Don't play if we're clicking on the name to edit
            !(e.target as HTMLElement).classList.contains('track-name') &&
            play(t.id)
          }
        >
          {editing === t.id ? (
            <input
              class="track-name"
              onChange={(e) => setName(e.currentTarget.value)}
              onFocus={() => inputRef.current?.select()}
              onKeyDown={(e) => e.key === 'Enter' && saveChanges(t)}
              ref={inputRef}
              value={name}
            />
          ) : (
            <p class="track-name" onClick={editName(t)}>
              {t.name}
            </p>
          )}

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
