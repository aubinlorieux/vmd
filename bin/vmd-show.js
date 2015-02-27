#!/usr/bin/env node

/**
 * Module dependencies
 */
var atom = require('atom-shell');
var proc = require('child_process');
var path = require('path');
var fs = require('fs');

/**
 * Module variables
 * @private
 */
var join = path.join;
var resolve = path.resolve;
var extname = path.extname;
var serverPath = join(__dirname, '../server.js');

module.exports = function (path, options) {

  var md, style, highlight;
  console.log(path);
  console.log(style);
  console.log(highlight);

  //
  // Test existance of a markdown file
  //
  md = path;
  if (!md) {
    console.error('No file path specified');
    process.exit(1);
  }

  if (!fs.existsSync(resolve(md))) {
    console.error('Cannot access', md + ': No such file');
    process.exit(1);
  }


  //
  // Test existance otherwise do nothing
  //
  style = options.style;
  if (style) {

    if (!fs.existsSync(resolve(style)) || extname(style) !== '.css') {
      console.error('Cannot access', style + ': No such file or Wrong filetype');
      console.log('VMD will use the default stylesheet');
      style = false;
    }
  }

  //
  // Test existance otherwise do nothing
  //
  highlight = options.highlight;
  if (highlight) {

    if (!fs.existsSync(resolve(highlight)) || extname(highlight) !== '.css') {
      console.error('Cannot access', highlight, ': No such file or Wrong filetype');
      console.log('VMD will use the default highlight stylesheet');
      highlight = false;
    }
  }

  // spawn atom-shell
  return proc.spawn(atom, [serverPath, md, style, highlight]);

};