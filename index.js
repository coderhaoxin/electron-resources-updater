'use strict'

const request = require('requisition')
const path = require('path')
const fs = require('mz/fs')
const app = require('app')

class Updater {
  constructor(opts) {
    this.resources = opts.resources || {}
    this.interval = opts.interval || 60 * 60 * 1000
  }

  /**
   * @private
   */
  check(from, to) {
    let self = this

    return new Promise(function(resolve) {
      fs.stat(to)
      .then(function(info) {
        let mtime = info.mtime.getTime

        if (Date.now() - mtime < self.interval) {
          return resolve(false)
        }

        // TODO: etag, lastModified

        return resolve(true)
      })
      .catch(function(err) {
        console.warn(err)
        resolve(true)
      })
    })
  }

  update() {
    let self = this

    return Promise.all(this.resources.map(function(resource) {
      let from = resource.from
      // process.cwd() return '/'
      let to = path.join(app.getAppPath(), resource.to)

      return new Promise(function(resolve, reject) {
        self
          .check(from, to)
          .then(function(toUpdate) {
            if (toUpdate) {
              return request(from)
            }
          })
          .then(function(res) {
            if (res) {
              return res.saveTo(to)
            }
          })
          .catch(function(err) {
            console.warn(err)
            resolve(false)
          })
      })
    }))
  }
}

/**
 * exports
 */

module.exports = Updater
