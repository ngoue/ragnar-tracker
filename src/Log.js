import PropTypes from 'prop-types'
import React from 'react'

function Log({runner, distance, elevation}) {
  return (
    <div className='runner-log'>
      <p>{runner}</p>
      <p>{distance} mi.</p>
      <p>{elevation} ft.</p>
    </div>
  )
}

Log.propTypes = {
  runner: PropTypes.string.isRequired,
}

export default Log
