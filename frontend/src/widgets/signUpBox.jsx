import React, { useState } from 'react';
import CredentialsBox from '../components/credentialsBox.jsx';
import URLS from '../common/urls.js';
import { useHistory } from 'react-router-dom';
import { fetchJson } from '../common/api.js';
import MailBar from './mailBar.jsx';
import Alert from '@material-ui/lab/Alert';


const SignUpBox = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);

    const signUpToServer = async (username, password) => {
        try {
            const response = await fetchJson(URLS.SIGNUP, "POST", JSON.stringify({
                username: username,
                password: password
            }));

            if (!response.ok) {
                throw new Error("Failed to signup!");
            }

            history.push("/login");
        }
        catch (e) {
            setErrorMessage(e);
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
            onSubmit={signUpToServer}
            title="Sign Up"
            linkTitle="Already have an account? Login"
            linkRoute="/login"
        />
    </div>
}

export default SignUpBox;
