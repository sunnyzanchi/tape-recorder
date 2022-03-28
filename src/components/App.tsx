import TrackList from './TrackList'

const tracks = [
  { name: 'ABC' },
  { name: 'DEF' },
  { name: 'GHI' },
  { name: 'KLM' },
]

const App = () => {
  return (
    <>
      <TrackList tracks={tracks} />
    </>
  )
}

export default App
