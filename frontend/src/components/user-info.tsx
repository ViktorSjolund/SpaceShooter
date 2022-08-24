import { MeDocument, useLogoutMutation, useMeQuery } from '../generated/graphql'
import { TUserInfoProps } from '../types/types'

export const UserInfo = (props: TUserInfoProps) => {
  const [logout] = useLogoutMutation()
  const { loading, data } = useMeQuery()

  const handleLogout = () => {
    logout({
      refetchQueries: [{ query: MeDocument }],
    })
  }

  if (loading) return <></>

  const xp = data?.me.user?.experience!
  const level = props.lvlhandler.getPlayerLevel(xp)
  const progress = props.lvlhandler.progressToNextLevel(level, xp) * 100

  return (
    <div className='user-info'>
      <span>{data?.me.user?.username}</span>
      <div>
        <span>{data?.me.user?.currency}</span>
        <img
          src='/img/currency.png'
          alt=''
        ></img>
      </div>
      <span>Level {level}</span>
      <div className='xp-bar'>
        <div
          className='xp-bar-progress'
          style={{ height: `${progress}%` }}
        ></div>
      </div>
      <span
        onClick={handleLogout}
        className='logout'
      >
        Logout
      </span>
    </div>
  )
}
