import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setToken } from '../redux/index.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUpBox from './signUpBox.jsx';
import LoginBox from './loginBox.jsx';
import MailBox from './mailBox.jsx';


const AppRouter = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', "username"]);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = cookies.token;
        const username = cookies.username;

        if (token != undefined && username != undefined) {
            dispatch(setToken(token));
            dispatch(setUsername(username));
        }
    }, []);

    return <Router>
        {token.token != null ? <Redirect to="/mail" /> : null}
        <Switch>
            <Route path='/' exact>
                <SignUpBox />
            </Route>
            <Route path='/login' exact>
                <LoginBox setCookie={setCookie} />
            </Route>
            <Route path='/mail' exact>
                <MailBox removeCookie={removeCookie} />
            </Route>
        </Switch>
    </Router>;
}

export default AppRouter;
