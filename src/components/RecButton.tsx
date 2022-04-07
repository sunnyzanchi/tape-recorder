import { animated, config, useSpring } from 'react-spring'
import { useReduceMotion } from 'react-reduce-motion'

type Props = {
  onClick: JSX.MouseEventHandler<HTMLButtonElement>
  recording: boolean
}

const inSpring = { friction: 11, mass: 1, tension: 240 }
const outSpring = config.stiff

const RecButton = ({ onClick, recording, ...rest }: Props) => {
  const prefersReducedMotion = useReduceMotion()
  const slide = recording && !prefersReducedMotion

  const springAnimation = useSpring({
    skipAnimation: false,
    config: recording ? inSpring : outSpring,
    // TODO: the opacity animation when the user prefers
    // reduced motion looks bad bc it hits white, then wiggles
    opacity: recording ? 1 : 0,
    transform: slide ? 'translateY(0px)' : 'translateY(10px)',
  })

  return (
    <button
      aria-label={recording ? 'Stop' : 'Record'}
      className="record"
      onClick={onClick}
      {...rest}
    >
      <p>{recording ? 'STOP' : 'REC'}</p>
      <animated.div class="recording" style={springAnimation}>
        Recording
      </animated.div>
    </button>
  )
}

export default RecButton
