const fetch = require('node-fetch');

function buildRequest ({ method, baseUrl, query }) {
    const url = `${baseUrl}/${query}`;
    const request = {
        method
    };
    return { url, request };
};

async function sendRequest ({ method, baseUrl, query }) {
    const { url, request } = buildRequest({ method, baseUrl, query });
    const res = await fetch(url, request);

    return parseResponse(res);
};

async function parseResponse(response) {
    let parsedResponse = await response.text();
    if (response.status >= 200 && response.status < 300) {
        parsedResponse = JSON.parse(parsedResponse || null);
    } else {
        throw new Error('Bad status code');
    }

    return parsedResponse;
}

module.exports = {
    sendRequest
}