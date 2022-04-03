import { render } from 'preact'
import App from './components/App'
import './index.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch((err) => console.log(err))
}

render(<App />, document.getElementById('app')!)
