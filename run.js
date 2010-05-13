#!/usr/bin/env node

var sys       = require('sys')
  , fs        = require('fs')
  , multipart = require('./libs/multipart')
	, path      = require('path')
  , http      = require('http')

var SERVER = 'localhost:8009';

// read file
// parse annotations
// POST all dep files and test file to node
//
//% blah.js

Array.prototype.flatten = function() {
	var items = [];
	this.forEach(function(item) {
    if (item != null && item != undefined) {
		  items.push(item);
		}
  });
	return items;
}

TestFile = function(filename) {
	this.filename = filename;
}

TestFile.prototype = {
  parseLine: function(line) {
    var match = line.match(/\/\/%(.*)/);
    if (match) {
			return match[1].trim();
		}
  },

  parse: function() {
    var data = fs.readFileSync(this.filename);
		var lines = data.split('\n')

    this.dependencies = lines.map(this.parseLine).flatten();
		sys.log(JSON.stringify(this.dependencies));
  },

  run: function() {
    this.parse();
    this.post();
  },

  post: function() {
    //var server = http.createClient(8009, 'localhost');
  },

  

}

process.argv.forEach(function (val, index, array) {
  if (val != __filename && val != 'node') {
	  var currentDir = path.dirname(__filename);
		var file = path.join(currentDir, val);

		var tf = new TestFile(file);
		tf.run()
	}
});


/*

    //CRAP!: Multipart library is not implemented (NYI)
    //
    var request = server.request('POST', '/run', {'Content-Type': 'multipart/form-data'});
    request.addListener('response', function (response) {
      sys.puts('STATUS: ' + response.statusCode);
      sys.puts('HEADERS: ' + JSON.stringify(response.headers));
      response.setEncoding('utf8');
      response.addListener('data', function (chunk) {
        sys.puts('BODY: ' + chunk);
      });
    });


    var writer = multipart.writer();

    // attach event handlers for the things we care about.
    writer.ondata = function (chunk) {
      sys.log("writing chunk to server");
      sys.log(chunk);
      request.write(chunk)
    };
    writer.onend = function () { request.end(); };
    
    // now trigger the events to fire by feeding files through it.
    writer.boundary = "test";
    this.dependencies.forEach(function(file) {

      sys.log("partBegin");
      writer.partBegin({ "content-type" : "text/plain", "filename": file });

      var data = fs.readFileSync(file);
      sys.log("writingData");
      writer.write(data);

      writer.partEnd();
    });
    writer.close();
    */
