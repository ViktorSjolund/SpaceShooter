import { useState } from 'react'
import { UpgradesHandler } from '../logic/upgrade-logic/upgrades-handler'
import { UPGRADE_ID } from '../logic/util/enums'
import { TUpgradeMenuProps, TUpgrade } from '../types/types'
import { useMeQuery, useUpgradesQuery } from '../generated/graphql'
import { MenuButton } from '../components/menu-button'
import { UserInfo } from '../components/user-info'
import { Loading } from '../components/loading'
import { Navigate } from 'react-router-dom'
import { UpgradeButton } from '../components/upgrade-button'

export const UpgradeMenu = (props: TUpgradeMenuProps) => {
  const [descText, setDescText] = useState('')
  const [costText, setCostText] = useState('')
  const [reqText, setReqText] = useState('')
  const [upgradeText, setUpgradeText] = useState('')
  const [showUpgradeText, setShowUpgradeText] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const { loading: meLoading, data: meData } = useMeQuery()
  const { loading: upgradesLoading, data: upgradesData } = useUpgradesQuery({
    variables: {
      characterId: props.charpicker.chosenCharacter,
    },
  })
  const upgradesObj = new UpgradesHandler(props.client)

  const handleNewUpgrade = async (upgradeId: UPGRADE_ID) => {
    const response = await upgradesObj.purchaseUpgrade(
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
      return
    }

    setReqText(`Requirement: lvl ${currentUpgrade.requirement}`)
    setDescText(`Description: ${currentUpgrade.description}`)
    setCostText(`Cost: ${currentUpgrade.cost}`)
    setShowTooltip(true)
  }

  const isUnlocked = (upgradeId: UPGRADE_ID) => {
    let upgradeIsUnlocked = false

    upgradesData?.upgrades.forEach((upgrade) => {
      if (upgrade.upgrade_id === upgradeId) {
        upgradeIsUnlocked = true
      }
    })

    return upgradeIsUnlocked
  }

  const handleHideUpgradeText = () => {
    setShowTooltip(false)
  }

  if (meLoading) return <Loading />
  if (!meData?.me.user?.id) {
    return <Navigate to='/login' />
  }
  if (upgradesLoading) return <Loading />

  const upgradeButtonsLvl1to9: JSX.Element[] = []
  const upgradeButtonsLvl10to29: JSX.Element[] = []
  const upgradeButtonsLvl30to59: JSX.Element[] = []

  upgradesObj.upgrades
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
      <UserInfo lvlhandler={props.lvlhandler} />
      <MenuButton />
    </div>
  )
}
