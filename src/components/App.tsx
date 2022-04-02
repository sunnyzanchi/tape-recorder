import { useDexie } from 'use-dexie'

import TrackList from './TrackList'
import useAudioEngine, { Status } from './useAudioEngine'

const DB_NAME = 'REC_DB'
const DB_SCHEMA = {
  // `audio` is omitted, the docs say not to index binary data
  tracks: 'created, duration, &id, name',
}

const App = () => {
  // Initialize local database
  useDexie(DB_NAME, DB_SCHEMA)
  const { play, status, toggleRecord, tracks } = useAudioEngine()

  return (
    <>
      {/* for debugging */}
      {process.env.NODE_ENV === 'development' && <div>{Status[status]}</div>}
      <TrackList onPlay={play} tracks={tracks} />

      <button class="record" onClick={toggleRecord}>
        REC
      </button>
    </>
  )
}

export default App
