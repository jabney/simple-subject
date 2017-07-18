import { ISubscriptionToken, subscriptionToken } from './subscription-token'
import { IObservers } from './observers'
import {TNotifyCallback} from './notify-callback'

/**
 * A simple subject/observer pattern implementation. Observers can
 * subscribe and receive notifications when a specified event ocurrs.
 *
 * @export
 * @class SimpleSubject
 */
export class SimpleSubject<T> {
  private _observers: IObservers
  private _nextId: number

  constructor() {
    this._observers = Object.create(null)
    this._nextId = 0
  }

  /**
   *
   *
   * @param {TNotifyCallback} callback
   * @returns {ISubscriptionToken}
   * @memberof SimpleSubject
   */
  public subscribe(callback: TNotifyCallback): ISubscriptionToken {
    const id = this._nextId++
    this._observers[id] = callback
    return subscriptionToken(this._observers, id)
  }

  /**
   * Notify observers and deliver a data payload
   *
   * @param {*} [payload=null] The data payload to deliver to subscribers
   * @returns {this}
   * @memberof SimpleSubject
   */
  public notify(payload: T): this {
    for (const id in this._observers) {
      const callback = this._observers[id]
      callback(payload, +id)
    }
    return this
  }

  /**
   * Notify observers asynchronously and deliver a data payload
   *
   * @param {*} [payload=null] The data payload to deliver to subscribers
   * @returns {this}
   * @memberof SimpleSubject
   */
  public notifyAsync(payload: T): this {
    for (const id in this._observers) {
      const callback = this._observers[id]
      setTimeout(executeCallbackFn<T>(callback, payload, +id), 0)
    }
    return this
  }
}

/**
 * Helper for notifyAsync setTimeout calls
 * @function executeCallbackFn
 * @param {TNotifyCallback} callback
 * @param {*} payload
 * @param {number} id
 * @returns {() => void}
 */
function executeCallbackFn<T>(
    callback: TNotifyCallback,
    payload: T,
    id: number): () => void {
  return function () {
    callback(payload, id)
  }
}
