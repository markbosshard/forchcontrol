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
app.listen(process.env.PORT || 8080, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/garage_openshift', (req, res) => {  
  let body = req.body;
  console.log(body);
  
  var answer = {
    'speech': 'arack Hussein Obama II was the 44th and current President of the United States.',
    'displayText': 'Barack Hussein Obama II was the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ', 
    'data': {'nothing': 'really'},
    'contextOut': [],
    'source': 'DuckDuckGo'
  }
  console.log("answer = " + answer);

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

  var req = http.request(options, function(resb) {
    console.log('Status: ' + resb.statusCode);
    console.log('Headers: ' + JSON.stringify(resb.headers));
    resb.setEncoding('utf8');
    resb.on('data', function (body) {
      console.log('Body: ' + body);
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200).send(answer);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write('{"string": "Hello, World"}');
  req.end();
  
  
  
});
