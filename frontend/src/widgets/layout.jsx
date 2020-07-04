import React from 'react';
import AppRouter from './appRouter.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';


const Layout = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}

export default Layout;
