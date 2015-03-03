#!/usr/bin/env node

/**
 * Module dependencies
 */
const atom = require('atom-shell')
const proc = require('child_process')
const path = require('path')
const fs = require('fs')

/**
 * Module variables
 * @private
 */
const join = path.join
const resolve = path.resolve
const extname = path.extname
const serverPath = join(__dirname, '../server.js')

module.exports = function (filename, options) {

  var md, style, highlight;

  //
  // Test existance of a markdown file
  //
  md = filename;
  if (!md) {
    console.error('No file path specified')
    process.exit(1)
  }

  if (!fs.existsSync(resolve(md))) {
    console.error('Cannot access', md + ': No such file')
    process.exit(1)
  }

  //Define args
  var args = [serverPath, md]

  //
  // Test existance otherwise do nothing
  //
  style = options.style;
  if (style) {

    if (!fs.existsSync(resolve(style)) || extname(style) !== '.css') {
      console.error('Cannot access', style + ': No such file or Wrong filetype')
      console.log('VMD will use the default stylesheet')
      style = false
    } else {
      args.push(style)
    }
  }

  //
  // Test existance otherwise do nothing
  //
  highlight = options.highlight;
  if (highlight) {

    if (!fs.existsSync(resolve(highlight)) || extname(highlight) !== '.css') {
      console.error('Cannot access', highlight, ': No such file or Wrong filetype')
      console.log('VMD will use the default highlight stylesheet')
      highlight = false
    } else {
      args.push(highlight)
    }
  }

  // spawn atom-shell
  return proc.spawn(atom, args)

};