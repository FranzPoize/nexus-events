"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _each2 = _interopRequireDefault(require("lodash/each"));

var _uniqueId2 = _interopRequireDefault(require("lodash/uniqueId"));

require("should");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __DEV__ = process.env.NODE_ENV === 'development';

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._listeners = {};
    this._count = {};
  }

  _createClass(EventEmitter, [{
    key: "countListeners",
    value: function countListeners(ev) {
      if (__DEV__) {
        ev.should.be.a.String;
      }

      if (this._count[ev] === void 0) {
        return 0;
      }

      return this._count[ev];
    }
  }, {
    key: "emit",
    value: function emit(ev, a, b, c, d, e, f, g, h, i) {
      // up to 10 arguments
      if (this._listeners[ev] !== void 0) {
        (0, _each2.default)(this._listeners[ev], function (fn) {
          return fn(a, b, c, d, e, f, g, h, i);
        });
      }
    }
  }, {
    key: "trigger",
    value: function trigger(ev, a, b, c, d, e, f, g, h, i) {
      return this.emit(ev, a, b, c, d, e, f, g, h, i);
    } // if a lifespan is provided, chainable, else return a reference to the handle to be removed

  }, {
    key: "addListener",
    value: function addListener(ev, fn) {
      var _this = this;

      var lifespan = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (__DEV__) {
        ev.should.be.a.String;
        fn.should.be.a.Function;
      }

      if (this._listeners[ev] === void 0) {
        this._listeners[ev] = {};
        this._count[ev] = 0;
      }

      var ln = (0, _uniqueId2.default)();
      this._listeners[ev][ln] = fn;
      this._count[ev] = this._count[ev] + 1;

      if (lifespan) {
        if (__DEV__) {
          lifespan.should.have.property('onRelease').which.is.a.Function;
        }

        lifespan.onRelease(function () {
          return _this.removeListener(ev, ln);
        });
        return this;
      }

      return ln;
    }
  }, {
    key: "on",
    value: function on(ev, fn) {
      var lifespan = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this.addListener(ev, fn, lifespan);
    }
  }, {
    key: "addHandler",
    value: function addHandler(ev, fn) {
      var lifespan = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this.addListener(ev, fn, lifespan);
    }
  }, {
    key: "removeListener",
    value: function removeListener(ev, ln) {
      if (__DEV__) {
        ev.should.be.a.String;
        ln.should.be.a.String;
        this._listeners.should.have.property(ev).which.is.an.Object;

        this._listeners[ev].should.have.property(ln);
      }

      delete this._listeners[ev][ln];
      this._count[ev] = this._count[ev] - 1;

      if (this._count[ev] === 0) {
        delete this._listeners[ev];
        delete this._count[ev];
      }
    }
  }, {
    key: "off",
    value: function off(ev, ln) {
      return this.removeListener(ev, ln);
    }
  }, {
    key: "removeHandler",
    value: function removeHandler(ev, ln) {
      return this.removeListener(ev, ln);
    }
  }, {
    key: "events",
    get: function get() {
      return Object.keys(this._listeners);
    }
  }]);

  return EventEmitter;
}();

var _default = EventEmitter;
exports.default = _default;