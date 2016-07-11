'use strict';

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const destPath = './upload/';

function upload(request, response) {


    const processUpload = multer({
        dest: destPath
    }).single('image');
    processUpload(request, response, uploadToServer);

    //文件上传到服务器
    function uploadToServer(uploadError) {

        if (uploadError) {
            response.json({ uploadError });
            return;
        }

        const file = request.file;
        if (!file) {
            response.json({ msg: "file is required" });
            return;
        }
        console.log("#1. File uploaded to server:");
        console.log(JSON.stringify(file));

    }

    
}
module.exports = upload;
