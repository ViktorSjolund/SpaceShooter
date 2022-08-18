import { useEffect, useState } from 'react'

export const Loading = () => {
  let [dots, setDots] = useState('')

  const handleDots = () => {
    const dot = '.'
    const maxDots = 3
    let i = 1

    setInterval(() => {
      if (i > maxDots) {
        i = 1
      }
      setDots(dot.repeat(i))
      i++
    }, 500)
  }

  useEffect(() => {
    handleDots()
  }, [])

  return (
    <div className='wrapper'>
      <div className='loading'>
        <h1>Loading{dots}</h1>
        <img src='logo192.png' alt=''></img>
      </div>
    </div>
  )
}
