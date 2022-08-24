import { useEffect, useRef, useState } from 'react'
import { Game } from '../logic/game'
import { GAME_STATE } from '../logic/util/enums'
import { GameOver } from '../components/game-over'
import { GameWon } from '../components/game-won'
import { Paused } from '../components/paused'
import { Navigate } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'
import { TGameCanvasProps, TStateChangeCb } from '@/types/types'
import { Loading } from '../components/loading'

export const Canvas = (props: TGameCanvasProps) => {
  const { loading, data } = useMeQuery()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<Game | null>(null)
  let isRunning = false
  const [gamestate, setGamestate] = useState(GAME_STATE.PLAYING)

  const initNewGame = () => {
    setGamestate(GAME_STATE.PLAYING)
    if (!isRunning) {
      const newGame = new Game(
        props.lvlpicker,
        {
          canvas: canvasRef.current!,
          ctx: canvasRef.current!.getContext('2d')!,
        },
        props.charpicker,
        props.client,
        handleGameStateChange
      )
      newGame.play()
      setGame(newGame)
      isRunning = true
    }
  }

  const handleGameStateChange: TStateChangeCb = (state) => {
    if (state === GAME_STATE.PLAYING) {
      setGamestate(GAME_STATE.PLAYING)
    } else if (state === GAME_STATE.PAUSED) {
      setGamestate(GAME_STATE.PAUSED)
    } else if (state === GAME_STATE.WON) {
      setGamestate(GAME_STATE.WON)
    } else if (state === GAME_STATE.OVER) {
      setGamestate(GAME_STATE.OVER)
    }
  }

  const handleTryAgain = () => {
    isRunning = false
    initNewGame()
  }

  const handleNextLevelClick = () => {
    const levelsOrder = props.lvlpicker.getLevelsOrderArray()
    levelsOrder.forEach((levelCode, index) => {
      const nextIndex = index + 1
      if (levelCode === props.lvlpicker.currentLevel) {
        if (nextIndex < levelsOrder.length) {
          props.lvlpicker.currentLevel = levelsOrder[nextIndex]
        } else {
          props.lvlpicker.currentLevel = levelsOrder[index]
        }
      }
    })
    isRunning = false
    initNewGame()
  }

  const handleResumeClick = () => {
    game!.unpause()
    props.audiohandler.playClickSound()
  }

  useEffect(() => {
    if (isRunning || !data?.me.user?.id) {
      return
    }
    initNewGame()
  }, [])

  if (loading) return <Loading />
  if (!data?.me.user?.id) {
    return <Navigate to='/login' />
  }

  return (
    <div className='game-wrapper'>
      <canvas
        ref={canvasRef}
        width='1024'
        height='576'
        key={'canvas'}
      ></canvas>
      {gamestate === GAME_STATE.OVER ? (
        <GameOver
          tryAgain={handleTryAgain}
          currencyEarned={game!.currencyEarned}
          audioHandler={props.audiohandler}
        />
      ) : (
        <></>
      )}
      {gamestate === GAME_STATE.PAUSED ? (
        <Paused
          game={game!}
          handleResumeClick={handleResumeClick}
          audioHandler={props.audiohandler}
        />
      ) : (
        <></>
      )}
      {gamestate === GAME_STATE.WON ? (
        <GameWon
          nextLevel={handleNextLevelClick}
          currencyEarned={game!.currencyEarned}
          audioHandler={props.audiohandler}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
