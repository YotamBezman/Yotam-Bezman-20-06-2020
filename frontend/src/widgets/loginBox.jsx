import React, { useState, useEffect} from 'react';
import CredentialsBox from '../components/credentialsBox.jsx';
import URLS from '../common/urls.js';
import { useHistory } from 'react-router-dom';
import useHttpRequest from '../hooks/useHttpRequest.js';


const LoginBox = props => {
    const { setToken } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const data = useHttpRequest(URLS.LOGIN, "POST", JSON.stringify({
        username: username,
        password: password
    }));

    useEffect(async () => {
        const content = await data.json();
        setToken(data.token);
        history.push("/mail");
    });

    return <CredentialsBox
        onSubmit={(username, password) => {
            setUsername(username);
            setPassword(password);
        }}
        title="Login"
        linkTitle="Don't have an account yet? Sign up here"
        linkRoute="/signup"
    />
}

export default LoginBox;
