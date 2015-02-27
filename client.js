const marked = require('marked')
const highlightjs = require('highlight.js')
const ipc = require('ipc')
const remote = require('remote')

marked.setOptions({
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value
  }
})

function changeCss(cssFile, cssLinkIndex) {

  var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", cssFile);

  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);

}

ipc.on('md', function (raw, style, highlight) {
  const md = marked(raw)
  const base = document.querySelector('base');
  const body = document.querySelector('.markdown-body')
  base.setAttribute('href', remote.getGlobal('baseUrl'))
  body.innerHTML = md

  if( style !== 'false' ) {
    changeCss(style, 0);
  }

  if( highlight !== 'false' ) {
    changeCss(highlight, 1);
  }

})

window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 27) {
    remote.getCurrentWindow().close()
  }
});