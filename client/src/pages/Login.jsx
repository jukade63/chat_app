import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const navigate = useNavigate()
  const [value, setValue] = useState({ name: '', password: '' })

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     navigate('/')
  //   }
  // }, [])
  const handleChange = (e) => {
    e.preventDefault()
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (value.name === '' || value.password === '') {
      return toast.error('Email and Password is required.')
    }

    const { data } = await axios.post('http://localhost:8000/auth/login', value)

    if (data.status === false) {
      return toast.error(data.msg)
    }

    if (data.status === true) {
      console.log(data)
      localStorage.setItem('token', data.token)
      navigate('/')
    }
  }

  // toast.error('something wrong')

  return (
    <div style={{ maxWidth: '500px' }} className='mx-auto'>
      <h1 className='text-center mt-3 mb-5'>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-control mb-3'
          id='name'
          placeholder='name'
          name='name'
          value={value.name}
          onChange={handleChange}
        />
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input
          type='text'
          className='form-control mb-3'
          id='password'
          placeholder='password'
          name='password'
          value={value.password}
          onChange={handleChange}
        ></input>
        <button type='submit' className='btn btn-primary w-100'>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
