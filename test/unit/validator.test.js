const validator = require('../../src/validator');
const constants = require('../../src/constants');
const assert = require('assert');
const expect = require('chai').expect;
const SimulatorError = require('../../src/error');


describe('validator', () => {
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
    });
});