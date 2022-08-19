import { Link } from 'react-router-dom'
import { AudioHandler } from '../misc/audio-handler'

export const MenuButton = () => {
  const audioHandler = new AudioHandler()
  return (
    <Link onClick={() => audioHandler.playClickSound()} to='/' className='menu-button'>
      Main Menu
    </Link>
  )
}
