import { useEffect, useState } from 'preact/hooks'
import { useReduceMotion } from 'react-reduce-motion'
import { Globals } from 'react-spring'

import RecButton from './RecButton'
import TrackList from './TrackList'
import useAudioEngine, { State } from './useAudioEngine'

import db, { Track } from '../db'

if (process.env.NODE_ENV) {
  // @ts-expect-error
  window.db = db
}

const App = () => {
  const prefersReducedMotion = useReduceMotion()
  const [searchTerm, setSearchTerm] = useState<string | null>(null)
  const { play, status, toggleRecord, tracks } = useAudioEngine()
  const recording = status === State.RECORDING

  useEffect(() => {
    Globals.assign({ skipAnimation: prefersReducedMotion })
  }, [prefersReducedMotion])

  const changeName = (name: string, track: Track) => {
    const newTrack = {
      ...track,
      name,
    }
    db.tracks.put(newTrack)
  }

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
        onEditName={changeName}
        tracks={
          searchTerm
            ? tracks.filter((t) => t.name.includes(searchTerm))
            : tracks
        }
      />
      <RecButton onClick={toggleRecord} recording={recording} />
    </>
  )
}

export default App
