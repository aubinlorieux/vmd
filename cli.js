#!/usr/bin/env node

var atom = require('atom-shell')
var proc = require('child_process')
var path = require('path')
var fs = require('fs')
var program = require('commander');

var serverPath = path.join(__dirname, 'server.js')

var style = false,
    highlight = false;

program
 .version('1.4.0')
 .usage('[options] <filename>')
 .option('-s, --style [file]', 'Specify new style')
 .option('-h, --highlight [file]', 'Specify new highlight style')
 .parse(process.argv);

var md = program.args[0]
if (!md) {
  console.error('No file path specified')
  process.exit(1)
}

if( program.style ) style = program.style;
if( program.highlight ) highlight = program.highlight;

if (!fs.existsSync(path.resolve(md))) {
  console.error('Cannot access', md + ': No such file')
  process.exit(1)
}

if( style ) {

    if(!fs.existsSync(path.resolve(style)) || path.extname(style) !== '.css') {
        console.error('Cannot access', style + ': No such file or Wrong filetype')
        console.log('VMD will use the default stylesheet')
        style = false;
    }
} 

if( highlight ) {
    
    if( !fs.existsSync(path.resolve(highlight)) || path.extname(highlight) !== '.css' ) {
        console.error('Cannot access', highlight, ': No such file or Wrong filetype')
        console.log('VMD will use the default highlight stylesheet')
        highlight = false;
    }
}

// spawn atom-shell
var child = proc.spawn(atom, [serverPath, md, style, highlight])
