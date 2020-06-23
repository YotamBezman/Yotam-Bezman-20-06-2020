import React from 'react';
import PaginatedTable from '../components/paginatedTable.jsx';


const MailBox = props => {
    return <PaginatedTable
        rows={[{
            subject: "Test",
            sender: "Test"
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
