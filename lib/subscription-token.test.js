"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var subscription_token_1 = require("./subscription-token");
function getObservers() {
    return {
        0: function () { return null; },
        1: function () { return null; },
        2: function () { return null; }
    };
}
describe('subscriptionToken', function () {
    var observers;
    beforeEach(function () {
        observers = getObservers();
    });
    it('returns an ISubscriptionToken', function () {
        var token = subscription_token_1.subscriptionToken(observers, 0);
        assert.equal(Object.keys(token).length, 2, 'token has two keys');
        assert.equal(token.id, 0, 'token has id property');
        assert.equal(typeof token.unsubscribe, 'function', 'token has unsubscribe function');
    });
    it('removes observers', function () {
        Object.keys(observers).map(function (id) {
            return subscription_token_1.subscriptionToken(observers, +id);
        }).forEach(function (token, index) {
            assert.equal(typeof observers[token.id], 'function', 'observer is defined');
            assert.equal(observers[token.id](null, index), null, 'function returns null');
            token.unsubscribe();
            assert.equal(typeof observers[token.id], 'undefined', 'observer is undefined');
        });
        assert.equal(Object.keys(observers).length, 0, 'all observers have been removed');
    });
});
//# sourceMappingURL=subscription-token.test.js.map