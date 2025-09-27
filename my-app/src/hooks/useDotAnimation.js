import { useEffect, useState } from "react"

export default function useDotAnimation(loading=false) {
  const [dots, setDots] = useState('')
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots(prev => prev.length < 3 ? prev + '.' : '')
      }, 1000)

      return () => clearInterval(interval);
    } else {
      setDots('');
    }
  }, [loading])

  return dots;
}