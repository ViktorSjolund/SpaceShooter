import { useEffect, useState } from 'react'
import { UPGRADE_ID } from '../logic/util/enums'
import { TUpgradeMenuProps, TUpgrade } from '../types/types'
import { useMeQuery, useUpgradesQuery } from '../generated/graphql'
import { MenuButton } from '../components/menu-button'
import { UserInfo } from '../components/user-info'
import { Loading } from '../components/loading'
import { Navigate } from 'react-router-dom'
import { UpgradeButton } from '../components/upgrade-button'
import { GrPowerReset } from 'react-icons/gr'

type TUpgradeStatus = {
  upgradeId: number
  unlocked: boolean
}

export const UpgradeMenu = (props: TUpgradeMenuProps) => {
  const [descText, setDescText] = useState('')
  const [costText, setCostText] = useState('')
  const [reqText, setReqText] = useState('')
  const [upgradeText, setUpgradeText] = useState('')
  const [upgradesStatus, setUpgradesStatus] = useState<TUpgradeStatus[]>([])
  const [showUpgradeText, setShowUpgradeText] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showResetText, setShowResetText] = useState(false)
  const { loading: meLoading, data: meData } = useMeQuery()
  const { loading: upgradesLoading, data: upgradesData } = useUpgradesQuery({
    variables: {
      characterId: props.charpicker.chosenCharacter
    }
  })

  useEffect(() => {
    if (upgradesData) {
      const upgradesStat = [...upgradesStatus]
      upgradesData.upgrades.forEach((u) => {
        upgradesStat.forEach((ustatus) => {
          if (ustatus.upgradeId === u.upgrade_id) {
            ustatus.unlocked = true
          }
        })
      })
      setUpgradesStatus(() => [...upgradesStat])
    }
    if (upgradesStatus.length === 0) {
      const upgrades: TUpgradeStatus[] = []
      props.upgradesHandler.upgrades.forEach((u) => {
        upgrades.push({ upgradeId: u.id, unlocked: false })
      })
      setUpgradesStatus([...upgrades])
    }
  }, [upgradesData, upgradesStatus, props.upgradesHandler.upgrades])

  const handleNewUpgrade = async (upgradeId: UPGRADE_ID) => {
    const result = await props.upgradesHandler.canPurchaseUpgrade(upgradeId, props.lvlhandler)
    if (result.success) {
      const upgrades = [...upgradesStatus]
      upgrades.forEach((upgrade) => {
        if (upgrade.upgradeId === upgradeId) {
          upgrade.unlocked = true
        }
      })
      setUpgradesStatus([...upgrades])
    } else {
      setUpgradeText(result.error?.message || '')
      setShowUpgradeText(true)
      setTimeout(() => {
        setShowUpgradeText(false)
      }, 2000)
      return
    }

    const response = await props.upgradesHandler.purchaseUpgrade(
      upgradeId,
      props.charpicker.chosenCharacter,
      props.lvlhandler
    )
    if (response.success) {
      props.audiohandler.playClickSound()
    } else {
      setUpgradeText(response.error?.message || '')
      setShowUpgradeText(true)
      setTimeout(() => {
        setShowUpgradeText(false)
      }, 2000)
    }
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

  const isUnlocked = (upgradeId: UPGRADE_ID) => {
    let upgradeIsUnlocked = false

    upgradesStatus.forEach((upgrade) => {
      if (upgrade.upgradeId === upgradeId && upgrade.unlocked) {
        upgradeIsUnlocked = true
      }
    })

    return upgradeIsUnlocked
  }

  const handleHideUpgradeText = () => {
    setShowTooltip(false)
  }

  const handleResetUpgrades = async () => {
    await props.upgradesHandler.removeAllUpgrades(props.charpicker.chosenCharacter)
  }

  if (meLoading) return <Loading />
  if (!meData?.me.user?.id) {
    return <Navigate to='/login' />
  }
  if (upgradesLoading) return <Loading />

  const upgradeButtonsLvl1to9: JSX.Element[] = []
  const upgradeButtonsLvl10to29: JSX.Element[] = []
  const upgradeButtonsLvl30to59: JSX.Element[] = []

  props.upgradesHandler.upgrades
    .sort((a, b) => a.requirement - b.requirement)
    .forEach((upgrade) => {
      if (upgrade.characters.includes(props.charpicker.chosenCharacter)) {
        const button = (
          <UpgradeButton
            key={upgrade.id}
            handleNewUpgrade={handleNewUpgrade}
            handleUpgradeText={handleUpgradeText}
            handleHideUpgradeText={handleHideUpgradeText}
            isUnlocked={isUnlocked}
            upgrade={upgrade}
          />
        )
        if (upgrade.requirement < 10) {
          upgradeButtonsLvl1to9.push(button)
        } else if (upgrade.requirement < 30) {
          upgradeButtonsLvl10to29.push(button)
        } else if (upgrade.requirement < 60) {
          upgradeButtonsLvl30to59.push(button)
        }
      }
    })

  return (
    <div className='upgrades-wrapper'>
      <div className='upgrades-container'>
        <div>
          <span> Level 1 - 9 </span>
          {upgradeButtonsLvl1to9}
        </div>
        <div>
          <span> Level 10 - 29 </span>
          {upgradeButtonsLvl10to29}
        </div>
        <div>
          <span> Level 30 - 59 </span>
          {upgradeButtonsLvl30to59}
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
          <span>!--------------------!</span>
          <span>! Resets all upgrades. !</span>
          <span>!--------------------!</span>
        </div>
      )}
      <button
        className='reset-upgrades'
        onMouseOver={() => setShowResetText(true)}
        onMouseLeave={() => setShowResetText(false)}
        onClick={handleResetUpgrades}
      >
        <GrPowerReset size={25} />
      </button>
      <UserInfo lvlhandler={props.lvlhandler} />
      <MenuButton />
    </div>
  )
}
