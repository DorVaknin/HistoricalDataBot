'use strict';
const apiKey = require('./consts/apiKey');
class Query {
    constructor () {
        this.outputData = {
            pathSubDirectories: [],
            queryParams: []
        };
    }

    addSubDir(subDir) {
        this.outputData.pathSubDirectories.push(subDir);
        return this;
    }

    addQuery (key, value) {
        if (typeof key !== 'string') {
            throw new Error('Path query key must be of type string');
        }
        this.outputData.queryParams.push(`${key}=${value}`);
        return this;
    }
    addApiKeyToQuery() {
        this.outputData.queryParams.push(`api_key=${apiKey}`);
    }
    get () {
        let queryString = '';
        queryString += this.outputData.pathSubDirectories.join('/');
        this.addApiKeyToQuery();
        queryString += `?${this.outputData.queryParams.join('&')}`;

        return queryString;
    }
}

module.exports = Query;
