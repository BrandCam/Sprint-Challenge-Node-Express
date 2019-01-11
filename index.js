const express = require("express");
const server = express();

const projectRouter = require("./routers/projectRouters.js");
const actionRouter = require("./routers/actionRouters.js");

server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.listen(5000);
