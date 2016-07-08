'use strict';

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const YOUTU_SDK = require('../lib/youtu');
const bucketName = YOUTU_SDK.bucketName;
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

        uploadToYoutu(file);
    }

    //通过优图SDK把文件上传到优图bucket
    function uploadToYoutu(file) {

        console.log('#2. begin upload to Youtu');
        const uploadPath = `/uploads/${file.originalname}`;
        YOUTU_SDK.upload(file.path, bucketName, uploadPath, (result) => {

            console.log('#3. upload to Youtu done, please check result');
            console.log(JSON.stringify(result));

            response.json(result);

            //服务器上的文件删掉
            fs.unlink(file.path);


        });
    }
}
module.exports = upload;
