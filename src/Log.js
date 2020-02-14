import PropTypes from 'prop-types'
import React from 'react'

function Log({runner, distance, elevation}) {
  return (
    <div className='runner-log'>
      <p className='name'>{runner}</p>
      <p className='distance'>{distance} <span>mi</span></p>
      <p className='elevation'>{elevation} <span>ft</span></p>
    </div>
  )
}

Log.propTypes = {
  runner: PropTypes.string.isRequired,
}

export default Log
