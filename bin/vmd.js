#!/usr/bin/env node

/**
 * Module dependencies.
 */
const _ = require('lodash')
const program = require('commander')
const package = require('../package.json')


program
 .version(package.version, '-v, --version')
 .description('An application to display markdown file in a separate window.')

//
// Normalize version argument, i.e
//
// $ vmd -v
// $ vmd -V
// $ vmd --version
//

// make `-v` case-incensitive
process.argv = _.map(process.argv, function(arg) {
  return (arg === '-V' ) ? '-v' : arg;
})

program
  .option('-s, --style <path>', 'Specify new style')
  .option('-h, --highlight <path>', 'Specify new highlight style')
  .parse(process.argv)

//Get option params
var options = {
  style: program.style,
  highlight: program.highlight
}

// $ vmd - Display help
//
if( !program.args.length) program.help()

require('./vmd-show')(program.args[0], options)
