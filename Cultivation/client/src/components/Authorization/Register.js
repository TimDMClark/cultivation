import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { register } from '../../APIManagers/UserManager';
import { getAllRelationshipStatus } from '../../APIManagers/RelationshipStatusManager';

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [relationshipId, setRelationshipId] = useState();
  const [relationshipStatuses, setRelationshipStatuses] = useState([]);

  useEffect(() => {
    getAllRelationshipStatus()
      .then(setRelationshipStatuses)
      .catch(error => {
        console.error("Error fetching relationship statuses:", error);
      });
  }, []);

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      const userProfile = { 
        email, 
        password, 
        name,
        bio,
        relationshipId
      };
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
          <Label for="name">Name</Label>
          <Input id="name" type="text" onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="bio">Bio</Label>
          <Input id="bio" type="text" onChange={e => setBio(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="relationshipId">Relationship Status</Label>
          <Input id="relationshipId" type="select" onChange={e => setRelationshipId(e.target.value)}>
            <option value="">Select Status</option>
            {relationshipStatuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.status}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
