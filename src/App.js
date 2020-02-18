import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import awsconfig from './aws-exports'
import Countdown from './Countdown'
import * as mutations from './graphql/mutations'
import * as queries from './graphql/queries'
import * as subscriptions from './graphql/subscriptions'
import LoadingSpinner from './LoadingSpinner'
import Log from './Log'
import LogForm from './LogForm'

// Setup aws-amplify
API.configure(awsconfig)
PubSub.configure(awsconfig)

function App() {
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [logs, setLogs] = React.useState([])

  React.useEffect(() => {
    const load = async () => {
      const resp = await API.graphql(graphqlOperation(queries.listLogs))
      const orderedLogs = _.orderBy(
        resp.data.listLogs.items,
        ['sortKey', 'runner', 'distance'],
        ['desc', 'asc', 'asc']
      )
      setLogs(orderedLogs)
      setLoading(false)
    }

    const createSub = API.graphql(
      graphqlOperation(subscriptions.onCreateLog)
    ).subscribe({
      next: resp => {
        setLogs([resp.value.data.onCreateLog, ...logs])
      },
    })

    if (loading) {
      load()
    }

    return () => {
      createSub.unsubscribe()
    }
  }, [loading, logs])

  const addLog = event => {
    event.preventDefault()
    setAdding(true)
  }

  const createLog = async logDetails => {
    try {
      await API.graphql(
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

  return (
    <div className='App'>
      <h1 className='header'>Ragnar 2020</h1>
      <Countdown />
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
            ? logs.map(log => <Log key={log.id} {...log} />)
            : null}
        </div>
      )}
    </div>
  )
}

export default App
