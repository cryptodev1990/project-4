import React, { useState } from 'react'
import axios from 'axios'

const Signup = (props) => {
  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    profession: '',
    password: '',
    password_confirmation: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    profession: '',
    password: '',
    password_confirmation: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }

    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/signup', formData)
      .then(resp => {
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          props.history.push('/login')
        }
      })

  }

  return <main className="signupMain">

    <form className="signup" onSubmit={handleSubmit}>
      <div>
        <label>Username *   </label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="username"
        />
        {errors.username && <p style={{ color: red }}>
          {`There was a problem with your ${errors.username.path}`}
        </p>}
      </div>
      <div>
        <label>Email *</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        {errors.email && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.email.path}`}
        </p>}
      </div>
      <div>
        <label>Interests</label>
        <input
          type="profession"
          onChange={handleChange}
          value={formData.profession}
          name="profession"
        />
      </div>
      <div>
        <label>Password *</label>
        <input
          type="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
        {errors.password && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.password.path}`}
        </p>}
      </div>
      <div>
        <label>Confirm Password *</label>
        <input
          type="password"
          onChange={handleChange}
          value={formData.password_confirmation}
          name="password_confirmation"
        />
        {errors.password_confirmation && <p style={{ color: 'red' }}>
          {'Does not match password'}
        </p>}
      </div>
      <div>
        <small>* required field  </small>
      </div>
      <button>Signup</button>
    </form>
  </main>
}

export default Signup