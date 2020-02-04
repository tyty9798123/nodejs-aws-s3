var AWS = require('aws-sdk');
var fs = require('fs');
require('dotenv').config()
function upload(data) {
    AWS.config.update({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    });

    var s3 = new AWS.S3({
        params: {
            Bucket: process.env.AWS_S3_IMAGE_BUCKET_NAME,
            Key: 'uploads/test.png', //檔案名稱
            ACL: 'public-read' //檔案權限
        }
    });

    s3.upload({
        Body: data
    }).on('httpUploadProgress', function(evt) {

        //上傳進度

        console.log(evt);
    }).
    send(function(err, data) {
        
        //上傳完畢或是碰到錯誤

    });
}

fs.readFile("./image/test.png", function(err, data){
    upload(data);
})