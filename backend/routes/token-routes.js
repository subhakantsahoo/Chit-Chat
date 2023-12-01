const routes = require("express").Router();
//const { post, get } = require('.');
const Token = require("../service/token-service");
let TokenService = new Token();
routes.get("/get", TokenService.get);

module.exports = routes;
