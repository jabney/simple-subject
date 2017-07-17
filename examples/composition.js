/*
  Run 'npm run build' to build the source before running this example.
 */
var SimpleSubject = require('../index')
var run = require('./run')

function Composition() {
  this._observable = new SimpleSubject()
  this._intervalId = null
}

Composition.prototype.subscribe = function subscribe(callback) {
  return this._observable.subscribe(callback)
}

Composition.prototype.go = function go(interval) {
  var count = 1
  this._intervalId = setInterval(function () {
    this._observable.notifyAsync({event: count++})
  }.bind(this), interval)
}

Composition.prototype.stop = function stop() {
  if (this._intervalId !== null) {
    clearInterval(this._intervalId)
    this._intervalId = null
  }
}

run(Composition)
