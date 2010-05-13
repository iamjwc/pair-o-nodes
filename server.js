
var sys      = require('sys')
  , path     = require('path')
  , http     = require('http')
  , paperboy = require('./deps/node.paperboy.js/lib/paperboy')
  , multipart = require('./libs/multipart')
  , ws       = require('./deps/node.ws.js/ws')


var VIEWS = path.join(path.dirname(__filename), 'views');

  var multiparser = multipart.parser();
  for (var i in multiparser) {
    sys.log(i]);
    sys.log(multiparser[i]);
  }
  multiparser.addListener("onPartBegin", function() {
    sys.log('mp new part');
  });
  multiparser.addListener("onData", function() {
    sys.log('mp data');
  });
  multiparser.addListener("onPartEnd", function() {
    sys.log('mp part end');
  });
  multiparser.addListener("onError", function() {
    sys.log('error');
  });

  multiparser.write("sdf");


http.createServer(function(req, res) {
  sys.log(req.url);



  var data = "";
  req.addListener("data", function(chunk) {
    sys.log("Got chunk");
    data += chunk;
  }).addListener("end", function() {
    sys.log("End");
    sys.log(data)
  })
}).listen(8009);


ws.createServer(function (websocket) {
  websocket.addListener("connect", function (resource) {
    sys.log("ws connect: " + resource);
  }).addListener("close", function () {
    sys.log("ws close");
  }).addListener("data", function (data) { 
    // handle incoming data
    sys.debug(data);

    // send data to client
    websocket.write("Thanks!");
  });
  
}).listen(8008);

