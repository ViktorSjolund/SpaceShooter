import { Link, Navigate } from 'react-router-dom'
import { TLevelsProps } from '../types/types'
import { Loading } from '../components/loading'
import { MenuButton } from '../components/menu-button'
import { useMeQuery } from '../generated/graphql'
import { Level } from '../logic/util/enums'

export const Levels = (props: TLevelsProps) => {
  const { loading, data } = useMeQuery()

  const handleLevelClick = (levelid: Level) => {
    props.lvlpicker.currentLevel = levelid
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
        className='level-mode'
      >
        Campaign
      </Link>
      <Link
        to='/play'
        className='level-mode'
        onClick={() => handleLevelClick(Level.Endless)}
      >
        Endless Mode
      </Link>
    </div>
  )
}
