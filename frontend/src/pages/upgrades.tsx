import { useEffect, useMemo, useState, Fragment } from 'react'
import { UpgradeType } from '../logic/util/enums'
import { TUpgradeMenuProps, TUpgrade } from '../types/types'
import { useMeQuery, useUpgradesQuery } from '../generated/graphql'
import { MenuButton } from '../components/menu-button'
import { UserInfo } from '../components/user-info'
import { Loading } from '../components/loading'
import { Navigate } from 'react-router-dom'
import { UpgradeButton } from '../components/upgrade-button'
import { GrPowerReset } from 'react-icons/gr'

export const UpgradeMenu = (props: TUpgradeMenuProps) => {
  const [descText, setDescText] = useState('')
  const [costText, setCostText] = useState('')
  const [reqText, setReqText] = useState('')
  const [upgradeText, setUpgradeText] = useState('')
  const [upgradesStatus, setUpgradesStatus] = useState(new Set())
  const [showUpgradeText, setShowUpgradeText] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showResetText, setShowResetText] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const { loading: meLoading, data: meData } = useMeQuery()
  const { loading: upgradesLoading, data: upgradesData } = useUpgradesQuery({
    variables: {
      characterId: props.charpicker.chosenCharacter
    }
  })
  useMemo(() => {
    props.upgradesHandler.upgrades.sort((a, b) => a.requirement - b.requirement)
  }, [props.upgradesHandler.upgrades])

  useEffect(() => {
    if (upgradesData) {
      const upgradesStat = new Set() 
      for (const upg of upgradesData.upgrades) {
        for (const u of props.upgradesHandler.upgrades) {
          if (upg.upgrade_id === u.id) {
            upgradesStat.add(u.id)
          } 
        }
      }
      setUpgradesStatus(previous => new Set([...previous, ...upgradesStat]))
    }
  }, [upgradesData, props.upgradesHandler.upgrades])

  const handleNewUpgrade = async (upgradeId: UpgradeType) => {
    props.audiohandler.playClickSound()
    const result = await props.upgradesHandler.canPurchaseUpgrade(upgradeId, props.lvlhandler)
    if (result.success) {
      setUpgradesStatus(previous => new Set([...previous, upgradeId]))
    } else {
      setUpgradeText(result.error?.message || '')
      setShowUpgradeText(true)
      setTimeout(() => {
        setShowUpgradeText(false)
      }, 2000)
      return false
    }

    const response = await props.upgradesHandler.purchaseUpgrade(
      upgradeId,
      props.charpicker.chosenCharacter,
      props.lvlhandler
    )
    if (response.error) {
      setUpgradeText(response.error?.message || '')
      setShowUpgradeText(true)
      setTimeout(() => {
        setShowUpgradeText(false)
      }, 2000)
      return false
    }

    return true
  }

  const handleUpgradeText = (currentUpgrade: TUpgrade) => {
    if (isUnlocked(currentUpgrade.id)) {
      setReqText(`Requirement: lvl ${currentUpgrade.requirement}`)
      setDescText(`Description: ${currentUpgrade.description}`)
      setCostText('Cost: Already unlocked')
      setShowTooltip(true)
    } else {
      setReqText(`Requirement: lvl ${currentUpgrade.requirement}`)
      setDescText(`Description: ${currentUpgrade.description}`)
      setCostText(`Cost: ${currentUpgrade.cost}`)
      setShowTooltip(true)
    }
  }

  const isUnlocked = (upgradeId: UpgradeType) => {
    return upgradesStatus.has(upgradeId)
  }

  const handleHideUpgradeText = () => {
    setShowTooltip(false)
  }

  const handleResetUpgrades = async () => {
    setIsResetting(true)
    await props.upgradesHandler.removeAllUpgrades(props.charpicker.chosenCharacter)
    setUpgradesStatus(new Set())
    setIsResetting(false)
  }

  if (meLoading) return <Loading />
  if (!meData?.me.user?.id) {
    return <Navigate to='/login' />
  }
  if (upgradesLoading) return <Loading />

  return (
    <div className='upgrades-wrapper'>
      <div className='upgrades-container'>
        <div>
          <span> Level 1 - 9 </span>
          {props.upgradesHandler.upgrades.map((upgrade) => {
            if (!upgrade.characters.includes(props.charpicker.chosenCharacter)) {
              return <Fragment key={upgrade.id} />
            }
            if (upgrade.requirement < 10 && upgrade.requirement > 0) {
              return (
                <UpgradeButton
                  key={upgrade.id}
                  handleNewUpgrade={handleNewUpgrade}
                  handleUpgradeText={handleUpgradeText}
                  handleHideUpgradeText={handleHideUpgradeText}
                  isUnlocked={isUnlocked(upgrade.id)}
                  upgrade={upgrade}
                />
              )
            }

            return <Fragment key={upgrade.id} />
          })}
        </div>
        <div>
          <span> Level 10 - 29 </span>
          {props.upgradesHandler.upgrades.map((upgrade) => {
            if (!upgrade.characters.includes(props.charpicker.chosenCharacter)) {
              return <Fragment key={upgrade.id} />
            }
            if (upgrade.requirement < 30 && upgrade.requirement > 9) {
              return (
                <UpgradeButton
                  key={upgrade.id}
                  handleNewUpgrade={handleNewUpgrade}
                  handleUpgradeText={handleUpgradeText}
                  handleHideUpgradeText={handleHideUpgradeText}
                  isUnlocked={isUnlocked(upgrade.id)}
                  upgrade={upgrade}
                />
              )
            }

            return <Fragment key={upgrade.id} />
          })}
        </div>
        <div>
          <span> Level 30 - 59 </span>
          {props.upgradesHandler.upgrades.map((upgrade) => {
            if (!upgrade.characters.includes(props.charpicker.chosenCharacter)) {
              return <Fragment key={upgrade.id} />
            }
            if (upgrade.requirement < 60 && upgrade.requirement > 29) {
              return (
                <UpgradeButton
                  key={upgrade.id}
                  handleNewUpgrade={handleNewUpgrade}
                  handleUpgradeText={handleUpgradeText}
                  handleHideUpgradeText={handleHideUpgradeText}
                  isUnlocked={isUnlocked(upgrade.id)}
                  upgrade={upgrade}
                />
              )
            }

            return <Fragment key={upgrade.id} />
          })}
        </div>
      </div>
      {showTooltip ? (
        <div className='upgrade-cost-tooltip'>
          <span>{reqText}</span>
          <span>{costText}</span>
          <span>{descText}</span>
        </div>
      ) : (
        <></>
      )}
      {showUpgradeText ? (
        <div className='upgrade-response'>
          <span>{upgradeText}</span>
        </div>
      ) : (
        <></>
      )}
      {showResetText && (
        <div className='upgrade-cost-tooltip'>
          <span>!---------------------!</span>
          <span>! Resets all upgrades !</span>
          <span>!---------------------!</span>
        </div>
      )}
      <button
        className='reset-upgrades'
        onMouseOver={() => setShowResetText(true)}
        onMouseLeave={() => setShowResetText(false)}
        onClick={handleResetUpgrades}
      >
        <GrPowerReset
          size={25}
          style={{ pointerEvents: 'none' }}
          className={isResetting ? 'spinner' : ''}
        />
      </button>
      <UserInfo lvlhandler={props.lvlhandler} />
      <MenuButton />
    </div>
  )
}
