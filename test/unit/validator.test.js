const validator = require('../../src/validator');
const constants = require('../../src/constants');
const expect = require('chai').expect;
const SimulatorError = require('../../src/error');


describe('Unit Test | validator', () => {
    describe('validate', () => {
        it('should give back an error when content type header is not correct', done => {
            const req = () => {
                return {
                    get: x => {
                        return undefined;
                    }
                };
            };
            let bounded = validator.validate.bind(validator, req());
            expect(bounded).to.throw(SimulatorError).which.has.property('code', constants.HTTP_STATUS_BAD_REQUST);
            expect(bounded).to.throw(SimulatorError).which.has.property('message', 'Content-Type should be application/json');
            done();
        });
        it('should give error when input is malformed', done => {
            const req = () => {
                return {
                    get: x => {
                        return 'application/json';
                    },
                    body: {
                        request: {
                            method: 'adsfa',
                            headers: {'c':'d'},
                            body: {'f':'g'}
                        },
                        response: {
                            delay: 20000,
                            headers: {'a':'c'},
                            status: 200,
                            body:{d:'c'}
                        }
                    }
                };
            };
            let bounded = validator.validate.bind(validator, req());
            expect(bounded).to.throw(SimulatorError).which.has.property('code', constants.HTTP_STATUS_BAD_REQUST);
            expect(bounded).to.throw(SimulatorError).which.has.property('message', 'Incorrect payload format. See /_sample');
            done();
        });
    });
});