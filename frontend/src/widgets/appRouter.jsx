import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUpBox from './signUpBox.jsx';
import LoginBox from './loginBox.jsx';
import MailBox from './mailBox.jsx';


const AppRouter = () => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token', "username"]);

    useEffect(() => {
        const token = cookies.token;
        const username = cookies.username;

        if (token != undefined && username != undefined) {
            setToken(token);
            setUsername(username);
        }
    }, []);

    return <Router>
        {token != null ? <Redirect to="/mail" /> : null}
        <Switch>
            <Route path='/' exact>
                <SignUpBox />
            </Route>
            <Route path='/login' exact>
                <LoginBox setToken={setToken} setUsername={setUsername} setCookie={setCookie} />
            </Route>
            <Route path='/mail' exact>
                <MailBox token={token} setToken={setToken} removeCookie={removeCookie} username={username} />
            </Route>
        </Switch>
    </Router>;
}

export default AppRouter;
