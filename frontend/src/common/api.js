export function fetchJson(url, method, body, more_headers={}) {
    return fetch(url, {
        headers: {
            ...more_headers,
            'Content-Type': "application/json"
        },
        body: body,
        method: method
    })
}