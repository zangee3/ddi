
import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';




const Login = () => {
  
 
    //let showNav=false
    return (
        <div className="login-form-sec-outer">
            <div className="login-form-sec-inner">
      <div className="login-form login-form-sec">
     
        <Form>
        <Form.Group >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group >
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
   
      </Form>
        
        
        
        </div>
        </div>
        </div>
    );
};
export default Login;