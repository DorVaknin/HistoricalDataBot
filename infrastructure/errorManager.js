let errorsInfo;
const { set, has } = require('lodash');
function storeErrorInfo (errorName, errorReason) {
    if(!errorsInfo) {
        errorsInfo = {};
    }
    errorReasonParser(errorReason)
    if(!has(errorsInfo, [errorName, errorReason])) {
        set(errorsInfo, `${errorName}.${errorReason}`, 0)
    } else {
        set(errorsInfo, `${errorName}.${errorReason}`, errorsInfo[errorName][errorReason] + 1);
    }
}

function getErrorsInfo() {
    return errorsInfo;
}

function errorReasonParser(errorReason) {
    return errorReason.includes('reason:') ? errorReason.split('reason:')[1]: errorReason
}

module.exports = {
    storeErrorInfo,
    getErrorsInfo,
}