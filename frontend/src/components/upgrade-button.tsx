import { TUpgradeButtonProps } from '../types/types'

export const UpgradeButton = (props: TUpgradeButtonProps) => {
  return (
    <div
      onClick={() => props.handleNewUpgrade(props.upgrade.id)}
      onMouseOver={() => props.handleUpgradeText(props.upgrade)}
      onMouseLeave={props.handleHideUpgradeText}
      className={props.isUnlocked(props.upgrade.id) ? 'unlocked' : ''}
    >
      <img
        src={props.upgrade.imgSrc}
        alt=''
      />
    </div>
  )
}
