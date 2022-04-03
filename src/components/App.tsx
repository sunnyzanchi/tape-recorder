import cx from 'classnames'

import TrackList from './TrackList'
import useAudioEngine, { State } from './useAudioEngine'

import db, { Track } from '../db'

if (process.env.NODE_ENV) {
  // @ts-expect-error
  window.db = db
}

const App = () => {
  const { play, status, toggleRecord, tracks } = useAudioEngine()
  const recording = status === State.RECORDING

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

      <TrackList onPlay={play} onEditName={changeName} tracks={tracks} />
      <button class={cx('record', { recording })} onClick={toggleRecord}>
        <p>{recording ? 'STOP' : 'REC'}</p>
        {recording && <div class="recording">Recording</div>}
      </button>
    </>
  )
}

export default App
