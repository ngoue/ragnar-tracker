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
import TrainingResults from './TrainingResults'

// Setup aws-amplify
API.configure(awsconfig)
PubSub.configure(awsconfig)

function App() {
  const [loading, setLoading] = React.useState(true)
  const [logs, setLogs] = React.useState([])

  React.useEffect(() => {
    const load = async () => {
      let allLogs = []
      let resp = await API.graphql(
        graphqlOperation(queries.listLogs, { limit: 50 })
      )
      allLogs = allLogs.concat(resp.data.listLogs.items)

      // get paginated results
      while (!!resp.data.listLogs.nextToken) {
        const nextToken = resp.data.listLogs.nextToken
        resp = await API.graphql(
          graphqlOperation(queries.listLogs, { nextToken })
        )
        allLogs = allLogs.concat(resp.data.listLogs.items)
      }

      const orderedLogs = _.orderBy(
        allLogs,
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
    } catch (err) {
      console.error('Unable to create log')
      console.error(err)
      // throw err
    }
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
        <TrainingResults logs={logs} onCreateLog={createLog} />
      )}
    </div>
  )
}

export default App
