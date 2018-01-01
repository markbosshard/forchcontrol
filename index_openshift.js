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

  // MAKE DIALOGFLOW HAPPY WITH A QUICK ANSWER
  var answer = {
    'speech': 'Okay, moment.',
    'displayText': 'Okay, moment.', 
    'data': {'nothing': 'really'},
    'contextOut': [],
    'source': 'DuckDuckGo'
  }
  console.log("answer = " + answer);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(answer);

  decide_action(body);
    
});

function decide_action(body) {
  var http = require("http");
  if (body.result.action == 'garage_openaction') {
    command_garage(http);
  } else if (body.result.action == 'watercooker_on') {
    turnon_watercooker(http);
  }
}


function command_garage(http) {
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
      console.log('BodyFromRaspy: ' + body);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.end();
}

function turnon_watercooker(http) {
  var options = {
    host: 'markforch.dd-dns.de',
    port: 1337,
    path: '/teekocher?onoroff=on'
  };

  var req = http.get(options, function(resc) {
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    resc.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      console.log('BODYteekocherFromRaspy: ' + body);
    })
  });
  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
}
