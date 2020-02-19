import PropTypes from 'prop-types'
import React from 'react'
import RunnerLogs from './RunnerLogs'
import Totals from './Totals'

function TrainingResults({ logs, onCreateLog }) {
  const [showTotals, setShowTotals] = React.useState(true)

  const toggle = (event) => {
    // event.target.blur()
    setShowTotals(!showTotals)
  }

  return (
    <div className='training-results'>
      <div className='tabs'>
        <button className='btn-link' onClick={toggle} disabled={showTotals}>
          TOTALS
        </button>
        <button className='btn-link' onClick={toggle} disabled={!showTotals}>
          LOGS
        </button>
      </div>
      {showTotals ? (
        <Totals logs={logs} />
      ) : (
        <RunnerLogs onCreateLog={onCreateLog} logs={logs} />
      )}
    </div>
  )
}

TrainingResults.propTypes = {
  logs: PropTypes.array.isRequired,
  onCreateLog: PropTypes.func.isRequired,
}

export default TrainingResults
