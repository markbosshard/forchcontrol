'use strict';

// code from: https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

const https = require('https');
var fs = require('fs');

//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//console.log(privateKey);
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};
// 1) find out where certificates lay on server
// 2) help1 https://github.com/expressjs/express/wiki/Migrating-from-2.x-to-3.x "application function"
// 3) help2 https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/garage_openshift', (req, res) => {  
  let body = req.body;
  console.log(body);

  var http = require("http");
  var options = {
    hostname: 'markforch.dd-dns.de',
    port: 1337,
    path: '/garage_google',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  var req = http.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
      console.log('Body: ' + body);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write('{"string": "Hello, World"}');
  req.end();
  
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(body);
  
});





