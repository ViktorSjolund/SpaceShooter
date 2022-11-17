import { TVolumeProps } from '@/types/types'
import { useState } from 'react'
import { AiFillControl } from 'react-icons/ai'
import { IoMdMusicalNotes } from 'react-icons/io'
import { BsVolumeUpFill } from 'react-icons/bs'

export const VolumeControl = (props: TVolumeProps) => {
  const [volume, setVolume] = useState(props.audioHandler.volume)
  const [musicVolume, setMusicVolume] = useState(props.audioHandler.musicVolume)
  const [showSlider, setShowSlider] = useState(true)

  const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    props.audioHandler.volumeMultiplier = newVolume / 100
    props.audioHandler.volume = newVolume
    props.audioHandler.refreshThemeVolume()
  }

  const handleMusicVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setMusicVolume(newVolume)
    props.audioHandler.musicVolumeMultiplier = newVolume / 100
    props.audioHandler.musicVolume = newVolume
    props.audioHandler.refreshThemeVolume()
  }

  const toggleSlider = () => {
    setShowSlider(!showSlider)
    props.audioHandler.playClickSound()
  }

  return (
    <div
      className='volume-controller'
    >
      {showSlider ? (
        <div className='volume-controller-menu'>
          <div>
            <IoMdMusicalNotes
              fill='white'
              size={30}
            />
            <input
              type='range'
              min='0'
              max='100'
              value={musicVolume}
              onChange={handleMusicVolumeSlider}
              step='10'
            />
          </div>
          <div>
            <BsVolumeUpFill
              fill='white'
              size={30}
            />
            <input
              type='range'
              min='0'
              max='100'
              value={volume}
              onChange={handleVolumeSlider}
              step='10'
            />
          </div>
        </div>
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
