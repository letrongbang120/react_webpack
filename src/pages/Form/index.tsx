import React from 'react'
import '../../assets/styles/app.css'
import '../../assets/styles/app.scss'
import { User } from './type'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useGetUsersQuery } from './api/user'

const defaultUser: User = { name: '', email: '', password: '' }

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required().min(4, 'Too short').max(6, 'Too long')
})

const Form: React.FC = () => {
  const { data, isLoading } = useGetUsersQuery()
  if (!isLoading) {
    console.log({ data })
  }

  return (
    <div>
      <Formik
        initialValues={defaultUser}
        validationSchema={schema}
        onSubmit={async (values: User, actions) => {
          console.log({ values })
          actions.setSubmitting(false)
        }}
      >
        {({ handleSubmit, errors, handleChange }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <input
              id='name'
              type='text'
              className='form-control'
              aria-label='Name'
              placeholder='Name'
              onChange={handleChange}
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
            <input
              id='email'
              type='text'
              className='form-control'
              aria-label='Email'
              placeholder='Email'
              onChange={handleChange}
            />
            {errors.email && <span className='text-danger'>{errors.name}</span>}

            <input
              id='password'
              type='password'
              className='form-control'
              aria-label='Password'
              placeholder='Password'
              onChange={handleChange}
            />
            {errors.password && <div className='text-danger'>{errors.password}</div>}

            <button className='btn btn-primary' type='submit'>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Form
