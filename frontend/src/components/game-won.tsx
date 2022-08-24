import { Link } from 'react-router-dom'
import { TGameWonProps } from '../types/types'
import { VolumeControl } from './volume-control'

export const GameWon = (props: TGameWonProps) => {
  const handleNextLevelClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    props.nextLevel(e)
  }

  return (
    <div className='game-won-wrapper'>
      <div>Level Complete!</div>
      <div> You earned {props.currencyEarned} coins</div>
      <div>
        <Link
          to='/play'
          onClick={handleNextLevelClick}
        >
          Next Level
        </Link>
      </div>
      <div>
        <Link to='/'> Main Menu </Link>
      </div>
      <VolumeControl audioHandler={props.audioHandler} />
    </div>
  )
}
