import PropTypes from 'prop-types'
import React from 'react'

function LogForm(props) {
  const [logDetails, setLogDetails] = React.useState({
    runner: '',
    distance: '',
    elevation: '',
    ...props.log,
  })
  const [submitting, setSubmitting] = React.useState(false)

  const handleChange = event => {
    setLogDetails({
      ...logDetails,
      [event.target.name]: event.target.value,
    })
  }

  const cancel = event => {
    event.preventDefault()
    props.onCancel()
  }

  const submit = async event => {
    event.preventDefault()
    setSubmitting(true)
    try {
      props.onSubmit(logDetails)
    } catch (err) {
      // no-op
    } finally {
      setSubmitting(false)
    }
  }

  const isValid = () =>
    !!logDetails.runner && !!logDetails.distance && !!logDetails.elevation

  return (
    <div className='runner-log form'>
      <form autoComplete='off'>
        <input
          name='runner'
          className='name'
          onChange={handleChange}
          value={logDetails.runner}
          placeholder='Name'
          autoFocus
        />
        <input
          name='distance'
          className='distance'
          onChange={handleChange}
          value={logDetails.distance}
          placeholder='Distance'
          type='number'
        />
        <input
          name='elevation'
          className='elevation'
          onChange={handleChange}
          value={logDetails.eleveation}
          placeholder='Elevation'
          type='number'
        />
      </form>
      <div className='actions'>
        <button className='btn-link' onClick={cancel} disabled={submitting}>
          Cancel
        </button>
        <button
          className='btn-link'
          onClick={submit}
          disabled={submitting || !isValid()}
        >
          Save
        </button>
      </div>
    </div>
  )
}

LogForm.propTypes = {
  log: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

LogForm.defaultProps = {
  log: {},
}

export default LogForm
