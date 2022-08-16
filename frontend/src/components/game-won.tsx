import { Link } from 'react-router-dom'
import { TGameWonProps } from '../types/types'
import { AudioHandler } from '../misc/audio-handler'

export const GameWon = (props: TGameWonProps) => {
  const audioHandler = new AudioHandler()

  const handleNextLevelClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    props.nextLevel(e)
    audioHandler.playClickSound()
  }

  return (
    <div className='game-won-wrapper'>
      <div>Level Complete!</div>
      <div> You earned {props.currencyEarned} coins</div>
      <div>
        <Link to='/play' onClick={handleNextLevelClick}>
          {' '}
          Next Level{' '}
        </Link>
      </div>
      <div>
        <Link onClick={audioHandler.playClickSound} to='/'>
          {' '}
          Main Menu{' '}
        </Link>
      </div>
    </div>
  )
}
