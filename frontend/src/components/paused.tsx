import { Link } from 'react-router-dom'
import { TPausedProps } from '../types/types'
import { GameState } from '../logic/util/enums'
import { VolumeControl } from './volume-control'

export const Paused = (props: TPausedProps) => {
  const handleMenuClick = () => {
    props.game.gamestate = GameState.Over
  }

  return (
    <div className='paused-wrapper'>
      <div> Paused </div>
      <div onClick={props.handleResumeClick}> Resume </div>
      <div>
        <Link
          to='/'
          onClick={handleMenuClick}
        >
          Main Menu
        </Link>
      </div>
      <VolumeControl audioHandler={props.audioHandler} />
    </div>
  )
}
