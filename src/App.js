import API, { graphqlOperation } from '@aws-amplify/api'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import awsconfig from './aws-exports'
import * as mutations from './graphql/mutations'
import * as queries from './graphql/queries'
import LoadingSpinner from './LoadingSpinner'
import Log from './Log'
import LogForm from './LogForm'

// Setup aws-amplify
API.configure(awsconfig)

// Ragnar start day
const RagnarStartTime = moment([2020, 6, 12])

function App() {
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [logs, setLogs] = React.useState([])
  const [now, setNow] = React.useState(moment())

  React.useEffect(() => {
    const load = async () => {
      const resp = await API.graphql(graphqlOperation(queries.listLogs))
      const orderedLogs = _.orderBy(resp.data.listLogs.items, ['sortKey', 'runner', 'distance'], ['desc', 'asc', 'asc'])
      setLogs(orderedLogs)
      setLoading(false)
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

  const addLog = event => {
    event.preventDefault()
    setAdding(true)
  }

  const createLog = async logDetails => {
    try {
      const resp = await API.graphql(
        graphqlOperation(mutations.createLog, {
          input: {
            ...logDetails,
            sortKey: moment().unix(),
          },
        })
      )
      setAdding(false)
    } catch (err) {
      console.error('Unable to create log')
      console.error(err)
      // throw err
    }
  }

  const cancelAdd = () => {
    setAdding(false)
  }

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
      <hr />
      <h2 className='header'>Training Results</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='runner-logs'>
          {adding ? (
            <LogForm onCancel={cancelAdd} onSubmit={createLog} />
          ) : (
            <button className='btn-link' onClick={addLog}>
              Add Entry
            </button>
          )}
          {logs.length > 0
            ? logs.map(log => (
                <Log key={log.id} {...log} />
              ))
            : null}
        </div>
      )}
    </div>
  )
}

export default App
