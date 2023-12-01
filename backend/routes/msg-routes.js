const routes = require("express").Router();
//const { post, get } = require('.');
const Msg = require("../service/msg-service");
let Msgservice = new Msg();
routes.post("/create", Msgservice.create);
routes.get("/get", Msgservice.get);
routes.get("/one/:id", Msgservice.getbyid);

module.exports = routes;
