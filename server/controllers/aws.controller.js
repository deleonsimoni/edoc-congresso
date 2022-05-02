const AWS = require('aws-sdk');
const config = require('../config/config');

module.exports = {
  uploadFile,
  downloadFile,
  sendEmailAWS,
  uploadBase64,
}

function uploadFile(key, file) {

  const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  });

  var s3Config = {
    Bucket: 'endipe',
    Key: key,
    Body: file
  };

  return new Promise((resolve, reject) => {
    s3.putObject(s3Config, (err, resp) => {
      if (err) {
        console.log('Erro AWS', err);
        reject({ success: false, data: err });
      }
      resolve({ sucess: true, data: resp });
    })
  });
}

function uploadBase64(key, file) {

  //let buf = Buffer.from(books[i].miniature.replace(/^data:image\/\w+;base64,/, ""),'base64')

  const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  });

  var s3Config = {
    Bucket: 'ffainfinity',
    Key: key,
    Body: file,
    ACL: "public-read",
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  return new Promise((resolve, reject) => {
    s3.putObject(s3Config, (err, resp) => {
      if (err) {
        console.log('Erro AWS', err);
        reject({ success: false, data: err });
      }
      resolve({ sucess: true, data: resp });
    })
  });
}

async function downloadFile(key) {

  const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  });

  var s3Config = {
    Bucket: 'endipe',
    Key: key
  };

  return new Promise((resolve, reject) => {
    s3.getObject(s3Config, (err, resp) => {
      if (err) {
        console.log('Erro AWS', err);
        reject({ success: false, data: err });
      }
      resolve({ sucess: true, data: resp });
    })
  })
};

async function sendEmailAWS(cc, to, subject, message, attachment) {

  console.log(config.AWS_SES_ID, config.AWS_SECRET_ACCESS_KEY)

  const configAWS = {
    apiVersion: '2010-12-01',
    accessKeyId: config.AWS_SES_ID,
    secretAccessKey: config.AWS_SES_KEY,
    region: 'sa-east-1'
  }

  // Create sendEmail params 
  var params = {
    Destination: { /* required */

      BccAddresses: [
        'infinitybit.ti@gmail.com',
        'jonathan.schenker@hotmail.com'
        /* more items */
      ],
      ToAddresses: [
        'deleon.simoni@gmail.com'
      ],
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: "UTF-8",
          Data: message
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email'
      }
    },

    Source: 'deleon.simoni@gmail.com', /* required */
    ReplyToAddresses: [
      'jonathan.schenker@hotmail.com',
      /* more items */
    ],
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES(configAWS).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function (data) {
      console.log(data.MessageId);
    }).catch(
      function (err) {
        console.error(err, err.stack);
      });
};