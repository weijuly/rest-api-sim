const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./src/logcfg');
const validator = require('./src/validator');
const SimulatorError = require('./src/error');
const MongoConnection = require('./src/persistence');
let server = null;


app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'));

MongoConnection.connect('mongodb://TonyStark:PepperPots@localhost:27017/ra_simulator', app);

app.post('/_config', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        logger.info('>> create new config');
        validator.validate(req);
        res.status(201).send(JSON.stringify(req.body));
    } catch (ex) {
        if (ex instanceof SimulatorError) {
            logger.error(ex.name + ': ' + ex.message);
            res.status(ex.code).send(JSON.stringify({
                error: ex.message
            }));
        } else {
            res.status(500).send(JSON.stringify({
                error: 'Something went wrong'
            }));
        }
    }

    // validate request
    // create mongodb document
    // return the same
});

app.get('/', (req, res) => {
    console.log('hello');
    res.send('hello');
});

if (module.parent) {
    module.exports = app;
} else {
    app.on('connected', () => {
        server = app.listen(5000, () => {
            logger.info('Listening on port: 5000');
        });
    });
}
