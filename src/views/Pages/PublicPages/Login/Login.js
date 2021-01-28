
import React, { useEffect, useState } from 'react';
// import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { login } from '../../../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { apiPaths } from '../../../../utils/apiPaths';
import { RequestAuthorizationCode } from 'react-oauth2-auth-code-flow';
import ClientOAuth2 from 'client-oauth2';


const oauthClient = new ClientOAuth2({
  clientId: apiPaths.app_id,
  clientSecret: apiPaths.client_secret_id,
  accessTokenUri: 'https://idp.myid-stg.disney.com/as/token.oauth2',
  authorizationUri: 'https://idp.myid-stg.disney.com/as/authorization.oauth2',
  redirectUri: 'http://localhost:3000/callback',
  scopes: ['profile', 'email', 'id'], //public_profile or email
});

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  const { register, handleSubmit, errors, watch, formState } = useForm({
    mode: 'onChange',
  });

  const loginUser = (value) => {
    const loginData = {
      userName: value.email,
      password: value.password,
    };
    dispatch(login(loginData));
  };

  return (
    <div className='login-form-sec-outer'>
      <div className='login-form-sec-inner'>
        <div className='login-form login-form-sec'>
          <div style={{margin: '0 0 20px'}}>
            <RequestAuthorizationCode
              oauthClient={oauthClient}
              state={{ from: '/' }}
              render={({ url }) => (         
                <button className='btn btn-primary w-100'>
                  <a href={url} style={{color:'white'}} >                  
                    Login with <img _ngcontent-eku-c13="" src="https://solo.myid-stg.disney.com/assets/myid.png" style={{height: '19px'}} />
                  </a>
                </button>                
                
              )}
            />            
          </div>
          <form
            className='mb-4'
            onSubmit={handleSubmit(loginUser)}
            autoComplete='off'
          >
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                placeholder='Email address'
                aria-describedby='emailHelp'
                name='email'
                ref={register({
                  required: {
                    value: true,
                    message: 'Please enter your email',
                  },
                })}
              />
              {errors.email && (
                <p className='customErrors text-danger mt-2'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className='form-group password-input'>
              <label htmlFor='exampleInputPassword1'>Password</label>
              <input
                type='password'
                id='passInput'
                className='form-control'
                id='exampleInputPassword1'
                placeholder='Password'
                name='password'
                ref={register({ required: true })}
              />
              {errors.password && (
                <p className='customErrors text-danger mt-2'>
                  Please enter password
                </p>
              )}
            </div>
            <div className='form-check'>
              
              <label className='form-check-label' htmlFor='rememberPassword'>
                Remember me
              </label>
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              {'Log In'}
            </button>

            {/*<Dimmer active={loading} inverted><Loader active={loading} className={'lcolor'}/></Dimmer>*/}
          </form>          
        </div>
      </div>
    </div>
  );
};
export default Login;
