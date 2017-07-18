"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generate and return an ISubscriptionToken
 *
 * @export
 * @param {IObservers} observers
 * @param {number} id
 * @returns {ISubscriptionToken}
 */
function subscriptionToken(observers, id) {
    return { id: id, unsubscribe: function () {
            delete observers[id];
        } };
}
exports.subscriptionToken = subscriptionToken;
//# sourceMappingURL=subscription-token.js.map