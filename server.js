'use strict';

const express = require("express");

function start(port) {
    const app = express();
    app.get("/", (request, response) => {
        response.write("Qcloud node course 5");
        response.end();
    });


    
    app.listen(port || 3000);

    console.log('server begin running...')
}

start();
