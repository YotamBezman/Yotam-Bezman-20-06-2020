import { useState, useEffect } from 'react';


const useHttpRequest = (url, method, body, more_headers = {}) => {
    const [data, setData] = useState(null);

    useEffect(async () => {
        const data = await fetch(url, {
            headers: {
                ...more_headers,
                'Content-Type': "application/json"
            },
            body: body,
            method: method
        })

        setData(data);
    }, [url, method, body, more_headers])

    return data;
}


export default useHttpRequest;
