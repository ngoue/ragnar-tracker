import API, { graphqlOperation } from '@aws-amplify/api';
import React from 'react';
import './App.css';
import awsconfig from './aws-exports';
import * as queries from './graphql/queries';
import Log from './Log';

API.configure(awsconfig)

function App() {
  const [logs, setLogs] = React.useState([])

  React.useEffect(() => {
    const load = async () => {
      console.log('loading logs')
      const resp = await API.graphql(graphqlOperation(queries.listLogs))
      setLogs(resp.data.listLogs.items)
    }

    load()
  }, [])

  return (
    <div className="App">
      {logs.length > 0 ? logs.map(log => (
        <Log key={log.id} {...log} />
      )) : (
        <p>No logs</p>
      )}
    </div>
  );
}

export default App;
