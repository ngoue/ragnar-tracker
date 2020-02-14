import API, { graphqlOperation } from '@aws-amplify/api'
import moment from 'moment'
import React from 'react'
import './App.scss'
import awsconfig from './aws-exports'
import * as queries from './graphql/queries'
import Log from './Log'

// Setup aws-amplify
API.configure(awsconfig)

// Ragnar start day
const RagnarStartTime = moment([2020, 6, 12])

function App() {
  const [logs, setLogs] = React.useState([])
  const [now, setNow] = React.useState(moment())

  React.useEffect(() => {
    const load = async () => {
      console.log('loading logs')
      const resp = await API.graphql(graphqlOperation(queries.listLogs))
      setLogs(resp.data.listLogs.items)
    }

    load()
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  const secondsLeft = Math.abs(now.diff(RagnarStartTime, 'seconds')) % 60
  const minutesLeft = Math.abs(now.diff(RagnarStartTime, 'minutes')) % 60
  const hoursLeft = Math.abs(now.diff(RagnarStartTime, 'hours')) % 24
  const daysLeft = Math.abs(now.diff(RagnarStartTime, 'days'))

  return (
    <div className='App'>
      <h1 className='header'>Ragnar 2020</h1>
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
      <div className='runner-logs'>
        {logs.length > 0 ? (
          logs.map(log => <Log key={log.id} {...log} />)
        ) : (
          <p>No logs</p>
        )}
      </div>
    </div>
  )
}

export default App
