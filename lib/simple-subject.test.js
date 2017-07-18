"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_subject_1 = require("./simple-subject");
var assert = require("assert");
describe('SimpleSubject', function () {
    var so;
    beforeEach(function () {
        so = new simple_subject_1.SimpleSubject();
    });
    it('can be subscribed to', function () {
        var sub = so.subscribe(function (data, id) {
            throw new Error();
        });
        assert.throws(function () { return so.notify(null); });
        assert.equal(typeof sub.id, 'number', 'has a valid id');
        assert.equal(typeof sub.unsubscribe, 'function', 'has an unsubscribe method');
    });
    it('notifies observers', function () {
        var ids = [];
        for (var i = 0; i < 3; i++) {
            var sub = so.subscribe(function (payload, id) {
                assert.equal(payload, null, 'payload is null');
                ids.push(id);
            });
        }
        so.notify(null);
        assert.equal(ids.length, 3, 'there should be three ids');
        ids.forEach(function (id, idx) { return assert.equal(id, idx, 'id should match index'); });
    });
    it('notifies observers asyncronously', function (done) {
        var ids = [];
        for (var i = 0; i < 3; i++) {
            var sub = so.subscribe(function (data, id) {
                ids.push(id);
            });
        }
        so.notifyAsync(null);
        var intervalId = setInterval(function () {
            if (ids.length === 3) {
                ids.forEach(function (id, idx) { return assert.equal(id, idx, 'id should match index'); });
                clearInterval(intervalId);
                done();
            }
        }, 0);
    });
    it('can be unsubscribed from', function () {
        var sub = so.subscribe(function (data, id) {
            throw new Error();
        });
        assert.throws(function () { return so.notify(null); }, 'observer was notified');
        sub.unsubscribe();
        assert.doesNotThrow(function () { return so.notify(null); }, 'observer was not notified');
    });
});
//# sourceMappingURL=simple-subject.test.js.map