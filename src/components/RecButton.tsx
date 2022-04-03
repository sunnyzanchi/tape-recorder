import { animated, config, useSpring } from 'react-spring'

type Props = {
  onClick: JSX.MouseEventHandler<HTMLButtonElement>
  recording: boolean
}

const inSpring = { friction: 11, mass: 1, tension: 240 }
const outSpring = config.stiff

const RecButton = ({ onClick, recording, ...rest }: Props) => {
  const springAnimation = useSpring({
    config: recording ? inSpring : outSpring,
    opacity: recording ? 1 : 0,
    transform: recording ? 'translateY(0px)' : 'translateY(10px)',
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
