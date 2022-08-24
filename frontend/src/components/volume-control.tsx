import { TVolumeProps } from '@/types/types'
import { useState } from 'react'
import { AiFillControl } from 'react-icons/ai'

export const VolumeControl = (props: TVolumeProps) => {
  const [volume, setVolume] = useState(props.audioHandler.volume)
  const [showSlider, setShowSlider] = useState(false)

  const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    props.audioHandler.volumeMultiplier = newVolume / 100
    props.audioHandler.volume = newVolume
    props.audioHandler.refreshThemeVolume()
  }

  const toggleSlider = () => {
    setShowSlider(!showSlider)
    props.audioHandler.playClickSound()
  }

  return (
    <div
      className='volume-controller'
      style={
        showSlider
          ? {
              backgroundColor: 'rgba(20, 20, 20, 0.5)',
              border: '0.5px solid white',
            }
          : {}
      }
    >
      {showSlider ? (
        <input
          type='range'
          min='0'
          max='100'
          value={volume}
          onChange={handleVolumeSlider}
          style={{ transform: 'rotate(-90deg)' }}
          step='10'
        />
      ) : (
        <></>
      )}
      <AiFillControl
        fill='white'
        size={40}
        onClick={toggleSlider}
      />
    </div>
  )
}
