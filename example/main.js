'use strict'

const Updater = require('electron-resources-updater')
const BrowserWindow = require('browser-window')
const app = require('app')

const updater = new Updater({
  resources: [{
    from: 'http://code.jquery.com/jquery-2.1.4.min.js',
    to: 'jquery.min.js'
  }]
})

let mainWindow = null

app.on('window-all-close', function() {
  app.exit()
})

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400
  })

  mainWindow.loadUrl('file://' + __dirname + '/main.html')

  mainWindow.openDevTools()

  updater.update()

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
