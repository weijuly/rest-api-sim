process.env.NODE_ENV = 'test';

const server = require('../../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('REST simulator functional test', () => {
    describe('POST /_config', () => {

        before(() => {});

        it('should give 400 on wrong Content-type', done => {
            chai
                .request(server)
                .post('/_config')
                .set('Content-type', null)
                .send('yellow')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        after(done => {
            done();
        });
    });
});