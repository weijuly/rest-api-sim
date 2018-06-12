const logger = require('./logcfg');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoConnection = (() => {
    let connection = null;
    let connected = false;

    return {
        connect: (string, app) => {
            if (connected) {
                return connection;
            }
            new Promise((resolve, reject) => {
                mongodb.connect(string, (error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(connection);
                    }
                });
            }).then(connection => {
                this.connection = connection;
                logger.info('Connected to: ' + string);
                app.emit('connected');
            }).catch(error => {
                logger.error('Cannot connect to: ' + string);
            });
        }
    };
})();

module.exports = MongoConnection;