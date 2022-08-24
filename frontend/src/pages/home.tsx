import { Link, Navigate } from 'react-router-dom'
import { UserInfo } from '../components/user-info'
import { useMeQuery } from '../generated/graphql'
import { THomeProps } from '../types/types'
import { Loading } from '../components/loading'
import { VolumeControl } from '../components/volume-control'

export const Home = (props: THomeProps) => {
  const { loading, data } = useMeQuery()

  if (loading) return <Loading />
  if (!data?.me.user?.id) {
    return <Navigate to='/login' />
  }

  return (
    <div className='wrapper menu'>
      <div>Space Shooter</div>
      <Link to='/levels'>Levels</Link>
      <Link to='/upgrades'>Upgrades</Link>
      <Link to='/characters'>Characters</Link>
      <Link to='/leaderboard'>Leaderboard</Link>
      <UserInfo lvlhandler={props.lvlhandler} />
      <VolumeControl audioHandler={props.audiohandler} />
    </div>
  )
}
