import React from 'react';
import CredentialsBox from '../components/credentialsBox.jsx';
import Types from '../common/types.js';
import URLS from '../common/urls.js';
import { fetchJson } from '../common/api.js';


const LoginBox = props => {
    const { setToken, setDisplayedComponent } = props;

    return <CredentialsBox
        onSubmit={(username, password) => {
            fetchJson(URLS.LOGIN, "POST",
                JSON.stringify({
                    username: username,
                    password: password
                })
            )
                .then(res => res.json())
                .then(data => {
                    setToken(data.token)
                    setDisplayedComponent(Types.MAILBOX)
                })
        }}
        title="Login"
        linkTitle="Don't have an account yet? Sign up here"
        onLinkClick={() => setDisplayedComponent(Types.SIGN_UP)}
    />
}

export default LoginBox;
