import TrackList from './TrackList'
import useAudioEngine, { State } from './useAudioEngine'

import db from '../db'

if (process.env.NODE_ENV) {
  // @ts-expect-error
  window.db = db
}

const App = () => {
  const { play, status, toggleRecord, tracks } = useAudioEngine()
  return (
    <>
      {/* for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{State[status]}</div>
          <button onClick={() => db.deleteAll()} style={{ font: 'monospace' }}>
            rm -rf
          </button>
        </div>
      )}

      <TrackList onPlay={play} tracks={tracks} />
      <button class="record" onClick={toggleRecord}>
        REC
      </button>
    </>
  )
}

export default App
