import { SimpleSubject } from './simple-subject'
import { ISubscriptionToken } from './subscription-token'
import assert = require('assert')

describe('SimpleSubject', function () {
  let so: SimpleSubject

  beforeEach(function () {
    so = new SimpleSubject()
  })

  it('can be subscribed to', function () {
    const sub: ISubscriptionToken = so.subscribe((data, id) => {})
    assert.equal(typeof sub.id, 'number', 'has a valid id')
    assert.equal(typeof sub.unsubscribe, 'function', 'has an unsubscribe method')
  })

  it('notifies observers', function () {
    const ids: number[] = []

    for (let i = 0; i < 3; i++) {
      const sub: ISubscriptionToken = so.subscribe((payload, id) => {
        assert.equal(payload, null, 'payload is null')
        ids.push(id)
      })
    }

    so.notify(null)

    assert.equal(ids.length, 3, 'there should be three ids')
    ids.forEach((id, idx) => assert.equal(id, idx, 'id should match index'))
  })

  it('notifies observers asyncronously', function (done) {
    const ids: number[] = []

    for (let i = 0; i < 3; i++) {
      const sub: ISubscriptionToken = so.subscribe((data, id) => {
        ids.push(id)
      })
    }

    so.notifyAsync(null)

    const intervalId = setInterval(function () {
      if (ids.length === 3) {
        ids.forEach((id, idx) => assert.equal(id, idx, 'id should match index'))
        clearInterval(intervalId)
        done()
      }
    }, 0)
  })

  it('can be unsubscribed from', function () {
    const sub: ISubscriptionToken = so.subscribe(function (data, id) {
      throw new Error()
    })

    assert.throws(() => so.notify(null), 'observer was notified')
    sub.unsubscribe()
    assert.doesNotThrow(() => so.notify(null), 'observer was not notified')
  })
})
