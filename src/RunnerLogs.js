import PropTypes from 'prop-types'
import React from 'react'
import Log from './Log'
import LogForm from './LogForm'

function RunnerLogs({ logs, onCreateLog }) {
  const [adding, setAdding] = React.useState(false)

  const addLog = event => {
    event.preventDefault()
    setAdding(true)
  }

  const cancelAdd = () => {
    setAdding(false)
  }

  const submit = async logDetails => {
    try {
      await onCreateLog(logDetails)
      setAdding(false)
    } catch (err) {
      // no-op
    }
  }

  return (
    <div className='runner-logs-container'>
      <div className='runner-logs'>
        {adding ? (
          <LogForm onCancel={cancelAdd} onSubmit={submit} />
        ) : (
          <button className='btn-link' onClick={addLog}>
            Add Entry
          </button>
        )}
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th className='header'>NAME</th>
              <th className='header'>DISTANCE</th>
              <th className='header'>ELEVATION</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0
              ? logs.map(log => <Log key={log.id} {...log} />)
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

RunnerLogs.propTypes = {
  logs: PropTypes.array.isRequired,
  onCreateLog: PropTypes.func.isRequired,
}

export default RunnerLogs
