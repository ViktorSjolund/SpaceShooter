import { useEffect, useState } from 'react'

export const Loading = () => {
  let [dots, setDots] = useState('.')
  let [dotInterval, setDotInterval] = useState<NodeJS.Timer | null>(null)

  const handleDots = () => {
    const dot = '.'
    const maxDots = 3
    let i = 1

    setDotInterval(
      setInterval(() => {
        if (i > maxDots) {
          i = 1
        }
        setDots(dot.repeat(i))
        i++
      }, 500)
    )
  }

  useEffect(() => {
    handleDots()

    return () => {
      if (dotInterval) {
        clearInterval(dotInterval)
      }
    }
  }, [dotInterval])

  return (
    <div className='wrapper'>
      <div className='loading'>
        <h1>Loading{dots}</h1>
        <img
          src='logo192.png'
          alt=''></img>
      </div>
    </div>
  )
}
