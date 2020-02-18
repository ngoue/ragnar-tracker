import PropTypes from 'prop-types'
import React from 'react'

function Log({ runner, distance, elevation }) {
  return (
    <tr className='runner-log'>
      <td className='name'>{runner}</td>
      <td className='distance'>
        {distance} <span>mi</span>
      </td>
      <td className='elevation'>
        {elevation} <span>ft</span>
      </td>
    </tr>
  )
}

Log.propTypes = {
  runner: PropTypes.string.isRequired,
}

export default Log
