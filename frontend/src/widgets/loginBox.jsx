import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername, setToken } from '../redux/index.js';
import Alert from '@material-ui/lab/Alert';
import CredentialsBox from '../components/credentialsBox.jsx';
import URLS from '../common/urls.js';
import { useHistory } from 'react-router-dom';
import { fetchJson } from '../common/api.js';
import MailBar from './mailBar.jsx';


const LoginBox = props => {
    const { setCookie } = props;
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const loginToServer = async (username, password) => {
        try {
            const response = await fetchJson(URLS.LOGIN, "POST", JSON.stringify({
                username: username,
                password: password
            }));

            const body = await response.json();

            dispatch(setToken(body.token));
            dispatch(setUsername(username));
            setCookie('token', body.token)
            setCookie('username', username);
            history.push("/mail");
        }
        catch (e) {
            setErrorMessage('Invalid Credentials!');
        }
    }

    const getAlert = () => {
        return errorMessage != null ?
            <Alert
                severity='error'
                variant="filled"
                onClose={() => setErrorMessage(null)}
            >
                {String(errorMessage)}
            </Alert> : null;
    }

    return <div>
        <MailBar title="Welcome!"></MailBar>
        {getAlert()}
        <CredentialsBox
            onSubmit={loginToServer}
            title="Login"
            linkTitle="Don't have an account yet? Sign up here"
            linkRoute="/"
        />
    </div>;
}

export default LoginBox;
