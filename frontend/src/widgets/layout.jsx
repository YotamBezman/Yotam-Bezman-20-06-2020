import React, { useState } from 'react';
import Types from '../common/types.js';
import LoginBox from './loginBox.jsx';
import SignUpBox from './signUpBox.jsx';
import MailBox from './mailBox.jsx';


const Layout = props => {
    const [token, setToken] = useState(null);
    const [displayedComponent, setDisplayedComponent] = useState(Types.SIGN_UP);

    switch (displayedComponent) {
        case Types.SIGN_UP:
            return (
                <SignUpBox
                    setDisplayedComponent={setDisplayedComponent}
                />
            )
        case Types.LOGIN:
            return (<LoginBox
                setToken={() => { }}
                setDisplayedComponent={setDisplayedComponent}
            />)
        case Types.MAILBOX:
            return <MailBox/>;
        default:
            return null;
    }
}

export default Layout;
