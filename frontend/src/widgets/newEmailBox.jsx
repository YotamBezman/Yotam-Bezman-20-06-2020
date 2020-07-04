import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import URLS from '../common/urls.js';
import { fetchJson } from '../common/api.js';


const useStyles = makeStyles(theme => ({
    actions: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }
}))


const NewEmailBox = props => {
    const { isOpen, setIsOpen, onClose, setErrorMessage, setWasSent } = props;
    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const classes = useStyles();
    const username = useSelector(state => state.username);
    const token = useSelector(state => state.token);

    const sendMessage = async () => {
        try {
            if (!receiver || !body || !subject) {
                throw new Error("Please fill all the required fields!");
            }

            const response = await fetchJson(URLS.WRITE_MESSAGE, "POST", JSON.stringify({
                sender: username.username,
                receiver: receiver,
                content: body,
                subject: subject
            }),
                {
                    "x-access-token": token.token
                });

            if (!response.ok) {
                throw new Error("Failed to send the message!");
            }
            
            setSubject('');
            setReceiver('');
            setBody('');
            setIsOpen(false);
            setWasSent(true);
        }
        catch (e) {
            setErrorMessage(e);
        }
    }

    return <Dialog
        open={isOpen}
        onClose={onClose}
    >
        <DialogTitle>
            Create New Email
        </DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                required
                fullWidth
                label="To"
                type="to"
                id="to"
                onChange={e => setReceiver(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                label="Subject"
                type="subject"
                id="subject"
                onChange={e => setSubject(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                label="Body"
                type="body"
                id="body"
                multiline
                rows={8}
                onChange={e => setBody(e.target.value)}
            />
        </DialogContent>
        <DialogActions className={classes.actions}>
            <Button
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendMessage}
            >
                Send
            </Button>
            <Button
                color="secondary"
                variant="contained"
                endIcon={<CancelIcon />}
                onClick={() => setIsOpen(false)}
            >
                Cancel
            </Button>
        </DialogActions>
    </Dialog>;
}

export default NewEmailBox;
