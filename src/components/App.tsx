import { useState } from 'preact/hooks'

import RecButton from './RecButton'
import TrackList, { TrackDisplay } from './TrackList'
import useAudioEngine, { State } from './useAudioEngine'

import db, { Track } from '../db'

if (process.env.NODE_ENV) {
  // @ts-expect-error
  window.db = db
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null)
  const {
    play,
    status: [status, { currentTrack }],
    toggleRecord,
    tracks,
  } = useAudioEngine()
  const recording = status === State.RECORDING

  const update = (track: Track) => {
    db.tracks.put(track)
  }

  const tracksDisplay: TrackDisplay[] = tracks.map((t) => ({
    ...t,
    playing: t.id === currentTrack,
  }))

  return (
    <>
      {/* for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 24px',
          }}
        >
          <div>{State[status]}</div>
          <button onClick={() => db.deleteAll()} style={{ font: 'monospace' }}>
            rm -rf
          </button>
        </div>
      )}

      <input
        class="search"
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        placeholder="Search"
        value={searchTerm ?? ''}
      />

      <TrackList
        onPlay={play}
        onUpdate={update}
        tracks={
          searchTerm
            ? tracksDisplay.filter((t) => t.name.includes(searchTerm))
            : tracksDisplay
        }
      />
      <RecButton onClick={toggleRecord} recording={recording} />
    </>
  )
}

export default App
