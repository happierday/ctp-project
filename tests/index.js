"use strict";

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

it('should show home page on / GET', (done) => {
    chai.request('http://localhost:3000')
        .get('/')
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
});