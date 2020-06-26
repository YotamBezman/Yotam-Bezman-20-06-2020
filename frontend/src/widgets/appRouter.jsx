import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpBox from './signUpBox.jsx';
import LoginBox from './loginBox.jsx';
import MailBox from './mailBox.jsx';
import Link from 'react-router-dom';


const AppRouter = props => {
    const [token, setToken] = useState(null);

    return <Router>
        <Switch>
            <Route path="/" exact>
               Hi
            </Route>
            <Route path='/signup' exact>
                <SignUpBox />
            </Route>
            <Route path='/login' exact>
                <LoginBox setToken={setToken} />
            </Route>
            <Route path='/mail' exact>
                <MailBox token={token} />
            </Route>
        </Switch>
    </Router>;
}

export default AppRouter;
