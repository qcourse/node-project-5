'use strict';

const path = require("path");
const fs = require("fs");
const YOUTU_SDK = require('../lib/youtu');
const http = require('http');
const bucketName = YOUTU_SDK.bucketName;
const async = require("co");

const rotate = (request, response) => async (function * () {

    let fileName = request.query.name;
    let rotate = request.query.rotate||0;

    console.log('fileName='+fileName)
    console.log('bucketName='+bucketName)

    YOUTU_SDK.stat(bucketName, fileName, (result) => {

        console.log('#1. stat done, please check result and begin rotate');
        console.log(JSON.stringify(result));

        if(result && result.code==0){
            let data = result.data;
            if(data){
                let downloadUrl = data.downloadUrl;

                //图片旋转规则参考https://www.qcloud.com/doc/product/275/RESTful%20API#8-.E5.9B.BE.E5.83.8F.E5.A4.84.E7.90.86
                downloadUrl = downloadUrl+'?imageMogr2/rotate/'+rotate;

                http.get(downloadUrl,function(res){
                    res.pipe(response);
                });
            }else{
                response.json(result);
            }

        }else{
            response.json(result);
        }

    });

});
module.exports = rotate;