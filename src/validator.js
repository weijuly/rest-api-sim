const R = require('ramda');
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

const path2bool = (path, body) => R.path(path, body) ? true : false;


module.exports = {
    validate: req => {
        let contentType = req.get('Content-Type');
        if (contentType !== 'application/json') {
            throw new SimulatorError(constants.HTTP_STATUS_BAD_REQUST, 'Content-Type should be application/json');
        }
        let body = req.body;
        let conditions = [
            path2bool(['config','name'], body),
            path2bool(['config','request'], body),
            path2bool(['config','request', 'path'], body),
            path2bool(['config','request', 'method'], body),
            path2bool(['config','request', 'headers'], body),
            path2bool(['config','request', 'body'], body),
            path2bool(['config','response'], body),
            path2bool(['config','response', 'status'], body),
            path2bool(['config','response', 'headers'], body),
            path2bool(['config','response', 'body'], body),
            path2bool(['config','response', 'delay'], body),
        ];
        if (R.contains(false,conditions)) {
            throw new SimulatorError(constants.HTTP_STATUS_BAD_REQUST, 'Incorrect payload format. See /_sample');
        }


    }
};