/**
 * Module dependencies
 */
const BrowserWindow = require('browser-window')
const assert = require('assert')
const app = require('app')
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

/**
 * Module Variable
 * @private
 */
const join = path.join

require('crash-reporter').start()

const filePath = process.argv[2]
const stylePath = process.argv[3]
const highlightPath = process.argv[4]

assert(filePath, 'no file path specified')

global.baseUrl = path.relative(__dirname, path.resolve(path.dirname(filePath)))
if (global.baseUrl) { global.baseUrl += '/'; }

const watcher = chokidar.watch(filePath, {
  usePolling: true
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('ready', function () {
  var win = new BrowserWindow({
    title: path.basename(filePath) + ' - vmd',
    icon: join(__dirname, 'resources/vmd.png'),
    width: 800,
    height: 600
  });

  win.loadUrl(join('file://', __dirname, '/index.html'))
  win.webContents.on('did-finish-load', sendMarkdown)
  win.on('closed', function () {
    win = null
  });

  watcher.on('change', sendMarkdown)

  function sendMarkdown () {
      var file = fs.readFileSync(filePath, { encoding: 'utf8' })
      win.webContents.send('md', file, stylePath, highlightPath)
  }

});
