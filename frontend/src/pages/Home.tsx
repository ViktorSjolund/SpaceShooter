import { Link, Navigate } from 'react-router-dom'
import { UserInfo } from '../components/user-info'
import { useMeQuery } from '../generated/graphql'
import { THomeProps } from '../types/types'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { Loading } from '../components/loading'

export const Home = (props: THomeProps) => {
  const { loading, data } = useMeQuery()
  const [isMusicOn, setIsMusicOn] = useState(false)

  const handleUnmuteClick = () => {
    props.audiohandler.playThemeSong()
    props.audiohandler.playClickSound()
    setIsMusicOn(true)
  }

  const handleMuteClick = () => {
    props.audiohandler.pauseThemeSong()
    props.audiohandler.playClickSound()
    setIsMusicOn(false)
  }

  useEffect(() => {
    setIsMusicOn(props.audiohandler.isThemePlaying)
  }, [props.audiohandler.isThemePlaying])

  if (loading) return <Loading />
  if (!data?.me.user?.id) {
    return <Navigate to='/login' />
  }

  return (
    <div className='wrapper menu'>
      <div>Space Shooter</div>
      <Link onClick={props.audiohandler.playClickSound} to='/levels'>
        Levels
      </Link>
      <Link onClick={props.audiohandler.playClickSound} to='/upgrades'>
        Upgrades
      </Link>
      <Link onClick={props.audiohandler.playClickSound} to='/characters'>
        Characters
      </Link>
      <Link onClick={props.audiohandler.playClickSound} to='/leaderboard'>
        Leaderboard
      </Link>
      <UserInfo lvlhandler={props.lvlhandler} />
      <div className='volume-controller'>
        {isMusicOn ? (
          <BsFillVolumeUpFill
            fill='white'
            size={40}
            onClick={handleMuteClick}
          />
        ) : (
          <BsFillVolumeMuteFill
            fill='white'
            size={40}
            onClick={handleUnmuteClick}
          />
        )}
      </div>
    </div>
  )
}
