import TrackList from './TrackList'
import useAudioEngine, { Status } from './useAudioEngine'

const App = () => {
  const { play, status, toggleRecord, tracks } = useAudioEngine()

  return (
    <>
      {/* for debugging */}
      <div>{Status[status]}</div>
      <TrackList onPlay={play} tracks={tracks} />

      <button class="record" onClick={toggleRecord}>
        REC
      </button>
    </>
  )
}

export default App
