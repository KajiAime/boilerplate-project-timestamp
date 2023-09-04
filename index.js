// index.js
// where your node app starts

// init project
var url = require('url');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function (req, res) {
  const time = new Date();
  res.json({unix: Date.UTC(time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate(), time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds(), time.getUTCMilliseconds()), utc: time.toUTCString()});
});

app.get(/^\/api\/[-]?[0-9]+$/, function (req, res) {
  const link = url.parse(req.url, true);
  const newUnix = link.pathname.split("/")[2]-0;
  const time = new Date(newUnix);
  if(time.toUTCString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: newUnix, utc: time.toUTCString()});
  }
});

app.get("/api/:date?", function (req, res) {
  let rawDate = req.params.date;
  const time = new Date(rawDate);
  if (time.toUTCString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else{
    res.json({unix: Date.UTC(time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate(), time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds(), time.getUTCMilliseconds()), utc: time.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
