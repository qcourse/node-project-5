'use strict';

const YOUTU_SDK = require('tencentyun');


const appId = "10030012";
const secretId = "AKID1bvHeG324hT7wngYmi3CSfBLmnzt49Ze";
const secretKey = "6GjtLYAYAZqiTirn78uT8dKvb9xYX6o2";
const bucketName = 'test2';

YOUTU_SDK.conf.setAppInfo(appId, secretId, secretKey);


/**
 * 把 COS 接口的 callback 形式风格 API 转换为返回 Promise 的接口，这样允许使用 co + generator 进行异步控制
 *
 * @param {Function} fn 原 API 函数
 * @param {Array} args 调用 API 的参数（不包含最后一个 callback 参数）
 * @param {Function} callback 调用 API 的回调函数
 * @param {any} context 调用的 API 函数的 Context
 */
function promisify(fn, args, callback, context) {
    return new Promise((resolve, reject) => {
        fn.apply(context, args.concat((result) => {
            if (callback) {
                callback(result);
            }
            if (result.code) {
                reject(result);
            } else {
                resolve(result);
            }
        }));
    });
}

/**
 * @method upload
 *
 * 上传文件到 万象优图 服务
 *
 * @param {string} filePath     要上传的文件的本地文件路径
 * @param {string} bucketName   目标 bucket
 * @param {string} dstPath     指定上传到 Bucket 下的指定路径
 * @param {Function(result)} callback  上传完成的回掉
 */
exports.upload = function(filePath, bucketName, dstPath, callback) {
    return promisify(YOUTU_SDK.imagev2.upload, [filePath, bucketName, dstPath], callback, YOUTU_SDK);
};

/**
 * @method stat
 *
 * 获取 万象优图 中的文件信息
 *
 * @param {string} bucketName 要删除的文件所在的 bucket
 * @param {string} path       要删除的文件所在的路径
 * @param {Function} callback 上传完成后的回掉
 */
exports.stat = function(bucketName, path, callback) {
    return promisify(YOUTU_SDK.imagev2.stat, [bucketName, path], callback, YOUTU_SDK);
};



exports.bucketName = bucketName;
