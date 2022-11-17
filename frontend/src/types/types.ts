import { DamageNumber } from '../logic/entities/damage-number'
import { Enemy } from '../logic/entities/enemy'
import { Explosion } from '../logic/entities/explosion'
import { Game } from '../logic/game'
import { CollisionChecker } from '../logic/util/collision-check'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { MouseEventHandler } from 'react'
import { CharacterPicker } from '../logic/character-picker'
import { LevelPicker } from '../logic/level-picker'
import { PlayerLevelHandler } from '../logic/player-level-handler'
import { CHARACTER, GAME_STATE } from '../logic/util/enums'
import { AudioHandler } from '../misc/audio-handler'

export type TUpgrade = {
  id: number
  cost: number
  requirement: number
  description: string
  imgSrc: string
  characters: CHARACTER[]
}

export type TVolumeProps = {
  audioHandler: AudioHandler
}

export type TCharactersProps = {
  charpicker: CharacterPicker
  lvlhandler: PlayerLevelHandler
  audioHandler: AudioHandler
}

export type TUpgrades = {
  projectiles: TUpgrade
}

export type TElementProps = {
  properties: {
    textContent?: string | null
    className?: string | null
    type: string
  }
}

export type TUpgradeMenuState = {
  upgrades: TUpgrades
  costText: string
  showCostText: boolean
}

export type TGameCanvasProps = {
  lvlpicker: LevelPicker
  charpicker: CharacterPicker
  client: ApolloClient<NormalizedCacheObject>
  audiohandler: AudioHandler
}

export type TGameCanvasStates = {
  isGameOver: boolean
  isPaused: boolean
  canvasContext?: CanvasRenderingContext2D
  isGameWon: boolean
}

export type TUpgradeMenuProps = {
  client: ApolloClient<NormalizedCacheObject>
  lvlhandler: PlayerLevelHandler
  charpicker: CharacterPicker
  audiohandler: AudioHandler
}

export type TLevels = {
  one: boolean
  endless: boolean
}

export type TLoginProps = {
  client: ApolloClient<NormalizedCacheObject>
}

export type TPausedProps = {
  game: Game
  handleResumeClick: () => void
  audioHandler: AudioHandler
}

export type THomeProps = {
  lvlhandler: PlayerLevelHandler
  audiohandler: AudioHandler
}

export type TGameOverProps = {
  tryAgain: MouseEventHandler<HTMLAnchorElement>
  currencyEarned: number
  audioHandler: AudioHandler
}

export type TGameWonProps = {
  nextLevel: MouseEventHandler<HTMLAnchorElement>
  currencyEarned: number
  audioHandler: AudioHandler
}

export type TLevelsProps = {
  lvlpicker: LevelPicker
  audioHandler: AudioHandler
}

export type TUserInfoProps = {
  lvlhandler: PlayerLevelHandler
}

export type TAppRouterProps = {
  client: ApolloClient<NormalizedCacheObject>
}

export type TTimer = {
  canvasRef: TCanvasRef
}

export type TLeaderboardProps = {
  lvlhandler: PlayerLevelHandler
  audioHandler: AudioHandler
}

export type TUpgradeButtonProps = {
  handleNewUpgrade: any
  handleUpgradeText: any
  handleHideUpgradeText: any
  isUnlocked: any
  upgrade: TUpgrade
}

export type TCouldPurchaseResponse = {
  error?: {
    message: string
  }
  success?: boolean
}

export type TAddUpgradeResponse = {
  error?: {
    message: string
  }
  success?: boolean
}

export type TCurrencyDisplay = {
  canvasRef: TCanvasRef
}

export type TStateChangeCb = (state: GAME_STATE) => void


export type TPosition = {
  x: number
  y: number
}

export type TVelocity = {
  x: number
  y: number
}

export type TSize = {
  width: number
  height: number
}

export type TEntity = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
}

export type TTestEntity = {
  position: TPosition
  velocity: TVelocity
  size: TSize
}

export type TMissile = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  image: HTMLImageElement
  damage: number
  explosions: Explosion[]
  damageNumbers: DamageNumber[]
  canvasRef: TCanvasRef
  collisionChecker: CollisionChecker
}

export type TExplosion = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
  damage: number
  damageNumbers: DamageNumber[]
  collisionChecker: CollisionChecker
}

export type TParticle = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
  friction?: number
}

export type TEnemyFlash = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
  enemy: Enemy
  image: HTMLImageElement
}

export type TEnemy = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  hitpoints: {
    current: number
    default: number
  }
  canvasRef: TCanvasRef
  image: HTMLImageElement
  dodgeChance: number
  isWinCondition: boolean
}

export type THealer = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  hitpoints: {
    current: number
    default: number
  }
  canvasRef: TCanvasRef
  image: HTMLImageElement
  dodgeChance: number
  isWinCondition: boolean
  enemy: Enemy
}

export type THealNumber = {
  position: TPosition
  canvasRef: TCanvasRef
  healAmount: number
}

export type TSplitter = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  hitpoints: {
    current: number
    default: number
  }
  canvasRef: TCanvasRef
  image: HTMLImageElement
  game: Game
  isSplit: boolean
  dodgeChance: number
  isWinCondition: boolean
}

export type TGameCanvasRef = {
  ctx: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
}

export type TCanvasRef = {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
}

export type TPlayerProperties = {
  attackRate: number
  numberOfProjectiles: number
  pierceAmount: number
  damage: number
}

type TPlayerImages = {
  playerImage: HTMLImageElement
  projImage: HTMLImageElement
}

export type TPlayer = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
  images: TPlayerImages
  properties: TPlayerProperties
}

export type TCharacter = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
  images: TPlayerImages
  properties: TPlayerProperties
  enemies: Enemy[]
}

type TBeamerImages = {
  beamerImg: HTMLImageElement
  beamImg: HTMLImageElement
  beamStartImg: HTMLImageElement
}

export type TBeamer = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
  images: TBeamerImages
  properties: TPlayerProperties
  enemies: Enemy[]
}

type TBeamImages = {
  beamImg: HTMLImageElement
  beamStartImg: HTMLImageElement
}

export type TBeam = {
  position: TPosition
  size: TSize
  damage: number
  canvasRef: TCanvasRef
  velocity: TVelocity
  collisionChecker: CollisionChecker
  damageNumbers: DamageNumber[]
  images: TBeamImages
  attackRate: number
}

export type TProjectile = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
  isActive: boolean
  damage: number
  pierceAmount: number
  image: HTMLImageElement
  damageNumbers: DamageNumber[]
  collisionChecker: CollisionChecker
}

export type TDamageNumber = {
  position: TPosition
  canvasRef: TCanvasRef
  damage: number
  didMiss: boolean
}

export type TStar = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  canvasRef: TCanvasRef
}

export type TGigantor = {
  position: TPosition
  velocity: TVelocity
  size: TSize
  hitpoints: {
    current: number
    default: number
  }
  canvasRef: TCanvasRef
  image: HTMLImageElement
  dodgeChance: number
  isWinCondition: boolean
  game: Game
}
