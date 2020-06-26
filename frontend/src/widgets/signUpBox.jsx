import React, { useState, useEffect } from 'react';
import CredentialsBox from '../components/credentialsBox.jsx';
import URLS from '../common/urls.js';
import { useHistory } from 'react-router-dom';
import useHttpRequest from '../hooks/useHttpRequest.js';


const SignUpBox = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useHttpRequest(URLS.SIGNUP, "POST", JSON.stringify({
        username: username,
        password: password
    }));

    useEffect(() => {
        history.push("/login");
    });

    return <CredentialsBox
        onSubmit={(username, password) => {
            setUsername(username);
            setPassword(password);
        }}
        title="Sign Up"
        linkTitle="Already have an account? Login"
        linkRoute="/login"
    />
}

export default SignUpBox;
