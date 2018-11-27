// walk through given path to return list of files per folder

var fs = require('fs');
var path = require('path');
 
var dirwalk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) { return done(err);}
 
    var pending = list.length;
    if (!pending){ return done(null, results);}
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          dirwalk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
  
};
 
module.exports = dirwalk;
// test it out on home directory
// dirwalk(process.env.HOME, function(err, results) {
 // if (err) throw err;
 // console.log(results);
//});