import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { register } from '../APIManagers/UserManager';

export default function Register({setIsLoggedIn}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
  
    const registerClick = (e) => {
      e.preventDefault();
      if (password && password !== confirmPassword) {
          alert("Passwords do not match!");
      } else {
          const userProfile = { email, password };
          register(userProfile)
              .then(() => {
                  setIsLoggedIn(true);
                  navigate('/cults');
              })
              .catch((error) => {
                  alert(error.message);
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
