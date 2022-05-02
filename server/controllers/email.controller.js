const nodemailer = require('nodemailer');
const config = require('../config/config');
var inlineBase64 = require('nodemailer-plugin-inline-base64');
const aws = require("aws-sdk");



module.exports = {
    sendMail,
    sendMailAWS
}


function sendMail(to, subject, text, attachment) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.MAIL_FROM,
          pass: config.MAIL_SECRET
        }
      });

    transporter.use('compile', inlineBase64({cidPrefix: 'anexo'}));

    var mailOptions = {
      from: config.MAIL_FROM,
      to: to,
      subject: subject,
      html: text,
    };

    if(attachment){
        
      mailOptions['attachments'] = 
        [
            {    
                filename: attachment.fileName,
                content: new Buffer(attachment.file,'utf-8')
            }
        ];

    }
          
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Erro ao enviar Email: ' + error);
      } else {
        console.log('Email enviado: ' + info.response);
      }

      transporter.close();
    });
}


function sendMailAWS(to, subject, text, attachment) {

  const configAWS= {
    apiVersion: '2010-12-01',
    accessKeyId: config.AWS_SES_ID,
    secretAccessKey: config.AWS_SES_KEY,
    region: 'sa-east-1'
  }

  let transporter = nodemailer.createTransport({
    SES: new aws.SES(configAWS)
  });

  transporter.use('compile', inlineBase64({cidPrefix: 'anexo'}));

    var mailOptions = {
      from: config.MAIL_FROM,
      bcc: to,
      subject: subject,
      html: text,
    };
    
    if(attachment){
        
      mailOptions['attachments'] = 
        [
            {    
                filename: attachment.fileName,
                content: new Buffer(attachment.file,'utf-8')
            }
        ];

    }

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Erro ao enviar Email: ' + error);
      } else {
        console.log('Email enviado: ' + info.response);
      }

      transporter.close();
    });
/*
    attachments: [
      {    utf-8 string as an attachment
          filename: 'text1.txt',
          content: 'hello world!'
      },
      {    binary buffer as an attachment
          filename: 'text2.txt',
          content: new Buffer('hello world!','utf-8')
      },
      {    file on disk as an attachment
          filename: 'text3.txt',
          path: '/path/to/file.txt' // stream this file
      },
      {    filename and content type is derived from path
          path: '/path/to/file.txt'
      },
      {    stream as an attachment
          filename: 'text4.txt',
          content: fs.createReadStream('file.txt')
      },
      {    define custom content type for the attachment
          filename: 'text.bin',
          content: 'hello world!',
          contentType: 'text/plain'
      },
      {    use URL as an attachment
          filename: 'license.txt',
          path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
      },
      {    encoded string as an attachment
          filename: 'text1.txt',
          content: 'aGVsbG8gd29ybGQh',
          encoding: 'base64'
      },
      {    data uri as an attachment
          path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
      }
  ]
*/

}