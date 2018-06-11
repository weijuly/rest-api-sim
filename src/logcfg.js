const winston = require('winston');
const moment = require('moment');

const options = {
    file: {
        level: 'debug',
        filename: `logs/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        json: false,
        maxFiles: 5,
        colorize: false,
    }, console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: () => moment().utc().format('DD/MMM/YYYY HH:mm:ss ZZ').trim()
    }
};
const logger = new winston.Logger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

module.exports = logger;
