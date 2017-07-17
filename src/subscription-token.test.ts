import assert = require('assert')
import { ISubscriptionToken, subscriptionToken } from './subscription-token'
import { IObservers } from './observers'
import { TNotifyCallback } from './notify-callback'

function getObservers(): IObservers {
  return {
    0: () => null,
    1: () => null,
    2: () => null
  }
}

describe('subscriptionToken', function () {
  let observers: IObservers

  beforeEach(function () {
    observers = getObservers()
  })

  it('returns an ISubscriptionToken', function () {
    const token: ISubscriptionToken = subscriptionToken(observers, 0)

    assert.equal(Object.keys(token).length, 2, 'token has two keys')
    assert.equal(token.id, 0, 'token has id property')
    assert.equal(typeof token.unsubscribe, 'function', 'token has unsubscribe function')
  })

  it('removes observers', function () {
    Object.keys(observers).map((id) => {
      return subscriptionToken(observers, +id)
    }).forEach(function (token) {
      assert.equal(typeof observers[token.id], 'function', 'observer is defined')
      token.unsubscribe()
      assert.equal(typeof observers[token.id], 'undefined', 'observer is undefined')
    })
    assert.equal(Object.keys(observers).length, 0, 'all observers have been removed')
  })
})
