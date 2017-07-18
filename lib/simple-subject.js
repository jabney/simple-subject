"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscription_token_1 = require("./subscription-token");
/**
 * A simple subject/observer pattern implementation. Observers can
 * subscribe and receive notifications when a specified event ocurrs.
 *
 * @export
 * @class SimpleSubject
 */
var SimpleSubject = (function () {
    function SimpleSubject() {
        this._observers = Object.create(null);
        this._nextId = 0;
    }
    /**
     *
     *
     * @param {TNotifyCallback} callback
     * @returns {ISubscriptionToken}
     * @memberof SimpleSubject
     */
    SimpleSubject.prototype.subscribe = function (callback) {
        var id = this._nextId++;
        this._observers[id] = callback;
        return subscription_token_1.subscriptionToken(this._observers, id);
    };
    /**
     * Notify observers and deliver a data payload
     *
     * @param {*} [payload=null] The data payload to deliver to subscribers
     * @returns {this}
     * @memberof SimpleSubject
     */
    SimpleSubject.prototype.notify = function (payload) {
        for (var id in this._observers) {
            var callback = this._observers[id];
            callback(payload, +id);
        }
        return this;
    };
    /**
     * Notify observers asynchronously and deliver a data payload
     *
     * @param {*} [payload=null] The data payload to deliver to subscribers
     * @returns {this}
     * @memberof SimpleSubject
     */
    SimpleSubject.prototype.notifyAsync = function (payload) {
        for (var id in this._observers) {
            var callback = this._observers[id];
            setTimeout(executeCallbackFn(callback, payload, +id), 0);
        }
        return this;
    };
    return SimpleSubject;
}());
exports.SimpleSubject = SimpleSubject;
/**
 * Helper for notifyAsync setTimeout calls
 * @function executeCallbackFn
 * @param {TNotifyCallback} callback
 * @param {*} payload
 * @param {number} id
 * @returns {() => void}
 */
function executeCallbackFn(callback, payload, id) {
    return function () {
        callback(payload, id);
    };
}
//# sourceMappingURL=simple-subject.js.map