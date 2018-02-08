"use strict";

var _ = require("../");

var _lifespan = _interopRequireDefault(require("lifespan"));

require("should");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;
describe('EventEmitter', function () {
  // Stub tests. Will refactor later.
  it('should not throw', function () {
    var emitter = new _.EventEmitter();
    var count = 0;
    var ln = emitter.on('increase', function (n) {
      return count = count + (n || 1);
    });
    count.should.be.exactly(0);
    emitter.trigger('increase');
    count.should.be.exactly(1);
    emitter.trigger('increase', 41);
    count.should.be.exactly(42);
    emitter.off('increase', ln);
    emitter.trigger('increase', 100);
    count.should.be.exactly(42);
    var count2 = 1;
    var lifespan = new _lifespan.default();
    emitter.on('multiplyBy', function (p) {
      return count2 = count2 * p;
    }, lifespan);
    count2.should.be.exactly(1);
    emitter.trigger('multiplyBy', 2);
    count2.should.be.exactly(2);
    emitter.trigger('multiplyBy', 4);
    count2.should.be.exactly(8);
    lifespan.release();
    emitter.trigger('multiplyBy', 2);
    count2.should.be.exactly(8);
  });
});