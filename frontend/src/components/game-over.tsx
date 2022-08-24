import { Link } from 'react-router-dom'
import { TGameOverProps } from '../types/types'
import { VolumeControl } from './volume-control'

export const GameOver = (props: TGameOverProps) => {
  const handleTryAgainClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    props.tryAgain(e)
  }

  return (
    <div className='game-over-wrapper'>
      <div className='game-over-text'>Game Over!</div>
      <div>
        {' '}
        You earned <span style={{ color: 'green' }}>{props.currencyEarned}</span> coin(s)
      </div>
      <Link
        to='/play'
        onClick={handleTryAgainClick}
      >
        Try Again
      </Link>
      <Link to='/'>Main Menu</Link>
      <VolumeControl audioHandler={props.audioHandler} />
    </div>
  )
}
