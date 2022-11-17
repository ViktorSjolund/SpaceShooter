import { Link } from 'react-router-dom'
import { AudioHandler } from '../misc/audio-handler'

type TMenuButtonProps = {
  audioHandler: AudioHandler
}

export const MenuButton = (props: TMenuButtonProps) => {
  return (
    <Link
      onClick={() => props.audioHandler.playClickSound()}
      to='/'
      className='menu-button'
    >
      Main Menu
    </Link>
  )
}
