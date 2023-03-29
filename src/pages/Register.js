import React from 'react'
import { useState} from 'react'
import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}


const Register = () => {

  const [values, setValues] = useState(initialState)
  console.log(values)
  const {user, isLoading} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {email, name, password, isMember} = values;
    if(!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields');
      return;
    }
    if(isMember) {
      dispatch(loginUser({email: email, password: password}))
      return;
    }
    dispatch(registerUser({email, password, name }));
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        
        <div className="form-row">
        {!values.isMember && (
          <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />
        )}
        <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
        <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          
        </div>
        <button type="submit" className='btn btn-block'>submit</button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button onClick={toggleMember} className="member-btn">{values.isMember ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register