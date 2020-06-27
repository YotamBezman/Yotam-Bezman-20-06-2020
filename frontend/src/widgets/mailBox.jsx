import React, { useState, useEffect } from 'react';
import PaginatedTable from '../components/paginatedTable/paginatedTable.jsx';
import MailBar from './mailBar.jsx';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import { fetchJson } from '../common/api.js';
import URLS from '../common/urls.js';
import NewEmailBox from './newEmailBox.jsx';
import EmailContentBox from './emailContentBox.jsx';


const useStyles = makeStyles(theme => ({
    mailBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    sendButton: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: theme.spacing(3)
    },
    bar: {
        display: 'flex',
        justifyContent: "space-between",
        marginBottom: theme.spacing(2)
    },
    upperButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }
}))


const MailBox = props => {
    const { token, setToken, removeCookie, username } = props;
    const [wasSent, setWasSent] = useState(false);
    const [wasDeleted, setWasDeleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [isNewEmailBoxOpen, setIsNewEmailBoxOpen] = useState(false);
    const [isEmailContentBoxOpen, setIsEmailContentBoxOpen] = useState(false);
    const [clickedRow, setClickedRow] = useState({});
    const [markedForDelete, setMarkedForDelete] = useState([]);
    const [currentDisplay, setCurrentDisplay] = useState(0);
    const classes = useStyles();
    const history = useHistory();

    const getMessages = async () => {
        if (token != null) {
            try {
                const response = await fetchJson(URLS.GET_MESSAGES, "GET", null, {
                    "x-access-token": token
                });

                const messages = await response.json();
                if (messages.received_messages != undefined && messages.sent_messages != undefined) {
                    setReceivedMessages(messages.received_messages);
                    setSentMessages(messages.sent_messages);
                }
            }
            catch (e) {
                setErrorMessage(e);
                logout();
            }
        }
    }

    useEffect(() => {
        getMessages();
    }, [token, wasSent]);

    const logout = () => {
        setToken(null);
        removeCookie('token');
        removeCookie('username');
        history.push("/login");
    }

    const onCheckBoxChange = (isChecked, row) => {
        if (isChecked) {
            setMarkedForDelete([
                ...markedForDelete,
                row.id
            ]);
        }
        else {
            setMarkedForDelete(markedForDelete.filter(id => id != row.id));
        }
    }

    const deleteMessages = () => {
        const currentMessages = currentDisplay == 0 ? receivedMessages : sentMessages;
        const pendingMessages = []

        markedForDelete.forEach(id => {
            pendingMessages.push(fetchJson(URLS.DELETE_MESSAGE, "DELETE", JSON.stringify({
                message_id: id
            }),
                {
                    'x-access-token': token
                }));
        })

        try {
            return Promise.all(pendingMessages);
        }
        catch (e) {
            setErrorMessage(e);
        }
    }

    const getAlert = () => {
        if (errorMessage != null) {
            return <Alert
                severity="error"
                onClose={() => setErrorMessage(null)}
                variant="filled"
            >
                {String(errorMessage)}
            </Alert>
        }

        if (wasSent == true) {
            return <Alert
                onClose={() => setWasSent(false)}
                variant="filled"
                >
                    Sent Successfully!
            </Alert>
        }

        if (wasDeleted == true) {
            return <Alert
                onClose={() => setWasDeleted(false)}
                variant="filled"
                >
                    Deleted Successfully!
            </Alert>
        }
    }

    return token === null ? <Redirect to="/login" /> :
        <div className={classes.mailBox}>
            {getAlert()}
            <NewEmailBox
                isOpen={isNewEmailBoxOpen}
                setIsOpen={setIsNewEmailBoxOpen}
                onClose={() => setIsNewEmailBoxOpen(false)}
                username={username}
                token={token}
                setErrorMessage={setErrorMessage}
                setWasSent={setWasSent}
            />
            <EmailContentBox
                isOpen={isEmailContentBoxOpen}
                setIsOpen={setIsEmailContentBoxOpen}
                subject={clickedRow.subject}
                isSent={Boolean(currentDisplay)}
                associatedUser={currentDisplay == 0 ? clickedRow.from : clickedRow.to}
                content={clickedRow.content}
            />
            <div className={classes.bar}>
                <MailBar title={`Welcome, ${username}!`}>
                    <Button
                        variant="contained"
                        endIcon={<ExitToAppIcon />}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </MailBar>
            </div>
            <div className={classes.upperButtons}>
                <FormControl variant="filled" size="small">
                    <Select
                        value={currentDisplay}
                        onChange={e => setCurrentDisplay(e.target.value)}
                        autoWidth
                        label='Display'
                    >
                        <MenuItem
                            value={0}
                        >
                            Received
                </MenuItem>
                        <MenuItem
                            value={1}
                        >
                            Sent
                </MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    endIcon={<RefreshIcon />}
                    onClick={getMessages}
                >
                    Refresh
                </Button>
            </div>
            <PaginatedTable
                rows={currentDisplay == 0 ? receivedMessages : sentMessages}
                headers={currentDisplay == 0 ? ["subject", "from", "date"] : ["subject", "to", "date"]}
                onCheckBoxChange={onCheckBoxChange}
                onRowClick={row => {
                    setClickedRow(row);
                    setIsEmailContentBoxOpen(true);
                }}
            />
            <div className={classes.sendButton}>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => setIsNewEmailBoxOpen(true)}
                >
                    Send New Email
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    endIcon={<DeleteIcon />}
                    onClick={async () => {
                        await deleteMessages();
                        await getMessages();
                        setWasDeleted(true);
                    }}
                >
                    Delete
                </Button>
            </div>
        </div>;
}

export default MailBox;
