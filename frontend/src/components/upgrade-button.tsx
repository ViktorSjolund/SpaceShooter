import { useEffect, useState } from 'react'
import { TUpgradeButtonProps } from '../types/types'

export const UpgradeButton = (props: TUpgradeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(props.isUnlocked)

  useEffect(() => {
    setIsUnlocked(props.isUnlocked)
  }, [props.isUnlocked])

  const handleUpgrade = async () => {
    setIsLoading(true)
    const success = await props.handleNewUpgrade(props.upgrade.id)
    if (success) {
      setIsUnlocked(true)
    }
    setIsLoading(false)
  }

  return (
    <div
      onClick={handleUpgrade}
      onMouseOver={() => props.handleUpgradeText(props.upgrade)}
      onMouseLeave={props.handleHideUpgradeText}
      className={isUnlocked ? 'unlocked' : ''}
    >
      {isLoading ? (
        <img
          src='logo192.png'
          alt=''
          className='spinner'
        />
      ) : (
        <img
          src={props.upgrade.imgSrc}
          alt=''
        />
      )}
    </div>
  )
}
