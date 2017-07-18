import { ISubscriptionToken } from './subscription-token';
import { TNotifyCallback } from './notify-callback';
/**
 * A simple subject/observer pattern implementation. Observers can
 * subscribe and receive notifications when a specified event ocurrs.
 *
 * @export
 * @class SimpleSubject
 */
export declare class SimpleSubject<T> {
    private _observers;
    private _nextId;
    constructor();
    /**
     *
     *
     * @param {TNotifyCallback} callback
     * @returns {ISubscriptionToken}
     * @memberof SimpleSubject
     */
    subscribe(callback: TNotifyCallback): ISubscriptionToken;
    /**
     * Notify observers and deliver a data payload
     *
     * @param {*} [payload=null] The data payload to deliver to subscribers
     * @returns {this}
     * @memberof SimpleSubject
     */
    notify(payload: T): this;
    /**
     * Notify observers asynchronously and deliver a data payload
     *
     * @param {*} [payload=null] The data payload to deliver to subscribers
     * @returns {this}
     * @memberof SimpleSubject
     */
    notifyAsync(payload: T): this;
}
