/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const index = require('../index')

chai.should()
chai.use(chaiHttp)

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzE2NjksImlhdCI6MTUyNjQwNzY2OSwic3ViIjoianNtaXRAc2VydmVyLm5sIn0.6EM0JW99fIGsnDBst5UwaALRR84O2HaM1MOgaW3CfOI';

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(index)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "Keesje",
                "lastname": "Smid",
                "email": "keesje@server.nl",
                "password": "secret22"
            })
            .end((err, res) => {
                res.should.have.status(200)
                const response = res.body
                response.should.have.property('token')
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return an error on GET request', (done) => {
        chai.request(index)
            .get('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "Kees",
                "lastname": "Smid",
                "email": "kees@server.nl",
                "password": "secret2"
            })
            .end((err, res) => {
                res.should.have.status(401)
               done()
            })
    })

    it('should throw an error when the user already exists', (done) => {
        chai.request(index)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "Jan",
                "lastname": "Smit",
                "email": "jsmit@server.nl",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(index)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "lastname": "Smid",
                "email": "kees@server.nl",
                "password": "secret2"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        chai.request(index)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "K",
                "lastname": "Smid",
                "email": "kees@server.nl",
                "password": "secret2"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })

    it('should throw an error when no lastname is provided', (done) => {
        chai.request(index)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "Kees",
                "email": "kees@server.nl",
                "password": "secret2"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        chai.request(index)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "Kees",
                "lastname": "S",
                "email": "kees@server.nl",
                "password": "secret2"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })

    it('should throw an error when email is invalid', (done) => {
        chai.request(index)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "Kees",
                "lastname": "Smid",
                "email": "kees",
                "password": "secret2"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(index)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "jsmit@server.nl",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(200)
                const response = res.body
                response.should.have.property('token')
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when email does not exist', (done) => {
        chai.request(index)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when email exists but password is invalid', (done) => {
        chai.request(index)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "jsmit@server.nl",
                "password": "wrongPassword"
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when using an invalid email', (done) => {
        chai.request(index)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                "email": "wrongEmail@server.nl",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

})