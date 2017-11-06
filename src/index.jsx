import _each from 'lodash/each';
import _uniqueId from 'lodash/uniqueId';
import 'should';
const __DEV__ = process.env.NODE_ENV === 'development';

class EventEmitter {
  constructor() {
    this._listeners = {};
    this._count = {};
  }

  get events() {
    return Object.keys(this._listeners);
  }

  countListeners(ev) {
    if(__DEV__) {
      ev.should.be.a.String;
    }
    if(this._count[ev] === void 0) {
      return 0;
    }
    return this._count[ev];
  }

  emit(ev, a, b, c, d, e, f, g, h, i) {
    // up to 10 arguments
    if(this._listeners[ev] !== void 0) {
      _each(this._listeners[ev], (fn) => fn(a, b, c, d, e, f, g, h, i));
    }
  }

  trigger(ev, a, b, c, d, e, f, g, h, i) {
    return this.emit(ev, a, b, c, d, e, f, g, h, i);
  }

  // if a lifespan is provided, chainable, else return a reference to the handle to be removed
  addListener(ev, fn, lifespan = null) {
    if(__DEV__) {
      ev.should.be.a.String;
      fn.should.be.a.Function;
    }
    if(this._listeners[ev] === void 0) {
      this._listeners[ev] = {};
      this._count[ev] = 0;
    }
    const ln = _uniqueId();
    this._listeners[ev][ln] = fn;
    this._count[ev] = this._count[ev] + 1;
    if(lifespan) {
      if(__DEV__) {
        lifespan.should.have.property('onRelease').which.is.a.Function;
      }
      lifespan.onRelease(() => this.removeListener(ev, ln));
      return this;
    }
    return ln;
  }

  on(ev, fn, lifespan = null) {
    return this.addListener(ev, fn, lifespan);
  }

  addHandler(ev, fn, lifespan = null) {
    return this.addListener(ev, fn, lifespan);
  }

  removeListener(ev, ln) {
    if(__DEV__) {
      ev.should.be.a.String;
      ln.should.be.a.String;
      this._listeners.should.have.property(ev).which.is.an.Object;
      this._listeners[ev].should.have.property(ln);
    }
    delete this._listeners[ev][ln];
    this._count[ev] = this._count[ev] - 1;
    if(this._count[ev] === 0) {
      delete this._listeners[ev];
      delete this._count[ev];
    }
  }

  off(ev, ln) {
    return this.removeListener(ev, ln);
  }

  removeHandler(ev, ln) {
    return this.removeListener(ev, ln);
  }
}

export default EventEmitter;
