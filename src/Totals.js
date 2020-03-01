import PropTypes from 'prop-types'
import React from 'react'

const RealRunners = [
  'abigail',
  'amy',
  'andi',
  'aspen',
  'brad',
  'danny',
  'hunter',
  'jordan',
  'keana',
  'kjanela',
  'nick',
  'sam m',
  'toshi',
  'trevor',
]

function Totals({ logs }) {
  const data = {
    runners: [],
    distance: 0,
    elevation: 0,
  }

  for (let log of logs) {
    data.distance += log.distance
    data.elevation += log.elevation
    const runnerName = RealRunners.includes(log.runner.toLowerCase())
      ? log.runner
      : 'Kaden'
    if (!data.runners.includes(runnerName)) {
      data.runners.push(runnerName)
    }
  }

  return (
    <div className='totals'>
      <div className='runners'>
        {data.runners.length} <span>runners</span>
      </div>
      <div className='distance'>
        {Math.round(data.distance)} <span>miles</span>
      </div>
      <div className='elevation'>
        {Math.round(data.elevation / 100) / 10}k <span>feet</span>
      </div>
    </div>
  )
}

Totals.propTypes = {
  logs: PropTypes.array.isRequired,
}

export default Totals
