'use strict';

// code from: https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

const https = require('https');

var PythonShell = require('python-shell');

// Sets server port and logs message on success
app.listen(process.env.PORT || 443, () => console.log('webhook is listening'));

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





