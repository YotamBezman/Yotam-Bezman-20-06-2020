import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const MailBar = props => {
    return <AppBar position="static">
        <ToolBar>
            <Typography variant="h4" color="inherit">
                {props.title}
            </Typography>
        </ToolBar>
    </AppBar>
}

export default MailBar;
