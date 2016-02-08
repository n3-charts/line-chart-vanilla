module n3Charts.Utils {
  'use strict';

  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }

  function baseExtend(dst, objs, deep) {
    var h = dst.$$hashKey;

    for (var i = 0, ii = objs.length; i < ii; ++i) {
      var obj = objs[i];
      if (!isObject(obj) && !isFunction(obj)) continue;
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        var src = obj[key];

        if (deep && isObject(src)) {
          if (isDate(src)) {
            dst[key] = new Date(src.valueOf());
          } else if (isRegExp(src)) {
            dst[key] = new RegExp(src);
          } else if (src.nodeName) {
            dst[key] = src.cloneNode(true);
          } else if (isElement(src)) {
            dst[key] = src.clone();
          } else {
            if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
            baseExtend(dst[key], [src], true);
          }
        } else {
          dst[key] = src;
        }
      }
    }

    setHashKey(dst, h);
    return dst;
  }

  export function extend(dst, ...args: any[]) {
    return baseExtend(dst, args, false);
  }

  export function isNumber(value) {
    return typeof value === 'number';
  }

  export function isString(value) {
    return typeof value === 'string';
  }

  export function isDate(value) {
    return toString.call(value) === '[object Date]';
  }

  export function isElement(node) {
    return !!(node &&
      (node.nodeName  // we are a direct element
        || (node.prop && node.attr && node.find)));  // we have an on and find method part of jQuery API
  }

  export function isRegExp(value) {
    return toString.call(value) === '[object RegExp]';
  }

  export function isFunction(value) {
    return typeof value === 'function';
  }

  export function isArray(value) {
    return Array.isArray(value);
  }

  export function isObject(value) {
    // http://jsperf.com/isobject4
    return value !== null && typeof value === 'object';
  }

  export function isBlankObject(value) {
    return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
  }

  export function copy(source, destination?) {
    var stackSource = [];
    var stackDest = [];

    if (destination) {
      // Empty the destination object
      if (isArray(destination)) {
        destination.length = 0;
      } else {
          destination.forEach(function(value, key) {
          if (key !== '$$hashKey') {
            delete destination[key];
          }
        });
      }

      stackSource.push(source);
      stackDest.push(destination);
      return copyRecurse(source, destination);
    }

    return copyElement(source);

    function copyRecurse(source, destination) {
      var h = destination.$$hashKey;
      var result, key;
      if (isArray(source)) {
        for (var i = 0, ii = source.length; i < ii; i++) {
          destination.push(copyElement(source[i]));
        }
      } else if (isBlankObject(source)) {
        // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
        for (key in source) {
          destination[key] = copyElement(source[key]);
        }
      } else {
        // Slow path, which must rely on hasOwnProperty
        for (key in source) {
          if (source.hasOwnProperty(key)) {
            destination[key] = copyElement(source[key]);
          }
        }
      }
      setHashKey(destination, h);
      return destination;
    }

    function copyElement(source) {
      // Simple values
      if (!isObject(source)) {
        return source;
      }

      // Already copied values
      var index = stackSource.indexOf(source);
      if (index !== -1) {
        return stackDest[index];
      }

      var needsRecurse = false;
      var destination = copyType(source);

      if (destination === undefined) {
        destination = isArray(source) ? [] : Object.create(Object.getPrototypeOf(source));
        needsRecurse = true;
      }

      stackSource.push(source);
      stackDest.push(destination);

      return needsRecurse
      ? copyRecurse(source, destination)
      : destination;
    }

    function copyType(source) {
      switch (toString.call(source)) {
        case '[object Int8Array]':
        case '[object Int16Array]':
        case '[object Int32Array]':
        case '[object Float32Array]':
        case '[object Float64Array]':
        case '[object Uint8Array]':
        case '[object Uint8ClampedArray]':
        case '[object Uint16Array]':
        case '[object Uint32Array]':
        return new source.constructor(copyElement(source.buffer));

        case '[object ArrayBuffer]':
        //Support: IE10
        if (!source.slice) {
          var copied = new ArrayBuffer(source.byteLength);
          new Uint8Array(copied).set(new Uint8Array(source));
          return copied;
        }
        return source.slice(0);

        case '[object Boolean]':
        case '[object Number]':
        case '[object String]':
        case '[object Date]':
        return new source.constructor(source.valueOf());

        case '[object RegExp]':
        var re = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
        re.lastIndex = source.lastIndex;
        return re;
      }

      if (isFunction(source.cloneNode)) {
        return source.cloneNode(true);
      }
    }
  }
}