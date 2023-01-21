import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loading } from '../components/loading'
import { MenuButton } from '../components/menu-button'
import { UserInfo } from '../components/user-info'
import { useMeQuery } from '../generated/graphql'
import { Character } from '../logic/util/enums'
import { TCharactersProps } from '../types/types'

export const Characters = (props: TCharactersProps) => {
  const { loading, data } = useMeQuery()
  const [updateState, setUpdateState] = useState(false)

  const handleClick = (characterPick: Character) => {
    props.charpicker.chosenCharacter = characterPick
    setUpdateState(!updateState)
  }

  if (loading) return <Loading />
  if (!data?.me.user?.id) {
    return <Navigate to='/login' />
  }

  return (
    <div className='wrapper'>
      <UserInfo lvlhandler={props.lvlhandler} />
      <div className='characters-wrapper'>
        <span>Characters</span>
        <MenuButton />
        <div>
          <span> Default </span>
          <span>
            <b>Gunner</b>
          </span>
          <img
            src='/img/spaceship.png'
            alt=''
          />
          {props.charpicker.chosenCharacter === Character.Gunner ? (
            <button className='selected'>Selected</button>
          ) : (
            <button onClick={() => handleClick(Character.Gunner)}>Select</button>
          )}
        </div>
        <div>
          <span></span>
          <span>
            <b>Beamer</b>
          </span>
          <img
            src='/img/beamer.png'
            alt=''
          />
          {props.charpicker.chosenCharacter === Character.Beamer ? (
            <button className='selected'>Selected</button>
          ) : (
            <button onClick={() => handleClick(Character.Beamer)}>Select</button>
          )}
        </div>
      </div>
    </div>
  )
}
