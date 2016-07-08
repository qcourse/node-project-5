'use strict';

const path = require("path");
const fs = require("fs");
const YOUTU_SDK = require('../lib/youtu');
const async = require("co");
const bucketName = YOUTU_SDK.bucketName;

const deleteFile = (request, response) => async (function * () {

    let fileName = request.query.name;

    console.log('fileName='+fileName)
    console.log('bucketName='+bucketName)

    YOUTU_SDK.delete(bucketName, fileName, (result) => {

        console.log('#1. delete file done, please check result');
        console.log(JSON.stringify(result));

        response.json(result);

    });


});
module.exports = deleteFile;