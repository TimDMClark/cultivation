import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { login } from '../../APIManagers/UserManager';

export default function Login({setIsLoggedIn}) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmit = (e) => {
        e.preventDefault();

        login({ email, password })
        .then((user) => {
            setIsLoggedIn(true);
            navigate("/cults");
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    return (
        <Form onSubmit={loginSubmit}>
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
                    <Button>Login</Button>
                </FormGroup>
                <em>
                    Not registered? <Link to="/register">Register</Link>
                </em>
            </fieldset>
        </Form>
    );
}
