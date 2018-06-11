const constants = require('../src/constants');
const SimulatorError = require('../src/error');

const makeError = (code, message) => {
    return {
        error: {
            code: code,
            message: message
        }
    };
};

module.exports = {
    validate2: req => {
        let contentType = req.get('Content-Type');
        if (typeof contentType === 'undefined') {
            return makeError(constants.REQ_ERROR, 
                'Content-Type is missing in request');
        }
        if (contentType !== 'application/json') {
            return makeError(constants.REQ_ERROR, 
                'Content-Type is not json');
        }

    },
    validate: req => {
        let contentType = req.get('Content-Type');
        if (contentType !== 'application/json') {
            throw new SimulatorError(constants.HTTP_STATUS_BAD_REQUST, 'Content-Type should be application/json');
        }
    }
};