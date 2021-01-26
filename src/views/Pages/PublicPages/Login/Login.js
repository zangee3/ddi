/* global FB */
import React, { useEffect, useState } from 'react';
// import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { login } from '../../../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { apiPaths } from '../../../../utils/apiPaths';
import { RequestAuthorizationCode } from 'react-oauth2-auth-code-flow';
import ClientOAuth2 from 'client-oauth2';

const oauthClient = new ClientOAuth2({
  clientId: apiPaths.fb_app_id,
  clientSecret: apiPaths.fb_client_secret_id,
  accessTokenUri: 'https://graph.facebook.com/oauth/access_token',
  authorizationUri: 'https://www.facebook.com/dialog/oauth',
  redirectUri: 'https://lucid-poincare-f24067.netlify.app/callback',
  scopes: ['public_profile', 'email', 'name', 'id'], //public_profile or email
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
          <div className='social-icon'>
            <RequestAuthorizationCode
              oauthClient={oauthClient}
              state={{ from: '/' }}
              render={({ url }) => (
                <a href={url}>
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              )}
            />
            <span>Login With Facebook</span>
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
              <input
                type='checkbox'
                className='form-check-input'
                id='rememberPassword'
                name='checkbox'
                //checked={rememberPassword}
                //onChange={event => handleChechbox(event)}
                // required
              />
              <label className='form-check-label' htmlFor='rememberPassword'>
                Remember me
              </label>
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              {'Log In'}
            </button>

            {/*<Dimmer active={loading} inverted><Loader active={loading} className={'lcolor'}/></Dimmer>*/}
          </form>
          {/* <Form onSubmit={handleSubmit(loginUser)}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form> */}
        </div>
      </div>
    </div>
  );
};
export default Login;
