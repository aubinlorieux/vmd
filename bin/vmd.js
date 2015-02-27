#!/usr/bin/env node

/**
 * Module dependencies.
 */
var _ = require('lodash');
var program = require('commander');
var package = require('../package.json');


program
 .version(package.version, '-v, --version')
 .description('An application to display markdown file in a separate window.');

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
});

// $ vmd show <path>
program
 .command('show <path>')
 .description('Display markdown file')
 .option('-s, --style <path>', 'Specify new style')
 .option('-h, --highlight <path>', 'Specify new highlight style')
 .action(require('./vmd-show'))
 .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ vmd show README.md');
    console.log('    $ vmd show -s css/styles.css README.md');
    console.log();
 });

 // $ vmd export <path> <destination>
 program
  .command('Export <source> <destination>')
  .description('export markdown file')
  .option('-f, --format <type>', 'Format to export')
  .action(require('./vmd-export'));

// $ vmd 
//
program.parse(process.argv);
if( !program.args.length) program.help();
