'use strict'

const appVersion = require('../package').version
const packager = require('electron-packager')
const assign = require('object-assign')
const join = require('path').join

const electronVersion = '0.30.6'

const dir = join(__dirname, '../example')
const out = join(__dirname, 'build')

// default
let pkgs = [{
  // win
  arch: 'all',
  platform: 'win32'
}, {
  // osx
  arch: 'x64',
  platform: 'darwin'
}]

pkgs.forEach(function(pkg) {
  let opts = {
    name: 'example',
    overwrite: true,
    dir: dir,
    out: out,
    version: electronVersion,
    'app-version': appVersion
  }

  opts = assign(opts, pkg)

  packager(opts, function(err, appPath) {
    if (err) {
      console.error(err)
    } else {
      console.log('success - path: %s', appPath)
    }
  })
})
