const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./src/logcfg');
const validator = require('./src/validator');
const SimulatorError = require('./src/error');
const MongoConnection = require('./src/persistence');

app.use(express.json());
app.use(morgan('combined'));

const connection = MongoConnection.connect('mongodb://TonyStark:PepperPots@localhost:27017/ra_simulator');

app.post('/_config', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        logger.info('request recieved');
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