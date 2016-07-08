var YOUTU_SDK = require('tencentyun');

// 自定义空间名称，在http://console.qcloud.com/image/bucket创建
var bucket = 'test2';

// 10030012 即项目ID 在http://console.qcloud.com/image/bucket查看
// 后两项为secretid和secretkey 在http://console.qcloud.com/image/project查看

YOUTU_SDK.conf.setAppInfo('10030012', 'AKID1bvHeG324hT7wngYmi3CSfBLmnzt49Ze', '6GjtLYAYAZqiTirn78uT8dKvb9xYX6o2', bucket);

// 自定义文件名
var file_id = 'sample' +'01.jpg';

YOUTU_SDK.imagev2.delete(bucket, file_id, function(d){
    console.log(d)
    YOUTU_SDK.imagev2.upload('test.jpg', bucket, file_id, function(ret){
        console.log(ret);
        YOUTU_SDK.imagev2.stat(bucket, file_id, function(ret){
            console.log('stat...')
            console.log(ret);
        });
    });
});


