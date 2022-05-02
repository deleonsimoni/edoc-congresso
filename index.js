// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');
const https = require('https');
const fs = require('fs')

const privateKey = fs.readFileSync('etc/letsencrypt/live/xxiendiperio2022.com.br/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/xxiendiperio2022.com.br/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/xxiendiperio2022.com.br/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const httpsServer = https.createServer(credentials, app);

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
  });

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });

}

module.exports = app;
