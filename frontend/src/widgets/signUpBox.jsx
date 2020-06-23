import React, { useState } from 'react';
import CredentialsBox from '../components/credentialsBox.jsx';
import Types from '../common/types.js';
import URLS from '../common/urls.js';
import { fetchJson } from '../common/api.js';


const SignUpBox = props => {
    const { setDisplayedComponent } = props;

    return <CredentialsBox
        onSubmit={(username, password) => {
            fetchJson(URLS.SIGNUP, "POST",
                JSON.stringify({
                    username: username,
                    password: password
                })
            )
                .then(() => {
                    setDisplayedComponent(Types.LOGIN)
                })
                .catch(e => console.log(e))
        }}
        title="Sign Up"
        linkTitle="Already have an account? Login"
        onLinkClick={() => setDisplayedComponent(Types.LOGIN)}
    />
}

export default SignUpBox;
