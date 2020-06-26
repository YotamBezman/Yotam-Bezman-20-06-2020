import React from 'react';
import PaginatedTable from '../components/paginatedTable.jsx';


const MailBox = props => {
    return <PaginatedTable
        rows={[{
            subject: "Test",
            sender: "Test",
            messageId: "1"
        },
        {
            subject: "Test",
            sender: "Test",
            messageId: "2"
        },
        {
            subject: "Test",
            sender: "Test",
            messageId: "3"
        },
        {
            subject: "Test",
            sender: "Test",
            messageId: "4"
        }]}
        headers={[{
            name: "Subject"
        },
        {
            name: "Sender"
        }
        ]}
    />;
}

export default MailBox;
