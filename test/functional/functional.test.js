process.env.NODE_ENV = 'test';

const app = require('../../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);



describe('REST simulator functional test', () => {

    let server = null;

    before(done => {
        app.on('connected', () => {
            server = app.listen(3000, () => {
                console.log('test setup: server listening on port 3000');
                done();
            });
        });
    });

    describe('POST /_config', () => {

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

        it('should give 400 on invalid request', done => {
            chai
                .request(server)
                .post('/_config')
                .send({
                    config: {}
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('should give 201 on valid request', done => {
            const req = () => {
                return {
                    config: {
                        name: 'simulation - 01',
                        request: {
                            path: '/_api/students',
                            method: 'GET',
                            headers: {
                                'X-Header': 'Tue Jun 12 11:12:37 IST 2018'
                            },
                            body: {
                                content: 'empty'
                            }
                        },
                        response: {
                            status: 400,
                            body: {
                                error: 'very bad request'
                            },
                            delay: 100,
                            headers: {
                                'X-Header': 'Tue Jun 12 11:12:37 IST 2018'
                            }
                        }
                    }
                };
            };

            chai
                .request(server)
                .post('/_config')
                .send(req())
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                });
        });

        after(done => {
            done();
        });
    });
});