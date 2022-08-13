import { Link } from 'react-router-dom'
import { TPausedProps } from '../types/types'
import { GAME_STATE } from '../logic/util/enums'
import { AudioHandler } from '../misc/audio-handler'

export const Paused = (props: TPausedProps) => {
  const audioHandler = new AudioHandler()

  const handleMenuClick = () => {
    props.game.gamestate = GAME_STATE.OVER
    audioHandler.playClickSound()
  }

  return (
    <div className='paused-wrapper'>
      <div> Paused </div>
      <div onClick={props.handleResumeClick}> Resume </div>
      <div>
        <Link to='/' onClick={handleMenuClick}>
          Main Menu
        </Link>
      </div>
    </div>
  )
}
