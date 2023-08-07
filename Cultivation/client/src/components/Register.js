import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { register } from '../APIManagers/UserManager';

export default function Register({setIsLoggedIn}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
  
    const registerClick = (e) => {
      e.preventDefault();
      if (password && password !== confirmPassword) {
        alert("Passwords don't match. Do better.");
      } else {
        const userProfile = { email };
        register(userProfile, password)
          .then(() => {
            setIsLoggedIn(true)
            navigate('/cults')
          });
      }
   };
  
    return (
      <Form onSubmit={registerClick}>
        <fieldset>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
          <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        </fieldset>
      </Form>
  );
}
