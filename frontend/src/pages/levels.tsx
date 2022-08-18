import { Link, Navigate } from 'react-router-dom'
import { TLevelsProps } from '../types/types'
import { Loading } from '../components/loading'
import { MenuButton } from '../components/menu-button'
import { useMeQuery } from '../generated/graphql'
import { LEVEL } from '../logic/util/enums'
import { AudioHandler } from '../misc/audio-handler'

export const Levels = (props: TLevelsProps) => {
  const { loading, data } = useMeQuery()
  const audioHandler = new AudioHandler()

  const handleLevelClick = (levelid: LEVEL) => {
    props.lvlpicker.currentLevel = levelid
    audioHandler.playClickSound()
  }

  if (loading) return <Loading />
  if (!data?.me.user?.id) {
    return <Navigate to='/login' />
  }

  return (
    <div className='levels-wrapper'>
      <span>Levels</span>
      <MenuButton />
      <Link 
        to='/play' 
        onClick={(e) => e.preventDefault()}
        style={{ cursor: 'not-allowed' }}
        className='level-mode'>
        Campaign
      </Link>
      <Link
        to='/play'
        className='level-mode'
        onClick={() => handleLevelClick(LEVEL.ENDLESS)}>
        Endless Mode
      </Link>
    </div>
  )
}
