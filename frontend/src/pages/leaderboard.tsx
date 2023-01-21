import { Loading } from '../components/loading'
import { MenuButton } from '../components/menu-button'
import { useLeaderboardQuery } from '../generated/graphql'
import { TLeaderboardProps } from '../types/types'

export const Leaderboard = (props: TLeaderboardProps) => {
  const { loading, data } = useLeaderboardQuery()

  if (loading) return <Loading />

  return (
    <div className='wrapper'>
      <div className='leaderboard-wrapper'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Time Survived</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {data?.leaderboard.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{user.username}</th>
                <th>
                  {[
                    user.time.slice(0, 2),
                    ':',
                    user.time.slice(2, 4),
                    ':',
                    user.time.slice(4),
                  ].join('')}
                </th>
                <th>{props.lvlhandler.getPlayerLevel(user.experience)}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MenuButton />
    </div>
  )
}
