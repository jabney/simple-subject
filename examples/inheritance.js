/*
  Run 'npm run build' to build the source before running this example.
 */
var SimpleSubject = require('../index')
var run = require('./run')

function Inheritance() {
  SimpleSubject.call(this)
  this._intervalId = null

  // Protect notify so that instances of this class can't call it.
  this.notify = function notify() {
    console.error('Observable.notify is protected')
  }
}

Inheritance.prototype = Object.create(SimpleSubject.prototype)
Inheritance.prototype.constructor = Inheritance

Inheritance.prototype.go = function go(interval) {
  var count = 1
  this._intervalId = setInterval(function () {
    SimpleSubject.prototype.notify.call(this, {event: count++})
  }.bind(this), interval)
}

Inheritance.prototype.stop = function stop() {
  if (this._intervalId !== null) {
    clearInterval(this._intervalId)
    this._intervalId = null
  }
}

run(Inheritance)
