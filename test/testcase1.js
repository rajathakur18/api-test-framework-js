const api = require("../utils/CommonApiMethods");
const config = require("../config");
const expect = require("chai").expect;
const chance = require("chance");
const addContext = require('mochawesome/addContext');

const baseUrl = config.baseUrl;
const createEmployeeUrl = baseUrl + config.createEmployeeUrl;

var _id, _res;

const _hearders = {
    "Content-Type": "application/json"
}
var _body = {
    /*
    "name": chance().name(),
    "salary": "" + chance().integer({min: 100, max: 999}),
    "age": "" + chance().age()
    */
};

describe('POST create employee', function () {
    var res;
    it('verify OK status', async function () {
        res = await api.POST(createEmployeeUrl, _hearders, _body);
        addContext(this, 'Response: ' + JSON.stringify(res.body));
        expect(res.statusCode, 'status not OK').to.equal(200);
        expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");
    });

    it('verify if user is created', function () {
        expect(res.body.id).length.to.greaterThan(1);
        _id = res.body.id;
    });

    it('verify response parameters', function () {
        expect(res.body).to.have.property('name').that.is.a('string');
        expect(res.body).to.have.property('salary').that.is.a('string');
        expect(res.body).to.have.property('age').that.is.a('string');
        expect(res.body).to.have.property('id').that.is.a('string');
    });
});

describe('GET employee', function () {
    var res;
    it('verify OK status', async function () {
        getEmployeeUrl = getEmployeeUrl.replace("{id}", _id);
        res = await api.GET(getEmployeeUrl, _hearders);
        addContext(this, 'Response: ' + JSON.stringify(res.body));
        expect(res.statusCode, 'status not OK').equal(200);
        expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");
    });

    it('verify if {id} matches with request', function () {
        expect(res.body.id).to.equal(_id);
        _res = res.body;
    });

    it('verify response parameters', function () {
        expect(res.body).to.have.property('id').that.is.a('string');
        expect(res.body).to.have.property('employee_name').that.is.a('string');
        expect(res.body).to.have.property('employee_salary').that.is.a('string');
        expect(res.body).to.have.property('employee_age').that.is.a('string');
        expect(res.body).to.have.property('profile_image').that.is.a('string');
    });
});

