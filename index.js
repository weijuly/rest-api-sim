const express = require('express');
const app = express();
const morgan = require('morgan');
const validator = require('./src/validator');
const SimulatorError = require('./src/error');

app.use(morgan('combined'));

app.post('/_config', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        validator.validate(req);
    } catch (ex) {
        if (ex instanceof SimulatorError) {
            return res.status(ex.code).send(JSON.stringify({
                error: ex.message
            }));
        } else {
            return res.status(500).send(JSON.stringify({
                error: 'Something went wrong'
            }));
        }
    }

    // validate request
    // create mongodb document
    // return the same
    res.send('hello');
});

app.get('/', (req, res) => {
    console.log('hello');
    res.send('hello');
});


var server = app.listen(5000, () => {
    console.log('listening');
});

module.exports = server;