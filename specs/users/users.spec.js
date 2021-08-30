var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var Joi = require('joi');

const addContext = require('mochawesome/addContext');
const uri = 'https://reqres.in/api/';
const parameters = require('./parameters.json');

const { schemaUsers } = require('../../schemas/users.schema.js');

function htmlReport(arg1, arg2) { addContext(arg1, {title: 'Body', value: arg2}); }

var user = {};

describe('Users', function () {
  this.timeout(30000);
  
  describe('Cadastro de usuários', function () {
    it("(POST) Success (201) - Cadastrar usuário - Validação de status e body", function (done) {
      request(uri)
      .post(`users`)
      .send({
        "name": parameters.INSERT.NAME,
        "job": parameters.INSERT.JOB
      })
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(201); //Valida statusCode
        expect(res.body.name).to.be.equal(parameters.INSERT.NAME); //Valida name de usuário criado
        expect(res.body.job).to.be.equal(parameters.INSERT.JOB); //Valida job de usuário criado
        user.id = res.body.id;
        done();
      });
    });

    it("(POST) Success (201) - Cadastrar usuário sem nome - Validação de status e body", function (done) {
      request(uri)
      .post(`users`)
      .send({
        "job": parameters.INSERT.JOB
      })
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(201); //Valida statusCode
        expect(res.body.job).to.be.equal(parameters.INSERT.JOB); //Valida job de usuário criado
        done();
      });
    });

    it("(POST) Success (201) - Cadastrar usuário sem job - Validação de status e body", function (done) {
      request(uri)
      .post(`users`)
      .send({
        "name": parameters.INSERT.NAME
      })
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(201); //Valida statusCode
        expect(res.body.name).to.be.equal(parameters.INSERT.NAME); //Valida name de usuário criado
        done();
      });
    });
  });

  describe('Alteração de usuários', function () {
    it("(PUT) Success (200) - Alterar todos dados de usuário - Validação de status e body", function (done) {
      request(uri)
      .put(`users/${user.id}`)
      .send({
        "name": parameters.UPDATE.NAME,
        "job": parameters.UPDATE.JOB
      })
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(200); //Valida statusCode
        expect(res.body.name).to.be.equal(parameters.UPDATE.NAME); //Valida nome de usuário alterado
        expect(res.body.job).to.be.equal(parameters.UPDATE.JOB); //Valida job de usuário alterado
        done();
      });
    });

    it("(PATCH) Success (200) - Alterar name de usuário - Validação de status e body", function (done) {
      request(uri)
      .patch(`users/${user.id}`)
      .send({
        "name": parameters.UPDATE.NAME_PATCH
      })
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(200); //Valida statusCode
        expect(res.body.name).to.be.equal(parameters.UPDATE.NAME_PATCH); //Valida nome de usuário alterado
        done();
      });
    });

    it("(PATCH) Success (200) - Alterar job de usuário - Validação de status e body", function (done) {
      request(uri)
      .patch(`users/${user.id}`)
      .send({
        "job": parameters.UPDATE.JOB_PATCH
      })
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(200); //Valida statusCode
        expect(res.body.job).to.be.equal(parameters.UPDATE.JOB_PATCH); //Valida job de usuário alterado
        done();
      });
    });
  });

  describe('Consulta de usuários', function () {
    it("(GET) Success (200) - Consultar usuários da página 2 - Validação de status e body", function (done) {
      request(uri)
      .get(`users?page=2`)
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(200); //Valida statusCode
        expect(res.body.page).to.be.equal(2); //Valida página exibida
        expect(res.body.per_page).to.be.equal(6); //Valida total de registros por página
        expect(res.body.total).to.be.equal(12); //Valida total de registros
        expect(res.body.total_pages).to.be.equal(2); //Valida total de páginas
        expect(res.body.support.url).to.be.equal('https://reqres.in/#support-heading'); //Valida endereço de suporte
        expect(res.body.support.text).to.be.equal('To keep ReqRes free, contributions towards server costs are appreciated!'); //Valida texto do suporte
        done();
      });
    });

    it("(GET) Success (200) - Consultar usuários da página 2 - Validação de schema", function (done) {
      request(uri)
      .get(`users?page=2`)
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) };
        Joi.validate(res.body.data, Joi.array().items(schemaUsers), {
          abortEarly: false
        }, (err, data) => { if (err) throw err; });
        done();
      });
    });

    it("(GET) Success (200) - Consultar usuário específico - Validação de status e body", function (done) {
      request(uri)
      .get(`users/2`)
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(200); //Valida statusCode
        expect(res.body.data.id).to.be.equal(2); //Valida id do usuário
        expect(res.body.data.email).to.be.equal('janet.weaver@reqres.in'); //Valida email do usuário
        expect(res.body.data.first_name).to.be.equal('Janet'); //Valida primeiro nome do usuário
        expect(res.body.data.last_name).to.be.equal('Weaver'); //Valida último nome do usuário
        expect(res.body.data.avatar).to.be.equal('https://reqres.in/img/faces/2-image.jpg'); //Valida url de avatar do usuário
        expect(res.body.support.url).to.be.equal('https://reqres.in/#support-heading'); //Validando endereço de suporte
        expect(res.body.support.text).to.be.equal('To keep ReqRes free, contributions towards server costs are appreciated!'); //Validando texto do suporte
        done();
      });
    });

    it("(GET) Success (200) - Consultar usuário específico - Validação de schema", function (done) {
      request(uri)
      .get(`users/2`)
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        Joi.validate(res.body.data, schemaUsers, {
          abortEarly: false
        }, (err, data) => { if (err) throw err; });
        done();
      });
    });

    it("(GET) Not Found (404) - Consultar usuário inexistente - Validação de status e body", function (done) {
      request(uri)
      .get(`users/23`)
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(404); //Valida statusCode
        expect(res.body).to.be.eql({}); //Valida objeto vazio do response
        done();
      });
    });
  });

  describe('Exclusão de usuários', function () {
    it("(DELETE) Success (204) - Deletar usuário - Validação de status e body", function (done) {
      request(uri)
      .delete(`users/${user.id}`)
      .end((err, res) => {
        if (err == null) { htmlReport(this, res.body) }; //Adiciona dados ao report
        expect(res.statusCode).to.be.equal(204); //Valida statusCode
        expect(res.body).to.be.eql({}); //Valida objeto vazio do response
        done();
      });
    });
  });
});