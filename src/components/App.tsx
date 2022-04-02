import TrackList from './TrackList'
import useAudioEngine, { State } from './useAudioEngine'

const App = () => {
  const { play, status, toggleRecord, tracks } = useAudioEngine()

  return (
    <>
      {/* for debugging */}
      {process.env.NODE_ENV === 'development' && <div>{State[status]}</div>}
      <TrackList onPlay={play} tracks={tracks} />

      <button class="record" onClick={toggleRecord}>
        REC
      </button>
    </>
  )
}

export default App
