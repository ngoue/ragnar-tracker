import moment from 'moment'
import React from 'react'

function Countdown() {
  const RagnarStartTime = moment([2020, 6, 12])
  const [now, setNow] = React.useState(moment())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment())
    }, 50)

    return () => clearInterval(interval)
  })

  const secondsLeft = Math.abs(now.diff(RagnarStartTime, 'seconds')) % 60
  const minutesLeft = Math.abs(now.diff(RagnarStartTime, 'minutes')) % 60
  const hoursLeft = Math.abs(now.diff(RagnarStartTime, 'hours')) % 24
  const daysLeft = Math.abs(now.diff(RagnarStartTime, 'days'))

  return (
    <div className='countdown'>
      <div className='days'>
        {daysLeft} <span>days</span>
      </div>
      <div className='hours'>
        {hoursLeft} <span>hours</span>
      </div>
      <div className='minutes'>
        {minutesLeft} <span>minutes</span>
      </div>
      <div className='seconds'>
        {secondsLeft} <span>seconds</span>
      </div>
    </div>
  )
}

export default Countdown
