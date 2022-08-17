import { Link } from 'react-router-dom'
import { TGameOverProps } from '../types/types'
import { AudioHandler } from '../misc/audio-handler'

export const GameOver = (props: TGameOverProps) => {
  const audioHandler = new AudioHandler()

  const handleTryAgainClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    props.tryAgain(e)
    audioHandler.playClickSound()
  }

  return (
    <div className='game-over-wrapper'>
      <div className='game-over-text'>Game Over!</div>
      <div> You earned 
        {' '}
        <span style={{ color: 'green' }}>{props.currencyEarned}</span>
        {' '}coin(s)
      </div>
      <Link to='/play' onClick={handleTryAgainClick}>
        Try Again
      </Link>
      <Link onClick={audioHandler.playClickSound} to='/'>
        Main Menu
      </Link>
    </div>
  )
}
