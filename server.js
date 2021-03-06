'use strict';

const express = require("express");
const bodyParser = require("body-parser");

function start(port) {
    const app = express();
    app.get("/", (request, response) => {
        response.write("Qcloud node course 5");
        response.end();
    });


    app.use(bodyParser.json());
    app.use("/upload", require("./module/upload"));
    app.use("/stat", require("./module/stat"));
    app.use("/resize", require("./module/resize"));
    app.use("/rotate", require("./module/rotate"));
    app.use("/delete", require("./module/delete"));

    app.listen(port || 3000);

    console.log('server begin running...')
}

start();