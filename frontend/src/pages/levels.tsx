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
      <div>
        <Link to='/play' onClick={() => handleLevelClick(LEVEL.ONE)}>
          Level 1
        </Link>
      </div>
      <div>
        <Link to='/play' onClick={() => handleLevelClick(LEVEL.TWO)}>
          Level 2
        </Link>
      </div>
      <div>
        <Link to='/play' onClick={() => handleLevelClick(LEVEL.ONE)}>
          Level 3
        </Link>
      </div>
      <div>
        <Link to='/play' onClick={() => handleLevelClick(LEVEL.ONE)}>
          Level 4
        </Link>
      </div>
      <div>
        <Link to='/play' onClick={() => handleLevelClick(LEVEL.ONE)}>
          Level 5
        </Link>
      </div>
      <div>
        <Link to='/play' onClick={() => handleLevelClick(LEVEL.ONE)}>
          Level 6
        </Link>
      </div>
      <div>
        <Link
          to='/play'
          className='endless-mode'
          onClick={() => handleLevelClick(LEVEL.ENDLESS)}
        >
          Endless Mode
        </Link>
      </div>
    </div>
  )
}
