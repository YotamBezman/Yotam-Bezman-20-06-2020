import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dialog: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    subject: {
        marginBottom: theme.spacing(1)
    }
}))


const EmailContentBox = props => {
    const { subject, content, isSent, associatedUser, isOpen, setIsOpen } = props;
    const classes = useStyles();

    return <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={classes.dialog}
    >
        <DialogTitle>
            Email Content
        </DialogTitle>
        <div className={classes.title}>
            <TextField
                className={classes.subject}
                value={`Subject: ${subject}`}
                variant="outlined"
                margin="dense"
                fullWidth
            />
            <TextField
                variant='outlined'
                value={`${isSent ? 'To' : 'From'}: ${associatedUser}`}
                fullWidth
                margin="dense"
            />
        </div>
        <DialogContent>
            <TextField
                multiline
                rows={8}
                variant="outlined"
                fullWidth
                margin="dense"
                value={content}
            />
        </DialogContent>

    </Dialog>;
}

export default EmailContentBox;
