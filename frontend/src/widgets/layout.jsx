import React from 'react';
import MailBar from './mailBar.jsx';
import AppRouter from './appRouter.jsx';


const Layout = () => {
    return (
        <div>
            <MailBar title="MailBox"></MailBar>
            <AppRouter/>
        </div>
    );
}

export default Layout;
