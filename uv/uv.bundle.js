(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R2 = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R2 && typeof R2.apply === "function" ? R2.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R2 && typeof R2.ownKeys === "function") {
        ReflectOwnKeys = R2.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter5() {
        EventEmitter5.init.call(this);
      }
      module.exports = EventEmitter5;
      module.exports.once = once;
      EventEmitter5.EventEmitter = EventEmitter5;
      EventEmitter5.prototype._events = void 0;
      EventEmitter5.prototype._eventsCount = 0;
      EventEmitter5.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter5, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter5.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter5.prototype.setMaxListeners = function setMaxListeners(n3) {
        if (typeof n3 !== "number" || n3 < 0 || NumberIsNaN(n3)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n3 + ".");
        }
        this._maxListeners = n3;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter5.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter5.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter5.prototype.emit = function emit(type) {
        var args = [];
        for (var i3 = 1; i3 < arguments.length; i3++) args.push(arguments[i3]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i3 = 0; i3 < len; ++i3)
            ReflectApply(listeners[i3], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m2;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m2 = _getMaxListeners(target);
          if (m2 > 0 && existing.length > m2 && !existing.warned) {
            existing.warned = true;
            var w3 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w3.name = "MaxListenersExceededWarning";
            w3.emitter = target;
            w3.type = type;
            w3.count = existing.length;
            ProcessEmitWarning(w3);
          }
        }
        return target;
      }
      EventEmitter5.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter5.prototype.on = EventEmitter5.prototype.addListener;
      EventEmitter5.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter5.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter5.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter5.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i3, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i3 = list.length - 1; i3 >= 0; i3--) {
            if (list[i3] === listener || list[i3].listener === listener) {
              originalListener = list[i3].listener;
              position = i3;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter5.prototype.off = EventEmitter5.prototype.removeListener;
      EventEmitter5.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i3;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i3 = 0; i3 < keys.length; ++i3) {
            key = keys[i3];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i3 = listeners.length - 1; i3 >= 0; i3--) {
            this.removeListener(type, listeners[i3]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap3) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap3 ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap3 ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter5.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter5.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter5.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter5.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter5.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n3) {
        var copy = new Array(n3);
        for (var i3 = 0; i3 < n3; ++i3)
          copy[i3] = arr[i3];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i3 = 0; i3 < ret.length; ++i3) {
          ret[i3] = arr[i3].listener || arr[i3];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/set-cookie-parser/lib/set-cookie.js
  var require_set_cookie = __commonJS({
    "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
      "use strict";
      var defaultParseOptions = {
        decodeValues: true,
        map: false,
        silent: false
      };
      function isNonEmptyString(str) {
        return typeof str === "string" && !!str.trim();
      }
      function parseString(setCookieValue, options) {
        var parts = setCookieValue.split(";").filter(isNonEmptyString);
        var nameValuePairStr = parts.shift();
        var parsed = parseNameValuePair(nameValuePairStr);
        var name = parsed.name;
        var value = parsed.value;
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        try {
          value = options.decodeValues ? decodeURIComponent(value) : value;
        } catch (e2) {
          console.error(
            "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
            e2
          );
        }
        var cookie = {
          name,
          value
        };
        parts.forEach(function(part) {
          var sides = part.split("=");
          var key = sides.shift().trimLeft().toLowerCase();
          var value2 = sides.join("=");
          if (key === "expires") {
            cookie.expires = new Date(value2);
          } else if (key === "max-age") {
            cookie.maxAge = parseInt(value2, 10);
          } else if (key === "secure") {
            cookie.secure = true;
          } else if (key === "httponly") {
            cookie.httpOnly = true;
          } else if (key === "samesite") {
            cookie.sameSite = value2;
          } else if (key === "partitioned") {
            cookie.partitioned = true;
          } else {
            cookie[key] = value2;
          }
        });
        return cookie;
      }
      function parseNameValuePair(nameValuePairStr) {
        var name = "";
        var value = "";
        var nameValueArr = nameValuePairStr.split("=");
        if (nameValueArr.length > 1) {
          name = nameValueArr.shift();
          value = nameValueArr.join("=");
        } else {
          value = nameValuePairStr;
        }
        return { name, value };
      }
      function parse2(input, options) {
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        if (!input) {
          if (!options.map) {
            return [];
          } else {
            return {};
          }
        }
        if (input.headers) {
          if (typeof input.headers.getSetCookie === "function") {
            input = input.headers.getSetCookie();
          } else if (input.headers["set-cookie"]) {
            input = input.headers["set-cookie"];
          } else {
            var sch = input.headers[Object.keys(input.headers).find(function(key) {
              return key.toLowerCase() === "set-cookie";
            })];
            if (!sch && input.headers.cookie && !options.silent) {
              console.warn(
                "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
              );
            }
            input = sch;
          }
        }
        if (!Array.isArray(input)) {
          input = [input];
        }
        if (!options.map) {
          return input.filter(isNonEmptyString).map(function(str) {
            return parseString(str, options);
          });
        } else {
          var cookies = {};
          return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
            var cookie = parseString(str, options);
            cookies2[cookie.name] = cookie;
            return cookies2;
          }, cookies);
        }
      }
      function splitCookiesString(cookiesString) {
        if (Array.isArray(cookiesString)) {
          return cookiesString;
        }
        if (typeof cookiesString !== "string") {
          return [];
        }
        var cookiesStrings = [];
        var pos = 0;
        var start;
        var ch;
        var lastComma;
        var nextStart;
        var cookiesSeparatorFound;
        function skipWhitespace() {
          while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
            pos += 1;
          }
          return pos < cookiesString.length;
        }
        function notSpecialChar() {
          ch = cookiesString.charAt(pos);
          return ch !== "=" && ch !== ";" && ch !== ",";
        }
        while (pos < cookiesString.length) {
          start = pos;
          cookiesSeparatorFound = false;
          while (skipWhitespace()) {
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
              lastComma = pos;
              pos += 1;
              skipWhitespace();
              nextStart = pos;
              while (pos < cookiesString.length && notSpecialChar()) {
                pos += 1;
              }
              if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                cookiesSeparatorFound = true;
                pos = nextStart;
                cookiesStrings.push(cookiesString.substring(start, lastComma));
                start = pos;
              } else {
                pos = lastComma + 1;
              }
            } else {
              pos += 1;
            }
          }
          if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
          }
        }
        return cookiesStrings;
      }
      module.exports = parse2;
      module.exports.parse = parse2;
      module.exports.parseString = parseString;
      module.exports.splitCookiesString = splitCookiesString;
    }
  });

  // src/rewrite/html.js
  var import_events = __toESM(require_events(), 1);

  // node_modules/parse5/dist/common/unicode.js
  var UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
    65534,
    65535,
    131070,
    131071,
    196606,
    196607,
    262142,
    262143,
    327678,
    327679,
    393214,
    393215,
    458750,
    458751,
    524286,
    524287,
    589822,
    589823,
    655358,
    655359,
    720894,
    720895,
    786430,
    786431,
    851966,
    851967,
    917502,
    917503,
    983038,
    983039,
    1048574,
    1048575,
    1114110,
    1114111
  ]);
  var REPLACEMENT_CHARACTER = "\uFFFD";
  var CODE_POINTS;
  (function(CODE_POINTS2) {
    CODE_POINTS2[CODE_POINTS2["EOF"] = -1] = "EOF";
    CODE_POINTS2[CODE_POINTS2["NULL"] = 0] = "NULL";
    CODE_POINTS2[CODE_POINTS2["TABULATION"] = 9] = "TABULATION";
    CODE_POINTS2[CODE_POINTS2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
    CODE_POINTS2[CODE_POINTS2["LINE_FEED"] = 10] = "LINE_FEED";
    CODE_POINTS2[CODE_POINTS2["FORM_FEED"] = 12] = "FORM_FEED";
    CODE_POINTS2[CODE_POINTS2["SPACE"] = 32] = "SPACE";
    CODE_POINTS2[CODE_POINTS2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
    CODE_POINTS2[CODE_POINTS2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
    CODE_POINTS2[CODE_POINTS2["AMPERSAND"] = 38] = "AMPERSAND";
    CODE_POINTS2[CODE_POINTS2["APOSTROPHE"] = 39] = "APOSTROPHE";
    CODE_POINTS2[CODE_POINTS2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
    CODE_POINTS2[CODE_POINTS2["SOLIDUS"] = 47] = "SOLIDUS";
    CODE_POINTS2[CODE_POINTS2["DIGIT_0"] = 48] = "DIGIT_0";
    CODE_POINTS2[CODE_POINTS2["DIGIT_9"] = 57] = "DIGIT_9";
    CODE_POINTS2[CODE_POINTS2["SEMICOLON"] = 59] = "SEMICOLON";
    CODE_POINTS2[CODE_POINTS2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
    CODE_POINTS2[CODE_POINTS2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
    CODE_POINTS2[CODE_POINTS2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
    CODE_POINTS2[CODE_POINTS2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
    CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
    CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
    CODE_POINTS2[CODE_POINTS2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
    CODE_POINTS2[CODE_POINTS2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
    CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
    CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
  })(CODE_POINTS || (CODE_POINTS = {}));
  var SEQUENCES = {
    DASH_DASH: "--",
    CDATA_START: "[CDATA[",
    DOCTYPE: "doctype",
    SCRIPT: "script",
    PUBLIC: "public",
    SYSTEM: "system"
  };
  function isSurrogate(cp) {
    return cp >= 55296 && cp <= 57343;
  }
  function isSurrogatePair(cp) {
    return cp >= 56320 && cp <= 57343;
  }
  function getSurrogatePairCodePoint(cp1, cp2) {
    return (cp1 - 55296) * 1024 + 9216 + cp2;
  }
  function isControlCodePoint(cp) {
    return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
  }
  function isUndefinedCodePoint(cp) {
    return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
  }

  // node_modules/parse5/dist/common/error-codes.js
  var ERR;
  (function(ERR2) {
    ERR2["controlCharacterInInputStream"] = "control-character-in-input-stream";
    ERR2["noncharacterInInputStream"] = "noncharacter-in-input-stream";
    ERR2["surrogateInInputStream"] = "surrogate-in-input-stream";
    ERR2["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
    ERR2["endTagWithAttributes"] = "end-tag-with-attributes";
    ERR2["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
    ERR2["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
    ERR2["unexpectedNullCharacter"] = "unexpected-null-character";
    ERR2["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
    ERR2["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
    ERR2["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
    ERR2["missingEndTagName"] = "missing-end-tag-name";
    ERR2["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
    ERR2["unknownNamedCharacterReference"] = "unknown-named-character-reference";
    ERR2["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
    ERR2["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
    ERR2["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
    ERR2["eofBeforeTagName"] = "eof-before-tag-name";
    ERR2["eofInTag"] = "eof-in-tag";
    ERR2["missingAttributeValue"] = "missing-attribute-value";
    ERR2["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
    ERR2["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
    ERR2["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
    ERR2["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
    ERR2["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
    ERR2["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
    ERR2["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
    ERR2["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
    ERR2["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
    ERR2["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
    ERR2["cdataInHtmlContent"] = "cdata-in-html-content";
    ERR2["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
    ERR2["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
    ERR2["eofInDoctype"] = "eof-in-doctype";
    ERR2["nestedComment"] = "nested-comment";
    ERR2["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
    ERR2["eofInComment"] = "eof-in-comment";
    ERR2["incorrectlyClosedComment"] = "incorrectly-closed-comment";
    ERR2["eofInCdata"] = "eof-in-cdata";
    ERR2["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
    ERR2["nullCharacterReference"] = "null-character-reference";
    ERR2["surrogateCharacterReference"] = "surrogate-character-reference";
    ERR2["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
    ERR2["controlCharacterReference"] = "control-character-reference";
    ERR2["noncharacterCharacterReference"] = "noncharacter-character-reference";
    ERR2["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
    ERR2["missingDoctypeName"] = "missing-doctype-name";
    ERR2["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
    ERR2["duplicateAttribute"] = "duplicate-attribute";
    ERR2["nonConformingDoctype"] = "non-conforming-doctype";
    ERR2["missingDoctype"] = "missing-doctype";
    ERR2["misplacedDoctype"] = "misplaced-doctype";
    ERR2["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
    ERR2["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
    ERR2["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
    ERR2["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
    ERR2["abandonedHeadElementChild"] = "abandoned-head-element-child";
    ERR2["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
    ERR2["nestedNoscriptInHead"] = "nested-noscript-in-head";
    ERR2["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
  })(ERR || (ERR = {}));

  // node_modules/parse5/dist/tokenizer/preprocessor.js
  var DEFAULT_BUFFER_WATERLINE = 1 << 16;
  var Preprocessor = class {
    constructor(handler) {
      this.handler = handler;
      this.html = "";
      this.pos = -1;
      this.lastGapPos = -2;
      this.gapStack = [];
      this.skipNextNewLine = false;
      this.lastChunkWritten = false;
      this.endOfChunkHit = false;
      this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
      this.isEol = false;
      this.lineStartPos = 0;
      this.droppedBufferSize = 0;
      this.line = 1;
      this.lastErrOffset = -1;
    }
    /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
    get col() {
      return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
    }
    get offset() {
      return this.droppedBufferSize + this.pos;
    }
    getError(code, cpOffset) {
      const { line, col, offset } = this;
      const startCol = col + cpOffset;
      const startOffset = offset + cpOffset;
      return {
        code,
        startLine: line,
        endLine: line,
        startCol,
        endCol: startCol,
        startOffset,
        endOffset: startOffset
      };
    }
    _err(code) {
      if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
        this.lastErrOffset = this.offset;
        this.handler.onParseError(this.getError(code, 0));
      }
    }
    _addGap() {
      this.gapStack.push(this.lastGapPos);
      this.lastGapPos = this.pos;
    }
    _processSurrogate(cp) {
      if (this.pos !== this.html.length - 1) {
        const nextCp = this.html.charCodeAt(this.pos + 1);
        if (isSurrogatePair(nextCp)) {
          this.pos++;
          this._addGap();
          return getSurrogatePairCodePoint(cp, nextCp);
        }
      } else if (!this.lastChunkWritten) {
        this.endOfChunkHit = true;
        return CODE_POINTS.EOF;
      }
      this._err(ERR.surrogateInInputStream);
      return cp;
    }
    willDropParsedChunk() {
      return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
      if (this.willDropParsedChunk()) {
        this.html = this.html.substring(this.pos);
        this.lineStartPos -= this.pos;
        this.droppedBufferSize += this.pos;
        this.pos = 0;
        this.lastGapPos = -2;
        this.gapStack.length = 0;
      }
    }
    write(chunk, isLastChunk) {
      if (this.html.length > 0) {
        this.html += chunk;
      } else {
        this.html = chunk;
      }
      this.endOfChunkHit = false;
      this.lastChunkWritten = isLastChunk;
    }
    insertHtmlAtCurrentPos(chunk) {
      this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
      this.endOfChunkHit = false;
    }
    startsWith(pattern, caseSensitive) {
      if (this.pos + pattern.length > this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return false;
      }
      if (caseSensitive) {
        return this.html.startsWith(pattern, this.pos);
      }
      for (let i3 = 0; i3 < pattern.length; i3++) {
        const cp = this.html.charCodeAt(this.pos + i3) | 32;
        if (cp !== pattern.charCodeAt(i3)) {
          return false;
        }
      }
      return true;
    }
    peek(offset) {
      const pos = this.pos + offset;
      if (pos >= this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return CODE_POINTS.EOF;
      }
      const code = this.html.charCodeAt(pos);
      return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
    }
    advance() {
      this.pos++;
      if (this.isEol) {
        this.isEol = false;
        this.line++;
        this.lineStartPos = this.pos;
      }
      if (this.pos >= this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return CODE_POINTS.EOF;
      }
      let cp = this.html.charCodeAt(this.pos);
      if (cp === CODE_POINTS.CARRIAGE_RETURN) {
        this.isEol = true;
        this.skipNextNewLine = true;
        return CODE_POINTS.LINE_FEED;
      }
      if (cp === CODE_POINTS.LINE_FEED) {
        this.isEol = true;
        if (this.skipNextNewLine) {
          this.line--;
          this.skipNextNewLine = false;
          this._addGap();
          return this.advance();
        }
      }
      this.skipNextNewLine = false;
      if (isSurrogate(cp)) {
        cp = this._processSurrogate(cp);
      }
      const isCommonValidRange = this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976;
      if (!isCommonValidRange) {
        this._checkForProblematicCharacters(cp);
      }
      return cp;
    }
    _checkForProblematicCharacters(cp) {
      if (isControlCodePoint(cp)) {
        this._err(ERR.controlCharacterInInputStream);
      } else if (isUndefinedCodePoint(cp)) {
        this._err(ERR.noncharacterInInputStream);
      }
    }
    retreat(count) {
      this.pos -= count;
      while (this.pos < this.lastGapPos) {
        this.lastGapPos = this.gapStack.pop();
        this.pos--;
      }
      this.isEol = false;
    }
  };

  // node_modules/parse5/dist/common/token.js
  var TokenType;
  (function(TokenType2) {
    TokenType2[TokenType2["CHARACTER"] = 0] = "CHARACTER";
    TokenType2[TokenType2["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
    TokenType2[TokenType2["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
    TokenType2[TokenType2["START_TAG"] = 3] = "START_TAG";
    TokenType2[TokenType2["END_TAG"] = 4] = "END_TAG";
    TokenType2[TokenType2["COMMENT"] = 5] = "COMMENT";
    TokenType2[TokenType2["DOCTYPE"] = 6] = "DOCTYPE";
    TokenType2[TokenType2["EOF"] = 7] = "EOF";
    TokenType2[TokenType2["HIBERNATION"] = 8] = "HIBERNATION";
  })(TokenType || (TokenType = {}));
  function getTokenAttr(token, attrName) {
    for (let i3 = token.attrs.length - 1; i3 >= 0; i3--) {
      if (token.attrs[i3].name === attrName) {
        return token.attrs[i3].value;
      }
    }
    return null;
  }

  // node_modules/entities/lib/esm/generated/decode-data-html.js
  var decode_data_html_default = new Uint16Array(
    // prettier-ignore
    '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c3) => c3.charCodeAt(0))
  );

  // node_modules/entities/lib/esm/generated/decode-data-xml.js
  var decode_data_xml_default = new Uint16Array(
    // prettier-ignore
    "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((c3) => c3.charCodeAt(0))
  );

  // node_modules/entities/lib/esm/decode_codepoint.js
  var _a;
  var decodeMap = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  var fromCodePoint = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
      let output = "";
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += String.fromCharCode(codePoint);
      return output;
    }
  );
  function replaceCodePoint(codePoint) {
    var _a2;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return 65533;
    }
    return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
  }

  // node_modules/entities/lib/esm/decode.js
  var CharCodes;
  (function(CharCodes2) {
    CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
    CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
    CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
    CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
    CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
    CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
    CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
    CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
    CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
    CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
    CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
  })(CharCodes || (CharCodes = {}));
  var TO_LOWER_BIT = 32;
  var BinTrieFlags;
  (function(BinTrieFlags2) {
    BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  })(BinTrieFlags || (BinTrieFlags = {}));
  function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
  }
  function isAsciiAlphaNumeric(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
  }
  function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
  }
  var EntityDecoderState;
  (function(EntityDecoderState2) {
    EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  var DecodingMode;
  (function(DecodingMode2) {
    DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
    DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
    DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
  })(DecodingMode || (DecodingMode = {}));
  var EntityDecoder = class {
    constructor(decodeTree, emitCodePoint, errors) {
      this.decodeTree = decodeTree;
      this.emitCodePoint = emitCodePoint;
      this.errors = errors;
      this.state = EntityDecoderState.EntityStart;
      this.consumed = 1;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
      this.decodeMode = decodeMode;
      this.state = EntityDecoderState.EntityStart;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
      switch (this.state) {
        case EntityDecoderState.EntityStart: {
          if (str.charCodeAt(offset) === CharCodes.NUM) {
            this.state = EntityDecoderState.NumericStart;
            this.consumed += 1;
            return this.stateNumericStart(str, offset + 1);
          }
          this.state = EntityDecoderState.NamedEntity;
          return this.stateNamedEntity(str, offset);
        }
        case EntityDecoderState.NumericStart: {
          return this.stateNumericStart(str, offset);
        }
        case EntityDecoderState.NumericDecimal: {
          return this.stateNumericDecimal(str, offset);
        }
        case EntityDecoderState.NumericHex: {
          return this.stateNumericHex(str, offset);
        }
        case EntityDecoderState.NamedEntity: {
          return this.stateNamedEntity(str, offset);
        }
      }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
      if (offset >= str.length) {
        return -1;
      }
      if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
        this.state = EntityDecoderState.NumericHex;
        this.consumed += 1;
        return this.stateNumericHex(str, offset + 1);
      }
      this.state = EntityDecoderState.NumericDecimal;
      return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end, base) {
      if (start !== end) {
        const digitCount = end - start;
        this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
        this.consumed += digitCount;
      }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char) || isHexadecimalCharacter(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 16);
          return this.emitNumericEntity(char, 3);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 16);
      return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 10);
          return this.emitNumericEntity(char, 2);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 10);
      return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
      var _a2;
      if (this.consumed <= expectedLength) {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      if (lastCp === CharCodes.SEMI) {
        this.consumed += 1;
      } else if (this.decodeMode === DecodingMode.Strict) {
        return 0;
      }
      this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
      if (this.errors) {
        if (lastCp !== CharCodes.SEMI) {
          this.errors.missingSemicolonAfterCharacterReference();
        }
        this.errors.validateNumericCharacterReference(this.result);
      }
      return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
      const { decodeTree } = this;
      let current = decodeTree[this.treeIndex];
      let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      for (; offset < str.length; offset++, this.excess++) {
        const char = str.charCodeAt(offset);
        this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
        if (this.treeIndex < 0) {
          return this.result === 0 || // If we are parsing an attribute
          this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
          (valueLength === 0 || // And there should be no invalid characters.
          isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
        }
        current = decodeTree[this.treeIndex];
        valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        if (valueLength !== 0) {
          if (char === CharCodes.SEMI) {
            return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
          }
          if (this.decodeMode !== DecodingMode.Strict) {
            this.result = this.treeIndex;
            this.consumed += this.excess;
            this.excess = 0;
          }
        }
      }
      return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
      var _a2;
      const { result, decodeTree } = this;
      const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
      this.emitNamedEntityData(result, valueLength, this.consumed);
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
      return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
      const { decodeTree } = this;
      this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
      if (valueLength === 3) {
        this.emitCodePoint(decodeTree[result + 2], consumed);
      }
      return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
      var _a2;
      switch (this.state) {
        case EntityDecoderState.NamedEntity: {
          return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        }
        // Otherwise, emit a numeric entity if we have one.
        case EntityDecoderState.NumericDecimal: {
          return this.emitNumericEntity(0, 2);
        }
        case EntityDecoderState.NumericHex: {
          return this.emitNumericEntity(0, 3);
        }
        case EntityDecoderState.NumericStart: {
          (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
          return 0;
        }
        case EntityDecoderState.EntityStart: {
          return 0;
        }
      }
    }
  };
  function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
    return function decodeWithTrie(str, decodeMode) {
      let lastIndex = 0;
      let offset = 0;
      while ((offset = str.indexOf("&", offset)) >= 0) {
        ret += str.slice(lastIndex, offset);
        decoder.startEntity(decodeMode);
        const len = decoder.write(
          str,
          // Skip the "&"
          offset + 1
        );
        if (len < 0) {
          lastIndex = offset + decoder.end();
          break;
        }
        lastIndex = offset + len;
        offset = len === 0 ? lastIndex + 1 : lastIndex;
      }
      const result = ret + str.slice(lastIndex);
      ret = "";
      return result;
    };
  }
  function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    if (branchCount === 0) {
      return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    if (jumpOffset) {
      const value = char - jumpOffset;
      return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
    }
    let lo = nodeIdx;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
      const mid = lo + hi >>> 1;
      const midVal = decodeTree[mid];
      if (midVal < char) {
        lo = mid + 1;
      } else if (midVal > char) {
        hi = mid - 1;
      } else {
        return decodeTree[mid + branchCount];
      }
    }
    return -1;
  }
  var htmlDecoder = getDecoder(decode_data_html_default);
  var xmlDecoder = getDecoder(decode_data_xml_default);

  // node_modules/parse5/dist/common/html.js
  var NS;
  (function(NS2) {
    NS2["HTML"] = "http://www.w3.org/1999/xhtml";
    NS2["MATHML"] = "http://www.w3.org/1998/Math/MathML";
    NS2["SVG"] = "http://www.w3.org/2000/svg";
    NS2["XLINK"] = "http://www.w3.org/1999/xlink";
    NS2["XML"] = "http://www.w3.org/XML/1998/namespace";
    NS2["XMLNS"] = "http://www.w3.org/2000/xmlns/";
  })(NS || (NS = {}));
  var ATTRS;
  (function(ATTRS2) {
    ATTRS2["TYPE"] = "type";
    ATTRS2["ACTION"] = "action";
    ATTRS2["ENCODING"] = "encoding";
    ATTRS2["PROMPT"] = "prompt";
    ATTRS2["NAME"] = "name";
    ATTRS2["COLOR"] = "color";
    ATTRS2["FACE"] = "face";
    ATTRS2["SIZE"] = "size";
  })(ATTRS || (ATTRS = {}));
  var DOCUMENT_MODE;
  (function(DOCUMENT_MODE2) {
    DOCUMENT_MODE2["NO_QUIRKS"] = "no-quirks";
    DOCUMENT_MODE2["QUIRKS"] = "quirks";
    DOCUMENT_MODE2["LIMITED_QUIRKS"] = "limited-quirks";
  })(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
  var TAG_NAMES;
  (function(TAG_NAMES2) {
    TAG_NAMES2["A"] = "a";
    TAG_NAMES2["ADDRESS"] = "address";
    TAG_NAMES2["ANNOTATION_XML"] = "annotation-xml";
    TAG_NAMES2["APPLET"] = "applet";
    TAG_NAMES2["AREA"] = "area";
    TAG_NAMES2["ARTICLE"] = "article";
    TAG_NAMES2["ASIDE"] = "aside";
    TAG_NAMES2["B"] = "b";
    TAG_NAMES2["BASE"] = "base";
    TAG_NAMES2["BASEFONT"] = "basefont";
    TAG_NAMES2["BGSOUND"] = "bgsound";
    TAG_NAMES2["BIG"] = "big";
    TAG_NAMES2["BLOCKQUOTE"] = "blockquote";
    TAG_NAMES2["BODY"] = "body";
    TAG_NAMES2["BR"] = "br";
    TAG_NAMES2["BUTTON"] = "button";
    TAG_NAMES2["CAPTION"] = "caption";
    TAG_NAMES2["CENTER"] = "center";
    TAG_NAMES2["CODE"] = "code";
    TAG_NAMES2["COL"] = "col";
    TAG_NAMES2["COLGROUP"] = "colgroup";
    TAG_NAMES2["DD"] = "dd";
    TAG_NAMES2["DESC"] = "desc";
    TAG_NAMES2["DETAILS"] = "details";
    TAG_NAMES2["DIALOG"] = "dialog";
    TAG_NAMES2["DIR"] = "dir";
    TAG_NAMES2["DIV"] = "div";
    TAG_NAMES2["DL"] = "dl";
    TAG_NAMES2["DT"] = "dt";
    TAG_NAMES2["EM"] = "em";
    TAG_NAMES2["EMBED"] = "embed";
    TAG_NAMES2["FIELDSET"] = "fieldset";
    TAG_NAMES2["FIGCAPTION"] = "figcaption";
    TAG_NAMES2["FIGURE"] = "figure";
    TAG_NAMES2["FONT"] = "font";
    TAG_NAMES2["FOOTER"] = "footer";
    TAG_NAMES2["FOREIGN_OBJECT"] = "foreignObject";
    TAG_NAMES2["FORM"] = "form";
    TAG_NAMES2["FRAME"] = "frame";
    TAG_NAMES2["FRAMESET"] = "frameset";
    TAG_NAMES2["H1"] = "h1";
    TAG_NAMES2["H2"] = "h2";
    TAG_NAMES2["H3"] = "h3";
    TAG_NAMES2["H4"] = "h4";
    TAG_NAMES2["H5"] = "h5";
    TAG_NAMES2["H6"] = "h6";
    TAG_NAMES2["HEAD"] = "head";
    TAG_NAMES2["HEADER"] = "header";
    TAG_NAMES2["HGROUP"] = "hgroup";
    TAG_NAMES2["HR"] = "hr";
    TAG_NAMES2["HTML"] = "html";
    TAG_NAMES2["I"] = "i";
    TAG_NAMES2["IMG"] = "img";
    TAG_NAMES2["IMAGE"] = "image";
    TAG_NAMES2["INPUT"] = "input";
    TAG_NAMES2["IFRAME"] = "iframe";
    TAG_NAMES2["KEYGEN"] = "keygen";
    TAG_NAMES2["LABEL"] = "label";
    TAG_NAMES2["LI"] = "li";
    TAG_NAMES2["LINK"] = "link";
    TAG_NAMES2["LISTING"] = "listing";
    TAG_NAMES2["MAIN"] = "main";
    TAG_NAMES2["MALIGNMARK"] = "malignmark";
    TAG_NAMES2["MARQUEE"] = "marquee";
    TAG_NAMES2["MATH"] = "math";
    TAG_NAMES2["MENU"] = "menu";
    TAG_NAMES2["META"] = "meta";
    TAG_NAMES2["MGLYPH"] = "mglyph";
    TAG_NAMES2["MI"] = "mi";
    TAG_NAMES2["MO"] = "mo";
    TAG_NAMES2["MN"] = "mn";
    TAG_NAMES2["MS"] = "ms";
    TAG_NAMES2["MTEXT"] = "mtext";
    TAG_NAMES2["NAV"] = "nav";
    TAG_NAMES2["NOBR"] = "nobr";
    TAG_NAMES2["NOFRAMES"] = "noframes";
    TAG_NAMES2["NOEMBED"] = "noembed";
    TAG_NAMES2["NOSCRIPT"] = "noscript";
    TAG_NAMES2["OBJECT"] = "object";
    TAG_NAMES2["OL"] = "ol";
    TAG_NAMES2["OPTGROUP"] = "optgroup";
    TAG_NAMES2["OPTION"] = "option";
    TAG_NAMES2["P"] = "p";
    TAG_NAMES2["PARAM"] = "param";
    TAG_NAMES2["PLAINTEXT"] = "plaintext";
    TAG_NAMES2["PRE"] = "pre";
    TAG_NAMES2["RB"] = "rb";
    TAG_NAMES2["RP"] = "rp";
    TAG_NAMES2["RT"] = "rt";
    TAG_NAMES2["RTC"] = "rtc";
    TAG_NAMES2["RUBY"] = "ruby";
    TAG_NAMES2["S"] = "s";
    TAG_NAMES2["SCRIPT"] = "script";
    TAG_NAMES2["SEARCH"] = "search";
    TAG_NAMES2["SECTION"] = "section";
    TAG_NAMES2["SELECT"] = "select";
    TAG_NAMES2["SOURCE"] = "source";
    TAG_NAMES2["SMALL"] = "small";
    TAG_NAMES2["SPAN"] = "span";
    TAG_NAMES2["STRIKE"] = "strike";
    TAG_NAMES2["STRONG"] = "strong";
    TAG_NAMES2["STYLE"] = "style";
    TAG_NAMES2["SUB"] = "sub";
    TAG_NAMES2["SUMMARY"] = "summary";
    TAG_NAMES2["SUP"] = "sup";
    TAG_NAMES2["TABLE"] = "table";
    TAG_NAMES2["TBODY"] = "tbody";
    TAG_NAMES2["TEMPLATE"] = "template";
    TAG_NAMES2["TEXTAREA"] = "textarea";
    TAG_NAMES2["TFOOT"] = "tfoot";
    TAG_NAMES2["TD"] = "td";
    TAG_NAMES2["TH"] = "th";
    TAG_NAMES2["THEAD"] = "thead";
    TAG_NAMES2["TITLE"] = "title";
    TAG_NAMES2["TR"] = "tr";
    TAG_NAMES2["TRACK"] = "track";
    TAG_NAMES2["TT"] = "tt";
    TAG_NAMES2["U"] = "u";
    TAG_NAMES2["UL"] = "ul";
    TAG_NAMES2["SVG"] = "svg";
    TAG_NAMES2["VAR"] = "var";
    TAG_NAMES2["WBR"] = "wbr";
    TAG_NAMES2["XMP"] = "xmp";
  })(TAG_NAMES || (TAG_NAMES = {}));
  var TAG_ID;
  (function(TAG_ID2) {
    TAG_ID2[TAG_ID2["UNKNOWN"] = 0] = "UNKNOWN";
    TAG_ID2[TAG_ID2["A"] = 1] = "A";
    TAG_ID2[TAG_ID2["ADDRESS"] = 2] = "ADDRESS";
    TAG_ID2[TAG_ID2["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
    TAG_ID2[TAG_ID2["APPLET"] = 4] = "APPLET";
    TAG_ID2[TAG_ID2["AREA"] = 5] = "AREA";
    TAG_ID2[TAG_ID2["ARTICLE"] = 6] = "ARTICLE";
    TAG_ID2[TAG_ID2["ASIDE"] = 7] = "ASIDE";
    TAG_ID2[TAG_ID2["B"] = 8] = "B";
    TAG_ID2[TAG_ID2["BASE"] = 9] = "BASE";
    TAG_ID2[TAG_ID2["BASEFONT"] = 10] = "BASEFONT";
    TAG_ID2[TAG_ID2["BGSOUND"] = 11] = "BGSOUND";
    TAG_ID2[TAG_ID2["BIG"] = 12] = "BIG";
    TAG_ID2[TAG_ID2["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
    TAG_ID2[TAG_ID2["BODY"] = 14] = "BODY";
    TAG_ID2[TAG_ID2["BR"] = 15] = "BR";
    TAG_ID2[TAG_ID2["BUTTON"] = 16] = "BUTTON";
    TAG_ID2[TAG_ID2["CAPTION"] = 17] = "CAPTION";
    TAG_ID2[TAG_ID2["CENTER"] = 18] = "CENTER";
    TAG_ID2[TAG_ID2["CODE"] = 19] = "CODE";
    TAG_ID2[TAG_ID2["COL"] = 20] = "COL";
    TAG_ID2[TAG_ID2["COLGROUP"] = 21] = "COLGROUP";
    TAG_ID2[TAG_ID2["DD"] = 22] = "DD";
    TAG_ID2[TAG_ID2["DESC"] = 23] = "DESC";
    TAG_ID2[TAG_ID2["DETAILS"] = 24] = "DETAILS";
    TAG_ID2[TAG_ID2["DIALOG"] = 25] = "DIALOG";
    TAG_ID2[TAG_ID2["DIR"] = 26] = "DIR";
    TAG_ID2[TAG_ID2["DIV"] = 27] = "DIV";
    TAG_ID2[TAG_ID2["DL"] = 28] = "DL";
    TAG_ID2[TAG_ID2["DT"] = 29] = "DT";
    TAG_ID2[TAG_ID2["EM"] = 30] = "EM";
    TAG_ID2[TAG_ID2["EMBED"] = 31] = "EMBED";
    TAG_ID2[TAG_ID2["FIELDSET"] = 32] = "FIELDSET";
    TAG_ID2[TAG_ID2["FIGCAPTION"] = 33] = "FIGCAPTION";
    TAG_ID2[TAG_ID2["FIGURE"] = 34] = "FIGURE";
    TAG_ID2[TAG_ID2["FONT"] = 35] = "FONT";
    TAG_ID2[TAG_ID2["FOOTER"] = 36] = "FOOTER";
    TAG_ID2[TAG_ID2["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
    TAG_ID2[TAG_ID2["FORM"] = 38] = "FORM";
    TAG_ID2[TAG_ID2["FRAME"] = 39] = "FRAME";
    TAG_ID2[TAG_ID2["FRAMESET"] = 40] = "FRAMESET";
    TAG_ID2[TAG_ID2["H1"] = 41] = "H1";
    TAG_ID2[TAG_ID2["H2"] = 42] = "H2";
    TAG_ID2[TAG_ID2["H3"] = 43] = "H3";
    TAG_ID2[TAG_ID2["H4"] = 44] = "H4";
    TAG_ID2[TAG_ID2["H5"] = 45] = "H5";
    TAG_ID2[TAG_ID2["H6"] = 46] = "H6";
    TAG_ID2[TAG_ID2["HEAD"] = 47] = "HEAD";
    TAG_ID2[TAG_ID2["HEADER"] = 48] = "HEADER";
    TAG_ID2[TAG_ID2["HGROUP"] = 49] = "HGROUP";
    TAG_ID2[TAG_ID2["HR"] = 50] = "HR";
    TAG_ID2[TAG_ID2["HTML"] = 51] = "HTML";
    TAG_ID2[TAG_ID2["I"] = 52] = "I";
    TAG_ID2[TAG_ID2["IMG"] = 53] = "IMG";
    TAG_ID2[TAG_ID2["IMAGE"] = 54] = "IMAGE";
    TAG_ID2[TAG_ID2["INPUT"] = 55] = "INPUT";
    TAG_ID2[TAG_ID2["IFRAME"] = 56] = "IFRAME";
    TAG_ID2[TAG_ID2["KEYGEN"] = 57] = "KEYGEN";
    TAG_ID2[TAG_ID2["LABEL"] = 58] = "LABEL";
    TAG_ID2[TAG_ID2["LI"] = 59] = "LI";
    TAG_ID2[TAG_ID2["LINK"] = 60] = "LINK";
    TAG_ID2[TAG_ID2["LISTING"] = 61] = "LISTING";
    TAG_ID2[TAG_ID2["MAIN"] = 62] = "MAIN";
    TAG_ID2[TAG_ID2["MALIGNMARK"] = 63] = "MALIGNMARK";
    TAG_ID2[TAG_ID2["MARQUEE"] = 64] = "MARQUEE";
    TAG_ID2[TAG_ID2["MATH"] = 65] = "MATH";
    TAG_ID2[TAG_ID2["MENU"] = 66] = "MENU";
    TAG_ID2[TAG_ID2["META"] = 67] = "META";
    TAG_ID2[TAG_ID2["MGLYPH"] = 68] = "MGLYPH";
    TAG_ID2[TAG_ID2["MI"] = 69] = "MI";
    TAG_ID2[TAG_ID2["MO"] = 70] = "MO";
    TAG_ID2[TAG_ID2["MN"] = 71] = "MN";
    TAG_ID2[TAG_ID2["MS"] = 72] = "MS";
    TAG_ID2[TAG_ID2["MTEXT"] = 73] = "MTEXT";
    TAG_ID2[TAG_ID2["NAV"] = 74] = "NAV";
    TAG_ID2[TAG_ID2["NOBR"] = 75] = "NOBR";
    TAG_ID2[TAG_ID2["NOFRAMES"] = 76] = "NOFRAMES";
    TAG_ID2[TAG_ID2["NOEMBED"] = 77] = "NOEMBED";
    TAG_ID2[TAG_ID2["NOSCRIPT"] = 78] = "NOSCRIPT";
    TAG_ID2[TAG_ID2["OBJECT"] = 79] = "OBJECT";
    TAG_ID2[TAG_ID2["OL"] = 80] = "OL";
    TAG_ID2[TAG_ID2["OPTGROUP"] = 81] = "OPTGROUP";
    TAG_ID2[TAG_ID2["OPTION"] = 82] = "OPTION";
    TAG_ID2[TAG_ID2["P"] = 83] = "P";
    TAG_ID2[TAG_ID2["PARAM"] = 84] = "PARAM";
    TAG_ID2[TAG_ID2["PLAINTEXT"] = 85] = "PLAINTEXT";
    TAG_ID2[TAG_ID2["PRE"] = 86] = "PRE";
    TAG_ID2[TAG_ID2["RB"] = 87] = "RB";
    TAG_ID2[TAG_ID2["RP"] = 88] = "RP";
    TAG_ID2[TAG_ID2["RT"] = 89] = "RT";
    TAG_ID2[TAG_ID2["RTC"] = 90] = "RTC";
    TAG_ID2[TAG_ID2["RUBY"] = 91] = "RUBY";
    TAG_ID2[TAG_ID2["S"] = 92] = "S";
    TAG_ID2[TAG_ID2["SCRIPT"] = 93] = "SCRIPT";
    TAG_ID2[TAG_ID2["SEARCH"] = 94] = "SEARCH";
    TAG_ID2[TAG_ID2["SECTION"] = 95] = "SECTION";
    TAG_ID2[TAG_ID2["SELECT"] = 96] = "SELECT";
    TAG_ID2[TAG_ID2["SOURCE"] = 97] = "SOURCE";
    TAG_ID2[TAG_ID2["SMALL"] = 98] = "SMALL";
    TAG_ID2[TAG_ID2["SPAN"] = 99] = "SPAN";
    TAG_ID2[TAG_ID2["STRIKE"] = 100] = "STRIKE";
    TAG_ID2[TAG_ID2["STRONG"] = 101] = "STRONG";
    TAG_ID2[TAG_ID2["STYLE"] = 102] = "STYLE";
    TAG_ID2[TAG_ID2["SUB"] = 103] = "SUB";
    TAG_ID2[TAG_ID2["SUMMARY"] = 104] = "SUMMARY";
    TAG_ID2[TAG_ID2["SUP"] = 105] = "SUP";
    TAG_ID2[TAG_ID2["TABLE"] = 106] = "TABLE";
    TAG_ID2[TAG_ID2["TBODY"] = 107] = "TBODY";
    TAG_ID2[TAG_ID2["TEMPLATE"] = 108] = "TEMPLATE";
    TAG_ID2[TAG_ID2["TEXTAREA"] = 109] = "TEXTAREA";
    TAG_ID2[TAG_ID2["TFOOT"] = 110] = "TFOOT";
    TAG_ID2[TAG_ID2["TD"] = 111] = "TD";
    TAG_ID2[TAG_ID2["TH"] = 112] = "TH";
    TAG_ID2[TAG_ID2["THEAD"] = 113] = "THEAD";
    TAG_ID2[TAG_ID2["TITLE"] = 114] = "TITLE";
    TAG_ID2[TAG_ID2["TR"] = 115] = "TR";
    TAG_ID2[TAG_ID2["TRACK"] = 116] = "TRACK";
    TAG_ID2[TAG_ID2["TT"] = 117] = "TT";
    TAG_ID2[TAG_ID2["U"] = 118] = "U";
    TAG_ID2[TAG_ID2["UL"] = 119] = "UL";
    TAG_ID2[TAG_ID2["SVG"] = 120] = "SVG";
    TAG_ID2[TAG_ID2["VAR"] = 121] = "VAR";
    TAG_ID2[TAG_ID2["WBR"] = 122] = "WBR";
    TAG_ID2[TAG_ID2["XMP"] = 123] = "XMP";
  })(TAG_ID || (TAG_ID = {}));
  var TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
    [TAG_NAMES.A, TAG_ID.A],
    [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
    [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
    [TAG_NAMES.APPLET, TAG_ID.APPLET],
    [TAG_NAMES.AREA, TAG_ID.AREA],
    [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
    [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
    [TAG_NAMES.B, TAG_ID.B],
    [TAG_NAMES.BASE, TAG_ID.BASE],
    [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
    [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
    [TAG_NAMES.BIG, TAG_ID.BIG],
    [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
    [TAG_NAMES.BODY, TAG_ID.BODY],
    [TAG_NAMES.BR, TAG_ID.BR],
    [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
    [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
    [TAG_NAMES.CENTER, TAG_ID.CENTER],
    [TAG_NAMES.CODE, TAG_ID.CODE],
    [TAG_NAMES.COL, TAG_ID.COL],
    [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
    [TAG_NAMES.DD, TAG_ID.DD],
    [TAG_NAMES.DESC, TAG_ID.DESC],
    [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
    [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
    [TAG_NAMES.DIR, TAG_ID.DIR],
    [TAG_NAMES.DIV, TAG_ID.DIV],
    [TAG_NAMES.DL, TAG_ID.DL],
    [TAG_NAMES.DT, TAG_ID.DT],
    [TAG_NAMES.EM, TAG_ID.EM],
    [TAG_NAMES.EMBED, TAG_ID.EMBED],
    [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
    [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
    [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
    [TAG_NAMES.FONT, TAG_ID.FONT],
    [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
    [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
    [TAG_NAMES.FORM, TAG_ID.FORM],
    [TAG_NAMES.FRAME, TAG_ID.FRAME],
    [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
    [TAG_NAMES.H1, TAG_ID.H1],
    [TAG_NAMES.H2, TAG_ID.H2],
    [TAG_NAMES.H3, TAG_ID.H3],
    [TAG_NAMES.H4, TAG_ID.H4],
    [TAG_NAMES.H5, TAG_ID.H5],
    [TAG_NAMES.H6, TAG_ID.H6],
    [TAG_NAMES.HEAD, TAG_ID.HEAD],
    [TAG_NAMES.HEADER, TAG_ID.HEADER],
    [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
    [TAG_NAMES.HR, TAG_ID.HR],
    [TAG_NAMES.HTML, TAG_ID.HTML],
    [TAG_NAMES.I, TAG_ID.I],
    [TAG_NAMES.IMG, TAG_ID.IMG],
    [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
    [TAG_NAMES.INPUT, TAG_ID.INPUT],
    [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
    [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
    [TAG_NAMES.LABEL, TAG_ID.LABEL],
    [TAG_NAMES.LI, TAG_ID.LI],
    [TAG_NAMES.LINK, TAG_ID.LINK],
    [TAG_NAMES.LISTING, TAG_ID.LISTING],
    [TAG_NAMES.MAIN, TAG_ID.MAIN],
    [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
    [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
    [TAG_NAMES.MATH, TAG_ID.MATH],
    [TAG_NAMES.MENU, TAG_ID.MENU],
    [TAG_NAMES.META, TAG_ID.META],
    [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
    [TAG_NAMES.MI, TAG_ID.MI],
    [TAG_NAMES.MO, TAG_ID.MO],
    [TAG_NAMES.MN, TAG_ID.MN],
    [TAG_NAMES.MS, TAG_ID.MS],
    [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
    [TAG_NAMES.NAV, TAG_ID.NAV],
    [TAG_NAMES.NOBR, TAG_ID.NOBR],
    [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
    [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
    [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
    [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
    [TAG_NAMES.OL, TAG_ID.OL],
    [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
    [TAG_NAMES.OPTION, TAG_ID.OPTION],
    [TAG_NAMES.P, TAG_ID.P],
    [TAG_NAMES.PARAM, TAG_ID.PARAM],
    [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
    [TAG_NAMES.PRE, TAG_ID.PRE],
    [TAG_NAMES.RB, TAG_ID.RB],
    [TAG_NAMES.RP, TAG_ID.RP],
    [TAG_NAMES.RT, TAG_ID.RT],
    [TAG_NAMES.RTC, TAG_ID.RTC],
    [TAG_NAMES.RUBY, TAG_ID.RUBY],
    [TAG_NAMES.S, TAG_ID.S],
    [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
    [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
    [TAG_NAMES.SECTION, TAG_ID.SECTION],
    [TAG_NAMES.SELECT, TAG_ID.SELECT],
    [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
    [TAG_NAMES.SMALL, TAG_ID.SMALL],
    [TAG_NAMES.SPAN, TAG_ID.SPAN],
    [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
    [TAG_NAMES.STRONG, TAG_ID.STRONG],
    [TAG_NAMES.STYLE, TAG_ID.STYLE],
    [TAG_NAMES.SUB, TAG_ID.SUB],
    [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
    [TAG_NAMES.SUP, TAG_ID.SUP],
    [TAG_NAMES.TABLE, TAG_ID.TABLE],
    [TAG_NAMES.TBODY, TAG_ID.TBODY],
    [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
    [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
    [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
    [TAG_NAMES.TD, TAG_ID.TD],
    [TAG_NAMES.TH, TAG_ID.TH],
    [TAG_NAMES.THEAD, TAG_ID.THEAD],
    [TAG_NAMES.TITLE, TAG_ID.TITLE],
    [TAG_NAMES.TR, TAG_ID.TR],
    [TAG_NAMES.TRACK, TAG_ID.TRACK],
    [TAG_NAMES.TT, TAG_ID.TT],
    [TAG_NAMES.U, TAG_ID.U],
    [TAG_NAMES.UL, TAG_ID.UL],
    [TAG_NAMES.SVG, TAG_ID.SVG],
    [TAG_NAMES.VAR, TAG_ID.VAR],
    [TAG_NAMES.WBR, TAG_ID.WBR],
    [TAG_NAMES.XMP, TAG_ID.XMP]
  ]);
  function getTagID(tagName) {
    var _a2;
    return (_a2 = TAG_NAME_TO_ID.get(tagName)) !== null && _a2 !== void 0 ? _a2 : TAG_ID.UNKNOWN;
  }
  var $ = TAG_ID;
  var SPECIAL_ELEMENTS = {
    [NS.HTML]: /* @__PURE__ */ new Set([
      $.ADDRESS,
      $.APPLET,
      $.AREA,
      $.ARTICLE,
      $.ASIDE,
      $.BASE,
      $.BASEFONT,
      $.BGSOUND,
      $.BLOCKQUOTE,
      $.BODY,
      $.BR,
      $.BUTTON,
      $.CAPTION,
      $.CENTER,
      $.COL,
      $.COLGROUP,
      $.DD,
      $.DETAILS,
      $.DIR,
      $.DIV,
      $.DL,
      $.DT,
      $.EMBED,
      $.FIELDSET,
      $.FIGCAPTION,
      $.FIGURE,
      $.FOOTER,
      $.FORM,
      $.FRAME,
      $.FRAMESET,
      $.H1,
      $.H2,
      $.H3,
      $.H4,
      $.H5,
      $.H6,
      $.HEAD,
      $.HEADER,
      $.HGROUP,
      $.HR,
      $.HTML,
      $.IFRAME,
      $.IMG,
      $.INPUT,
      $.LI,
      $.LINK,
      $.LISTING,
      $.MAIN,
      $.MARQUEE,
      $.MENU,
      $.META,
      $.NAV,
      $.NOEMBED,
      $.NOFRAMES,
      $.NOSCRIPT,
      $.OBJECT,
      $.OL,
      $.P,
      $.PARAM,
      $.PLAINTEXT,
      $.PRE,
      $.SCRIPT,
      $.SECTION,
      $.SELECT,
      $.SOURCE,
      $.STYLE,
      $.SUMMARY,
      $.TABLE,
      $.TBODY,
      $.TD,
      $.TEMPLATE,
      $.TEXTAREA,
      $.TFOOT,
      $.TH,
      $.THEAD,
      $.TITLE,
      $.TR,
      $.TRACK,
      $.UL,
      $.WBR,
      $.XMP
    ]),
    [NS.MATHML]: /* @__PURE__ */ new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
    [NS.SVG]: /* @__PURE__ */ new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
    [NS.XLINK]: /* @__PURE__ */ new Set(),
    [NS.XML]: /* @__PURE__ */ new Set(),
    [NS.XMLNS]: /* @__PURE__ */ new Set()
  };
  var NUMBERED_HEADERS = /* @__PURE__ */ new Set([$.H1, $.H2, $.H3, $.H4, $.H5, $.H6]);
  var UNESCAPED_TEXT = /* @__PURE__ */ new Set([
    TAG_NAMES.STYLE,
    TAG_NAMES.SCRIPT,
    TAG_NAMES.XMP,
    TAG_NAMES.IFRAME,
    TAG_NAMES.NOEMBED,
    TAG_NAMES.NOFRAMES,
    TAG_NAMES.PLAINTEXT
  ]);
  function hasUnescapedText(tn2, scriptingEnabled) {
    return UNESCAPED_TEXT.has(tn2) || scriptingEnabled && tn2 === TAG_NAMES.NOSCRIPT;
  }

  // node_modules/parse5/dist/tokenizer/index.js
  var State;
  (function(State3) {
    State3[State3["DATA"] = 0] = "DATA";
    State3[State3["RCDATA"] = 1] = "RCDATA";
    State3[State3["RAWTEXT"] = 2] = "RAWTEXT";
    State3[State3["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
    State3[State3["PLAINTEXT"] = 4] = "PLAINTEXT";
    State3[State3["TAG_OPEN"] = 5] = "TAG_OPEN";
    State3[State3["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
    State3[State3["TAG_NAME"] = 7] = "TAG_NAME";
    State3[State3["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
    State3[State3["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
    State3[State3["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
    State3[State3["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
    State3[State3["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
    State3[State3["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
    State3[State3["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
    State3[State3["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
    State3[State3["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
    State3[State3["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
    State3[State3["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
    State3[State3["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
    State3[State3["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
    State3[State3["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
    State3[State3["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
    State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
    State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
    State3[State3["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
    State3[State3["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
    State3[State3["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
    State3[State3["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
    State3[State3["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
    State3[State3["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
    State3[State3["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
    State3[State3["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
    State3[State3["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
    State3[State3["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
    State3[State3["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
    State3[State3["COMMENT_START"] = 42] = "COMMENT_START";
    State3[State3["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
    State3[State3["COMMENT"] = 44] = "COMMENT";
    State3[State3["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
    State3[State3["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
    State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
    State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
    State3[State3["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
    State3[State3["COMMENT_END"] = 50] = "COMMENT_END";
    State3[State3["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
    State3[State3["DOCTYPE"] = 52] = "DOCTYPE";
    State3[State3["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
    State3[State3["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
    State3[State3["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
    State3[State3["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
    State3[State3["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
    State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
    State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
    State3[State3["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
    State3[State3["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
    State3[State3["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
    State3[State3["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
    State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
    State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
    State3[State3["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
    State3[State3["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
    State3[State3["CDATA_SECTION"] = 68] = "CDATA_SECTION";
    State3[State3["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
    State3[State3["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
    State3[State3["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
    State3[State3["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
  })(State || (State = {}));
  var TokenizerMode = {
    DATA: State.DATA,
    RCDATA: State.RCDATA,
    RAWTEXT: State.RAWTEXT,
    SCRIPT_DATA: State.SCRIPT_DATA,
    PLAINTEXT: State.PLAINTEXT,
    CDATA_SECTION: State.CDATA_SECTION
  };
  function isAsciiDigit(cp) {
    return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
  }
  function isAsciiUpper(cp) {
    return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
  }
  function isAsciiLower(cp) {
    return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
  }
  function isAsciiLetter(cp) {
    return isAsciiLower(cp) || isAsciiUpper(cp);
  }
  function isAsciiAlphaNumeric2(cp) {
    return isAsciiLetter(cp) || isAsciiDigit(cp);
  }
  function toAsciiLower(cp) {
    return cp + 32;
  }
  function isWhitespace(cp) {
    return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
  }
  function isScriptDataDoubleEscapeSequenceEnd(cp) {
    return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
  }
  function getErrorForNumericCharacterReference(code) {
    if (code === CODE_POINTS.NULL) {
      return ERR.nullCharacterReference;
    } else if (code > 1114111) {
      return ERR.characterReferenceOutsideUnicodeRange;
    } else if (isSurrogate(code)) {
      return ERR.surrogateCharacterReference;
    } else if (isUndefinedCodePoint(code)) {
      return ERR.noncharacterCharacterReference;
    } else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) {
      return ERR.controlCharacterReference;
    }
    return null;
  }
  var Tokenizer = class {
    constructor(options, handler) {
      this.options = options;
      this.handler = handler;
      this.paused = false;
      this.inLoop = false;
      this.inForeignNode = false;
      this.lastStartTagName = "";
      this.active = false;
      this.state = State.DATA;
      this.returnState = State.DATA;
      this.entityStartPos = 0;
      this.consumedAfterSnapshot = -1;
      this.currentCharacterToken = null;
      this.currentToken = null;
      this.currentAttr = { name: "", value: "" };
      this.preprocessor = new Preprocessor(handler);
      this.currentLocation = this.getCurrentLocation(-1);
      this.entityDecoder = new EntityDecoder(decode_data_html_default, (cp, consumed) => {
        this.preprocessor.pos = this.entityStartPos + consumed - 1;
        this._flushCodePointConsumedAsCharacterReference(cp);
      }, handler.onParseError ? {
        missingSemicolonAfterCharacterReference: () => {
          this._err(ERR.missingSemicolonAfterCharacterReference, 1);
        },
        absenceOfDigitsInNumericCharacterReference: (consumed) => {
          this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
        },
        validateNumericCharacterReference: (code) => {
          const error = getErrorForNumericCharacterReference(code);
          if (error)
            this._err(error, 1);
        }
      } : void 0);
    }
    //Errors
    _err(code, cpOffset = 0) {
      var _a2, _b;
      (_b = (_a2 = this.handler).onParseError) === null || _b === void 0 ? void 0 : _b.call(_a2, this.preprocessor.getError(code, cpOffset));
    }
    // NOTE: `offset` may never run across line boundaries.
    getCurrentLocation(offset) {
      if (!this.options.sourceCodeLocationInfo) {
        return null;
      }
      return {
        startLine: this.preprocessor.line,
        startCol: this.preprocessor.col - offset,
        startOffset: this.preprocessor.offset - offset,
        endLine: -1,
        endCol: -1,
        endOffset: -1
      };
    }
    _runParsingLoop() {
      if (this.inLoop)
        return;
      this.inLoop = true;
      while (this.active && !this.paused) {
        this.consumedAfterSnapshot = 0;
        const cp = this._consume();
        if (!this._ensureHibernation()) {
          this._callState(cp);
        }
      }
      this.inLoop = false;
    }
    //API
    pause() {
      this.paused = true;
    }
    resume(writeCallback) {
      if (!this.paused) {
        throw new Error("Parser was already resumed");
      }
      this.paused = false;
      if (this.inLoop)
        return;
      this._runParsingLoop();
      if (!this.paused) {
        writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
      }
    }
    write(chunk, isLastChunk, writeCallback) {
      this.active = true;
      this.preprocessor.write(chunk, isLastChunk);
      this._runParsingLoop();
      if (!this.paused) {
        writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
      }
    }
    insertHtmlAtCurrentPos(chunk) {
      this.active = true;
      this.preprocessor.insertHtmlAtCurrentPos(chunk);
      this._runParsingLoop();
    }
    //Hibernation
    _ensureHibernation() {
      if (this.preprocessor.endOfChunkHit) {
        this.preprocessor.retreat(this.consumedAfterSnapshot);
        this.consumedAfterSnapshot = 0;
        this.active = false;
        return true;
      }
      return false;
    }
    //Consumption
    _consume() {
      this.consumedAfterSnapshot++;
      return this.preprocessor.advance();
    }
    _advanceBy(count) {
      this.consumedAfterSnapshot += count;
      for (let i3 = 0; i3 < count; i3++) {
        this.preprocessor.advance();
      }
    }
    _consumeSequenceIfMatch(pattern, caseSensitive) {
      if (this.preprocessor.startsWith(pattern, caseSensitive)) {
        this._advanceBy(pattern.length - 1);
        return true;
      }
      return false;
    }
    //Token creation
    _createStartTagToken() {
      this.currentToken = {
        type: TokenType.START_TAG,
        tagName: "",
        tagID: TAG_ID.UNKNOWN,
        selfClosing: false,
        ackSelfClosing: false,
        attrs: [],
        location: this.getCurrentLocation(1)
      };
    }
    _createEndTagToken() {
      this.currentToken = {
        type: TokenType.END_TAG,
        tagName: "",
        tagID: TAG_ID.UNKNOWN,
        selfClosing: false,
        ackSelfClosing: false,
        attrs: [],
        location: this.getCurrentLocation(2)
      };
    }
    _createCommentToken(offset) {
      this.currentToken = {
        type: TokenType.COMMENT,
        data: "",
        location: this.getCurrentLocation(offset)
      };
    }
    _createDoctypeToken(initialName) {
      this.currentToken = {
        type: TokenType.DOCTYPE,
        name: initialName,
        forceQuirks: false,
        publicId: null,
        systemId: null,
        location: this.currentLocation
      };
    }
    _createCharacterToken(type, chars) {
      this.currentCharacterToken = {
        type,
        chars,
        location: this.currentLocation
      };
    }
    //Tag attributes
    _createAttr(attrNameFirstCh) {
      this.currentAttr = {
        name: attrNameFirstCh,
        value: ""
      };
      this.currentLocation = this.getCurrentLocation(0);
    }
    _leaveAttrName() {
      var _a2;
      var _b;
      const token = this.currentToken;
      if (getTokenAttr(token, this.currentAttr.name) === null) {
        token.attrs.push(this.currentAttr);
        if (token.location && this.currentLocation) {
          const attrLocations = (_a2 = (_b = token.location).attrs) !== null && _a2 !== void 0 ? _a2 : _b.attrs = /* @__PURE__ */ Object.create(null);
          attrLocations[this.currentAttr.name] = this.currentLocation;
          this._leaveAttrValue();
        }
      } else {
        this._err(ERR.duplicateAttribute);
      }
    }
    _leaveAttrValue() {
      if (this.currentLocation) {
        this.currentLocation.endLine = this.preprocessor.line;
        this.currentLocation.endCol = this.preprocessor.col;
        this.currentLocation.endOffset = this.preprocessor.offset;
      }
    }
    //Token emission
    prepareToken(ct) {
      this._emitCurrentCharacterToken(ct.location);
      this.currentToken = null;
      if (ct.location) {
        ct.location.endLine = this.preprocessor.line;
        ct.location.endCol = this.preprocessor.col + 1;
        ct.location.endOffset = this.preprocessor.offset + 1;
      }
      this.currentLocation = this.getCurrentLocation(-1);
    }
    emitCurrentTagToken() {
      const ct = this.currentToken;
      this.prepareToken(ct);
      ct.tagID = getTagID(ct.tagName);
      if (ct.type === TokenType.START_TAG) {
        this.lastStartTagName = ct.tagName;
        this.handler.onStartTag(ct);
      } else {
        if (ct.attrs.length > 0) {
          this._err(ERR.endTagWithAttributes);
        }
        if (ct.selfClosing) {
          this._err(ERR.endTagWithTrailingSolidus);
        }
        this.handler.onEndTag(ct);
      }
      this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(ct) {
      this.prepareToken(ct);
      this.handler.onComment(ct);
      this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(ct) {
      this.prepareToken(ct);
      this.handler.onDoctype(ct);
      this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(nextLocation) {
      if (this.currentCharacterToken) {
        if (nextLocation && this.currentCharacterToken.location) {
          this.currentCharacterToken.location.endLine = nextLocation.startLine;
          this.currentCharacterToken.location.endCol = nextLocation.startCol;
          this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
        }
        switch (this.currentCharacterToken.type) {
          case TokenType.CHARACTER: {
            this.handler.onCharacter(this.currentCharacterToken);
            break;
          }
          case TokenType.NULL_CHARACTER: {
            this.handler.onNullCharacter(this.currentCharacterToken);
            break;
          }
          case TokenType.WHITESPACE_CHARACTER: {
            this.handler.onWhitespaceCharacter(this.currentCharacterToken);
            break;
          }
        }
        this.currentCharacterToken = null;
      }
    }
    _emitEOFToken() {
      const location = this.getCurrentLocation(0);
      if (location) {
        location.endLine = location.startLine;
        location.endCol = location.startCol;
        location.endOffset = location.startOffset;
      }
      this._emitCurrentCharacterToken(location);
      this.handler.onEof({ type: TokenType.EOF, location });
      this.active = false;
    }
    //Characters emission
    //OPTIMIZATION: The specification uses only one type of character token (one token per character).
    //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
    //If we have a sequence of characters that belong to the same group, the parser can process it
    //as a single solid character token.
    //So, there are 3 types of character tokens in parse5:
    //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
    //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
    //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
    _appendCharToCurrentCharacterToken(type, ch) {
      if (this.currentCharacterToken) {
        if (this.currentCharacterToken.type === type) {
          this.currentCharacterToken.chars += ch;
          return;
        } else {
          this.currentLocation = this.getCurrentLocation(0);
          this._emitCurrentCharacterToken(this.currentLocation);
          this.preprocessor.dropParsedChunk();
        }
      }
      this._createCharacterToken(type, ch);
    }
    _emitCodePoint(cp) {
      const type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
      this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
    }
    //NOTE: used when we emit characters explicitly.
    //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
    _emitChars(ch) {
      this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
    }
    // Character reference helpers
    _startCharacterReference() {
      this.returnState = this.state;
      this.state = State.CHARACTER_REFERENCE;
      this.entityStartPos = this.preprocessor.pos;
      this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
    }
    _isCharacterReferenceInAttribute() {
      return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
    }
    _flushCodePointConsumedAsCharacterReference(cp) {
      if (this._isCharacterReferenceInAttribute()) {
        this.currentAttr.value += String.fromCodePoint(cp);
      } else {
        this._emitCodePoint(cp);
      }
    }
    // Calling states this way turns out to be much faster than any other approach.
    _callState(cp) {
      switch (this.state) {
        case State.DATA: {
          this._stateData(cp);
          break;
        }
        case State.RCDATA: {
          this._stateRcdata(cp);
          break;
        }
        case State.RAWTEXT: {
          this._stateRawtext(cp);
          break;
        }
        case State.SCRIPT_DATA: {
          this._stateScriptData(cp);
          break;
        }
        case State.PLAINTEXT: {
          this._statePlaintext(cp);
          break;
        }
        case State.TAG_OPEN: {
          this._stateTagOpen(cp);
          break;
        }
        case State.END_TAG_OPEN: {
          this._stateEndTagOpen(cp);
          break;
        }
        case State.TAG_NAME: {
          this._stateTagName(cp);
          break;
        }
        case State.RCDATA_LESS_THAN_SIGN: {
          this._stateRcdataLessThanSign(cp);
          break;
        }
        case State.RCDATA_END_TAG_OPEN: {
          this._stateRcdataEndTagOpen(cp);
          break;
        }
        case State.RCDATA_END_TAG_NAME: {
          this._stateRcdataEndTagName(cp);
          break;
        }
        case State.RAWTEXT_LESS_THAN_SIGN: {
          this._stateRawtextLessThanSign(cp);
          break;
        }
        case State.RAWTEXT_END_TAG_OPEN: {
          this._stateRawtextEndTagOpen(cp);
          break;
        }
        case State.RAWTEXT_END_TAG_NAME: {
          this._stateRawtextEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_LESS_THAN_SIGN: {
          this._stateScriptDataLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_END_TAG_OPEN: {
          this._stateScriptDataEndTagOpen(cp);
          break;
        }
        case State.SCRIPT_DATA_END_TAG_NAME: {
          this._stateScriptDataEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPE_START: {
          this._stateScriptDataEscapeStart(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPE_START_DASH: {
          this._stateScriptDataEscapeStartDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED: {
          this._stateScriptDataEscaped(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_DASH: {
          this._stateScriptDataEscapedDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
          this._stateScriptDataEscapedDashDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataEscapedLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
          this._stateScriptDataEscapedEndTagOpen(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
          this._stateScriptDataEscapedEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
          this._stateScriptDataDoubleEscapeStart(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
          this._stateScriptDataDoubleEscaped(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
          this._stateScriptDataDoubleEscapedDash(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
          this._stateScriptDataDoubleEscapedDashDash(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataDoubleEscapedLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
          this._stateScriptDataDoubleEscapeEnd(cp);
          break;
        }
        case State.BEFORE_ATTRIBUTE_NAME: {
          this._stateBeforeAttributeName(cp);
          break;
        }
        case State.ATTRIBUTE_NAME: {
          this._stateAttributeName(cp);
          break;
        }
        case State.AFTER_ATTRIBUTE_NAME: {
          this._stateAfterAttributeName(cp);
          break;
        }
        case State.BEFORE_ATTRIBUTE_VALUE: {
          this._stateBeforeAttributeValue(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
          this._stateAttributeValueDoubleQuoted(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
          this._stateAttributeValueSingleQuoted(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_UNQUOTED: {
          this._stateAttributeValueUnquoted(cp);
          break;
        }
        case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
          this._stateAfterAttributeValueQuoted(cp);
          break;
        }
        case State.SELF_CLOSING_START_TAG: {
          this._stateSelfClosingStartTag(cp);
          break;
        }
        case State.BOGUS_COMMENT: {
          this._stateBogusComment(cp);
          break;
        }
        case State.MARKUP_DECLARATION_OPEN: {
          this._stateMarkupDeclarationOpen(cp);
          break;
        }
        case State.COMMENT_START: {
          this._stateCommentStart(cp);
          break;
        }
        case State.COMMENT_START_DASH: {
          this._stateCommentStartDash(cp);
          break;
        }
        case State.COMMENT: {
          this._stateComment(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN: {
          this._stateCommentLessThanSign(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG: {
          this._stateCommentLessThanSignBang(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
          this._stateCommentLessThanSignBangDash(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
          this._stateCommentLessThanSignBangDashDash(cp);
          break;
        }
        case State.COMMENT_END_DASH: {
          this._stateCommentEndDash(cp);
          break;
        }
        case State.COMMENT_END: {
          this._stateCommentEnd(cp);
          break;
        }
        case State.COMMENT_END_BANG: {
          this._stateCommentEndBang(cp);
          break;
        }
        case State.DOCTYPE: {
          this._stateDoctype(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_NAME: {
          this._stateBeforeDoctypeName(cp);
          break;
        }
        case State.DOCTYPE_NAME: {
          this._stateDoctypeName(cp);
          break;
        }
        case State.AFTER_DOCTYPE_NAME: {
          this._stateAfterDoctypeName(cp);
          break;
        }
        case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
          this._stateAfterDoctypePublicKeyword(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateBeforeDoctypePublicIdentifier(cp);
          break;
        }
        case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypePublicIdentifierDoubleQuoted(cp);
          break;
        }
        case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypePublicIdentifierSingleQuoted(cp);
          break;
        }
        case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateAfterDoctypePublicIdentifier(cp);
          break;
        }
        case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
          this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
          break;
        }
        case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
          this._stateAfterDoctypeSystemKeyword(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateBeforeDoctypeSystemIdentifier(cp);
          break;
        }
        case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
          break;
        }
        case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypeSystemIdentifierSingleQuoted(cp);
          break;
        }
        case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateAfterDoctypeSystemIdentifier(cp);
          break;
        }
        case State.BOGUS_DOCTYPE: {
          this._stateBogusDoctype(cp);
          break;
        }
        case State.CDATA_SECTION: {
          this._stateCdataSection(cp);
          break;
        }
        case State.CDATA_SECTION_BRACKET: {
          this._stateCdataSectionBracket(cp);
          break;
        }
        case State.CDATA_SECTION_END: {
          this._stateCdataSectionEnd(cp);
          break;
        }
        case State.CHARACTER_REFERENCE: {
          this._stateCharacterReference();
          break;
        }
        case State.AMBIGUOUS_AMPERSAND: {
          this._stateAmbiguousAmpersand(cp);
          break;
        }
        default: {
          throw new Error("Unknown state");
        }
      }
    }
    // State machine
    // Data state
    //------------------------------------------------------------------
    _stateData(cp) {
      switch (cp) {
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.TAG_OPEN;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitCodePoint(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    //  RCDATA state
    //------------------------------------------------------------------
    _stateRcdata(cp) {
      switch (cp) {
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.RCDATA_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // RAWTEXT state
    //------------------------------------------------------------------
    _stateRawtext(cp) {
      switch (cp) {
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.RAWTEXT_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data state
    //------------------------------------------------------------------
    _stateScriptData(cp) {
      switch (cp) {
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // PLAINTEXT state
    //------------------------------------------------------------------
    _statePlaintext(cp) {
      switch (cp) {
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Tag open state
    //------------------------------------------------------------------
    _stateTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this._createStartTagToken();
        this.state = State.TAG_NAME;
        this._stateTagName(cp);
      } else
        switch (cp) {
          case CODE_POINTS.EXCLAMATION_MARK: {
            this.state = State.MARKUP_DECLARATION_OPEN;
            break;
          }
          case CODE_POINTS.SOLIDUS: {
            this.state = State.END_TAG_OPEN;
            break;
          }
          case CODE_POINTS.QUESTION_MARK: {
            this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
            this._createCommentToken(1);
            this.state = State.BOGUS_COMMENT;
            this._stateBogusComment(cp);
            break;
          }
          case CODE_POINTS.EOF: {
            this._err(ERR.eofBeforeTagName);
            this._emitChars("<");
            this._emitEOFToken();
            break;
          }
          default: {
            this._err(ERR.invalidFirstCharacterOfTagName);
            this._emitChars("<");
            this.state = State.DATA;
            this._stateData(cp);
          }
        }
    }
    // End tag open state
    //------------------------------------------------------------------
    _stateEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this.state = State.TAG_NAME;
        this._stateTagName(cp);
      } else
        switch (cp) {
          case CODE_POINTS.GREATER_THAN_SIGN: {
            this._err(ERR.missingEndTagName);
            this.state = State.DATA;
            break;
          }
          case CODE_POINTS.EOF: {
            this._err(ERR.eofBeforeTagName);
            this._emitChars("</");
            this._emitEOFToken();
            break;
          }
          default: {
            this._err(ERR.invalidFirstCharacterOfTagName);
            this._createCommentToken(2);
            this.state = State.BOGUS_COMMENT;
            this._stateBogusComment(cp);
          }
        }
    }
    // Tag name state
    //------------------------------------------------------------------
    _stateTagName(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.tagName += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // RCDATA less-than sign state
    //------------------------------------------------------------------
    _stateRcdataLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.RCDATA_END_TAG_OPEN;
      } else {
        this._emitChars("<");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    // RCDATA end tag open state
    //------------------------------------------------------------------
    _stateRcdataEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.RCDATA_END_TAG_NAME;
        this._stateRcdataEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    handleSpecialEndTag(_cp) {
      if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
        return !this._ensureHibernation();
      }
      this._createEndTagToken();
      const token = this.currentToken;
      token.tagName = this.lastStartTagName;
      const cp = this.preprocessor.peek(this.lastStartTagName.length);
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this._advanceBy(this.lastStartTagName.length);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          return false;
        }
        case CODE_POINTS.SOLIDUS: {
          this._advanceBy(this.lastStartTagName.length);
          this.state = State.SELF_CLOSING_START_TAG;
          return false;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._advanceBy(this.lastStartTagName.length);
          this.emitCurrentTagToken();
          this.state = State.DATA;
          return false;
        }
        default: {
          return !this._ensureHibernation();
        }
      }
    }
    // RCDATA end tag name state
    //------------------------------------------------------------------
    _stateRcdataEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    // RAWTEXT less-than sign state
    //------------------------------------------------------------------
    _stateRawtextLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.RAWTEXT_END_TAG_OPEN;
      } else {
        this._emitChars("<");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // RAWTEXT end tag open state
    //------------------------------------------------------------------
    _stateRawtextEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.RAWTEXT_END_TAG_NAME;
        this._stateRawtextEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // RAWTEXT end tag name state
    //------------------------------------------------------------------
    _stateRawtextEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // Script data less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataLessThanSign(cp) {
      switch (cp) {
        case CODE_POINTS.SOLIDUS: {
          this.state = State.SCRIPT_DATA_END_TAG_OPEN;
          break;
        }
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.SCRIPT_DATA_ESCAPE_START;
          this._emitChars("<!");
          break;
        }
        default: {
          this._emitChars("<");
          this.state = State.SCRIPT_DATA;
          this._stateScriptData(cp);
        }
      }
    }
    // Script data end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.SCRIPT_DATA_END_TAG_NAME;
        this._stateScriptDataEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escape start state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStart(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
        this._emitChars("-");
      } else {
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escape start dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStartDash(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
        this._emitChars("-");
      } else {
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escaped state
    //------------------------------------------------------------------
    _stateScriptDataEscaped(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_ESCAPED_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDashDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.SCRIPT_DATA;
          this._emitChars(">");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataEscapedLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
      } else if (isAsciiLetter(cp)) {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
        this._stateScriptDataDoubleEscapeStart(cp);
      } else {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data escaped end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
        this._stateScriptDataEscapedEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data escaped end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data double escape start state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeStart(cp) {
      if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
        this._emitCodePoint(cp);
        for (let i3 = 0; i3 < SEQUENCES.SCRIPT.length; i3++) {
          this._emitCodePoint(this._consume());
        }
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      } else if (!this._ensureHibernation()) {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data double escaped state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscaped(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDashDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.SCRIPT_DATA;
          this._emitChars(">");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
        this._emitChars("/");
      } else {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._stateScriptDataDoubleEscaped(cp);
      }
    }
    // Script data double escape end state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeEnd(cp) {
      if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
        this._emitCodePoint(cp);
        for (let i3 = 0; i3 < SEQUENCES.SCRIPT.length; i3++) {
          this._emitCodePoint(this._consume());
        }
        this.state = State.SCRIPT_DATA_ESCAPED;
      } else if (!this._ensureHibernation()) {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._stateScriptDataDoubleEscaped(cp);
      }
    }
    // Before attribute name state
    //------------------------------------------------------------------
    _stateBeforeAttributeName(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.SOLIDUS:
        case CODE_POINTS.GREATER_THAN_SIGN:
        case CODE_POINTS.EOF: {
          this.state = State.AFTER_ATTRIBUTE_NAME;
          this._stateAfterAttributeName(cp);
          break;
        }
        case CODE_POINTS.EQUALS_SIGN: {
          this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
          this._createAttr("=");
          this.state = State.ATTRIBUTE_NAME;
          break;
        }
        default: {
          this._createAttr("");
          this.state = State.ATTRIBUTE_NAME;
          this._stateAttributeName(cp);
        }
      }
    }
    // Attribute name state
    //------------------------------------------------------------------
    _stateAttributeName(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED:
        case CODE_POINTS.SOLIDUS:
        case CODE_POINTS.GREATER_THAN_SIGN:
        case CODE_POINTS.EOF: {
          this._leaveAttrName();
          this.state = State.AFTER_ATTRIBUTE_NAME;
          this._stateAfterAttributeName(cp);
          break;
        }
        case CODE_POINTS.EQUALS_SIGN: {
          this._leaveAttrName();
          this.state = State.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK:
        case CODE_POINTS.APOSTROPHE:
        case CODE_POINTS.LESS_THAN_SIGN: {
          this._err(ERR.unexpectedCharacterInAttributeName);
          this.currentAttr.name += String.fromCodePoint(cp);
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.name += REPLACEMENT_CHARACTER;
          break;
        }
        default: {
          this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // After attribute name state
    //------------------------------------------------------------------
    _stateAfterAttributeName(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case CODE_POINTS.EQUALS_SIGN: {
          this.state = State.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._createAttr("");
          this.state = State.ATTRIBUTE_NAME;
          this._stateAttributeName(cp);
        }
      }
    }
    // Before attribute value state
    //------------------------------------------------------------------
    _stateBeforeAttributeValue(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingAttributeValue);
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        default: {
          this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
          this._stateAttributeValueUnquoted(cp);
        }
      }
    }
    // Attribute value (double-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueDoubleQuoted(cp) {
      switch (cp) {
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // Attribute value (single-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueSingleQuoted(cp) {
      switch (cp) {
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // Attribute value (unquoted) state
    //------------------------------------------------------------------
    _stateAttributeValueUnquoted(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this._leaveAttrValue();
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._leaveAttrValue();
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK:
        case CODE_POINTS.APOSTROPHE:
        case CODE_POINTS.LESS_THAN_SIGN:
        case CODE_POINTS.EQUALS_SIGN:
        case CODE_POINTS.GRAVE_ACCENT: {
          this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
          this.currentAttr.value += String.fromCodePoint(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // After attribute value (quoted) state
    //------------------------------------------------------------------
    _stateAfterAttributeValueQuoted(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this._leaveAttrValue();
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this._leaveAttrValue();
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._leaveAttrValue();
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingWhitespaceBetweenAttributes);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          this._stateBeforeAttributeName(cp);
        }
      }
    }
    // Self-closing start tag state
    //------------------------------------------------------------------
    _stateSelfClosingStartTag(cp) {
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          const token = this.currentToken;
          token.selfClosing = true;
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.unexpectedSolidusInTag);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          this._stateBeforeAttributeName(cp);
        }
      }
    }
    // Bogus comment state
    //------------------------------------------------------------------
    _stateBogusComment(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.data += REPLACEMENT_CHARACTER;
          break;
        }
        default: {
          token.data += String.fromCodePoint(cp);
        }
      }
    }
    // Markup declaration open state
    //------------------------------------------------------------------
    _stateMarkupDeclarationOpen(cp) {
      if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
        this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
        this.state = State.COMMENT_START;
      } else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
        this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
        this.state = State.DOCTYPE;
      } else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
        if (this.inForeignNode) {
          this.state = State.CDATA_SECTION;
        } else {
          this._err(ERR.cdataInHtmlContent);
          this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
          this.currentToken.data = "[CDATA[";
          this.state = State.BOGUS_COMMENT;
        }
      } else if (!this._ensureHibernation()) {
        this._err(ERR.incorrectlyOpenedComment);
        this._createCommentToken(2);
        this.state = State.BOGUS_COMMENT;
        this._stateBogusComment(cp);
      }
    }
    // Comment start state
    //------------------------------------------------------------------
    _stateCommentStart(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_START_DASH;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptClosingOfEmptyComment);
          this.state = State.DATA;
          const token = this.currentToken;
          this.emitCurrentComment(token);
          break;
        }
        default: {
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment start dash state
    //------------------------------------------------------------------
    _stateCommentStartDash(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptClosingOfEmptyComment);
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "-";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment state
    //------------------------------------------------------------------
    _stateComment(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END_DASH;
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          token.data += "<";
          this.state = State.COMMENT_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.data += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += String.fromCodePoint(cp);
        }
      }
    }
    // Comment less-than sign state
    //------------------------------------------------------------------
    _stateCommentLessThanSign(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.EXCLAMATION_MARK: {
          token.data += "!";
          this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          token.data += "<";
          break;
        }
        default: {
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment less-than sign bang state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBang(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
      } else {
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
    // Comment less-than sign bang dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDash(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
      } else {
        this.state = State.COMMENT_END_DASH;
        this._stateCommentEndDash(cp);
      }
    }
    // Comment less-than sign bang dash dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDashDash(cp) {
      if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) {
        this._err(ERR.nestedComment);
      }
      this.state = State.COMMENT_END;
      this._stateCommentEnd(cp);
    }
    // Comment end dash state
    //------------------------------------------------------------------
    _stateCommentEndDash(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "-";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment end state
    //------------------------------------------------------------------
    _stateCommentEnd(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.COMMENT_END_BANG;
          break;
        }
        case CODE_POINTS.HYPHEN_MINUS: {
          token.data += "-";
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "--";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment end bang state
    //------------------------------------------------------------------
    _stateCommentEndBang(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          token.data += "--!";
          this.state = State.COMMENT_END_DASH;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.incorrectlyClosedComment);
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "--!";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // DOCTYPE state
    //------------------------------------------------------------------
    _stateDoctype(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.BEFORE_DOCTYPE_NAME;
          this._stateBeforeDoctypeName(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingWhitespaceBeforeDoctypeName);
          this.state = State.BEFORE_DOCTYPE_NAME;
          this._stateBeforeDoctypeName(cp);
        }
      }
    }
    // Before DOCTYPE name state
    //------------------------------------------------------------------
    _stateBeforeDoctypeName(cp) {
      if (isAsciiUpper(cp)) {
        this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
        this.state = State.DOCTYPE_NAME;
      } else
        switch (cp) {
          case CODE_POINTS.SPACE:
          case CODE_POINTS.LINE_FEED:
          case CODE_POINTS.TABULATION:
          case CODE_POINTS.FORM_FEED: {
            break;
          }
          case CODE_POINTS.NULL: {
            this._err(ERR.unexpectedNullCharacter);
            this._createDoctypeToken(REPLACEMENT_CHARACTER);
            this.state = State.DOCTYPE_NAME;
            break;
          }
          case CODE_POINTS.GREATER_THAN_SIGN: {
            this._err(ERR.missingDoctypeName);
            this._createDoctypeToken(null);
            const token = this.currentToken;
            token.forceQuirks = true;
            this.emitCurrentDoctype(token);
            this.state = State.DATA;
            break;
          }
          case CODE_POINTS.EOF: {
            this._err(ERR.eofInDoctype);
            this._createDoctypeToken(null);
            const token = this.currentToken;
            token.forceQuirks = true;
            this.emitCurrentDoctype(token);
            this._emitEOFToken();
            break;
          }
          default: {
            this._createDoctypeToken(String.fromCodePoint(cp));
            this.state = State.DOCTYPE_NAME;
          }
        }
    }
    // DOCTYPE name state
    //------------------------------------------------------------------
    _stateDoctypeName(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.AFTER_DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.name += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // After DOCTYPE name state
    //------------------------------------------------------------------
    _stateAfterDoctypeName(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
            this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
          } else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
            this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
          } else if (!this._ensureHibernation()) {
            this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
            token.forceQuirks = true;
            this.state = State.BOGUS_DOCTYPE;
            this._stateBogusDoctype(cp);
          }
        }
      }
    }
    // After DOCTYPE public keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicKeyword(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Before DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypePublicIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // DOCTYPE public identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierDoubleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.publicId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.publicId += String.fromCodePoint(cp);
        }
      }
    }
    // DOCTYPE public identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierSingleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.publicId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.publicId += String.fromCodePoint(cp);
        }
      }
    }
    // After DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Between DOCTYPE public and system identifiers state
    //------------------------------------------------------------------
    _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // After DOCTYPE system keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemKeyword(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Before DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypeSystemIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // DOCTYPE system identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.systemId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.systemId += String.fromCodePoint(cp);
        }
      }
    }
    // DOCTYPE system identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierSingleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.systemId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.systemId += String.fromCodePoint(cp);
        }
      }
    }
    // After DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Bogus DOCTYPE state
    //------------------------------------------------------------------
    _stateBogusDoctype(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          break;
        }
        case CODE_POINTS.EOF: {
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default:
      }
    }
    // CDATA section state
    //------------------------------------------------------------------
    _stateCdataSection(cp) {
      switch (cp) {
        case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
          this.state = State.CDATA_SECTION_BRACKET;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInCdata);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // CDATA section bracket state
    //------------------------------------------------------------------
    _stateCdataSectionBracket(cp) {
      if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
        this.state = State.CDATA_SECTION_END;
      } else {
        this._emitChars("]");
        this.state = State.CDATA_SECTION;
        this._stateCdataSection(cp);
      }
    }
    // CDATA section end state
    //------------------------------------------------------------------
    _stateCdataSectionEnd(cp) {
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
          this._emitChars("]");
          break;
        }
        default: {
          this._emitChars("]]");
          this.state = State.CDATA_SECTION;
          this._stateCdataSection(cp);
        }
      }
    }
    // Character reference state
    //------------------------------------------------------------------
    _stateCharacterReference() {
      let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
      if (length < 0) {
        if (this.preprocessor.lastChunkWritten) {
          length = this.entityDecoder.end();
        } else {
          this.active = false;
          this.preprocessor.pos = this.preprocessor.html.length - 1;
          this.consumedAfterSnapshot = 0;
          this.preprocessor.endOfChunkHit = true;
          return;
        }
      }
      if (length === 0) {
        this.preprocessor.pos = this.entityStartPos;
        this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
        this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric2(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
      } else {
        this.state = this.returnState;
      }
    }
    // Ambiguos ampersand state
    //------------------------------------------------------------------
    _stateAmbiguousAmpersand(cp) {
      if (isAsciiAlphaNumeric2(cp)) {
        this._flushCodePointConsumedAsCharacterReference(cp);
      } else {
        if (cp === CODE_POINTS.SEMICOLON) {
          this._err(ERR.unknownNamedCharacterReference);
        }
        this.state = this.returnState;
        this._callState(cp);
      }
    }
  };

  // node_modules/parse5/dist/parser/open-element-stack.js
  var IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
  var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
    ...IMPLICIT_END_TAG_REQUIRED,
    TAG_ID.CAPTION,
    TAG_ID.COLGROUP,
    TAG_ID.TBODY,
    TAG_ID.TD,
    TAG_ID.TFOOT,
    TAG_ID.TH,
    TAG_ID.THEAD,
    TAG_ID.TR
  ]);
  var SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
    TAG_ID.APPLET,
    TAG_ID.CAPTION,
    TAG_ID.HTML,
    TAG_ID.MARQUEE,
    TAG_ID.OBJECT,
    TAG_ID.TABLE,
    TAG_ID.TD,
    TAG_ID.TEMPLATE,
    TAG_ID.TH
  ]);
  var SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.OL, TAG_ID.UL]);
  var SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
  var SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([TAG_ID.ANNOTATION_XML, TAG_ID.MI, TAG_ID.MN, TAG_ID.MO, TAG_ID.MS, TAG_ID.MTEXT]);
  var SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([TAG_ID.DESC, TAG_ID.FOREIGN_OBJECT, TAG_ID.TITLE]);
  var TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  var TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  var TABLE_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  var TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
  var OpenElementStack = class {
    get currentTmplContentOrNode() {
      return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
    }
    constructor(document, treeAdapter, handler) {
      this.treeAdapter = treeAdapter;
      this.handler = handler;
      this.items = [];
      this.tagIDs = [];
      this.stackTop = -1;
      this.tmplCount = 0;
      this.currentTagId = TAG_ID.UNKNOWN;
      this.current = document;
    }
    //Index of element
    _indexOf(element) {
      return this.items.lastIndexOf(element, this.stackTop);
    }
    //Update current element
    _isInTemplate() {
      return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
    }
    _updateCurrentElement() {
      this.current = this.items[this.stackTop];
      this.currentTagId = this.tagIDs[this.stackTop];
    }
    //Mutations
    push(element, tagID) {
      this.stackTop++;
      this.items[this.stackTop] = element;
      this.current = element;
      this.tagIDs[this.stackTop] = tagID;
      this.currentTagId = tagID;
      if (this._isInTemplate()) {
        this.tmplCount++;
      }
      this.handler.onItemPush(element, tagID, true);
    }
    pop() {
      const popped = this.current;
      if (this.tmplCount > 0 && this._isInTemplate()) {
        this.tmplCount--;
      }
      this.stackTop--;
      this._updateCurrentElement();
      this.handler.onItemPop(popped, true);
    }
    replace(oldElement, newElement) {
      const idx = this._indexOf(oldElement);
      this.items[idx] = newElement;
      if (idx === this.stackTop) {
        this.current = newElement;
      }
    }
    insertAfter(referenceElement, newElement, newElementID) {
      const insertionIdx = this._indexOf(referenceElement) + 1;
      this.items.splice(insertionIdx, 0, newElement);
      this.tagIDs.splice(insertionIdx, 0, newElementID);
      this.stackTop++;
      if (insertionIdx === this.stackTop) {
        this._updateCurrentElement();
      }
      this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
    }
    popUntilTagNamePopped(tagName) {
      let targetIdx = this.stackTop + 1;
      do {
        targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
      } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
      this.shortenToLength(targetIdx < 0 ? 0 : targetIdx);
    }
    shortenToLength(idx) {
      while (this.stackTop >= idx) {
        const popped = this.current;
        if (this.tmplCount > 0 && this._isInTemplate()) {
          this.tmplCount -= 1;
        }
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(popped, this.stackTop < idx);
      }
    }
    popUntilElementPopped(element) {
      const idx = this._indexOf(element);
      this.shortenToLength(idx < 0 ? 0 : idx);
    }
    popUntilPopped(tagNames, targetNS) {
      const idx = this._indexOfTagNames(tagNames, targetNS);
      this.shortenToLength(idx < 0 ? 0 : idx);
    }
    popUntilNumberedHeaderPopped() {
      this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
    }
    popUntilTableCellPopped() {
      this.popUntilPopped(TABLE_CELLS, NS.HTML);
    }
    popAllUpToHtmlElement() {
      this.tmplCount = 0;
      this.shortenToLength(1);
    }
    _indexOfTagNames(tagNames, namespace) {
      for (let i3 = this.stackTop; i3 >= 0; i3--) {
        if (tagNames.has(this.tagIDs[i3]) && this.treeAdapter.getNamespaceURI(this.items[i3]) === namespace) {
          return i3;
        }
      }
      return -1;
    }
    clearBackTo(tagNames, targetNS) {
      const idx = this._indexOfTagNames(tagNames, targetNS);
      this.shortenToLength(idx + 1);
    }
    clearBackToTableContext() {
      this.clearBackTo(TABLE_CONTEXT, NS.HTML);
    }
    clearBackToTableBodyContext() {
      this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
    }
    clearBackToTableRowContext() {
      this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
    }
    remove(element) {
      const idx = this._indexOf(element);
      if (idx >= 0) {
        if (idx === this.stackTop) {
          this.pop();
        } else {
          this.items.splice(idx, 1);
          this.tagIDs.splice(idx, 1);
          this.stackTop--;
          this._updateCurrentElement();
          this.handler.onItemPop(element, false);
        }
      }
    }
    //Search
    tryPeekProperlyNestedBodyElement() {
      return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
    }
    contains(element) {
      return this._indexOf(element) > -1;
    }
    getCommonAncestor(element) {
      const elementIdx = this._indexOf(element) - 1;
      return elementIdx >= 0 ? this.items[elementIdx] : null;
    }
    isRootHtmlElementCurrent() {
      return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
    }
    //Element in scope
    hasInDynamicScope(tagName, htmlScope) {
      for (let i3 = this.stackTop; i3 >= 0; i3--) {
        const tn2 = this.tagIDs[i3];
        switch (this.treeAdapter.getNamespaceURI(this.items[i3])) {
          case NS.HTML: {
            if (tn2 === tagName)
              return true;
            if (htmlScope.has(tn2))
              return false;
            break;
          }
          case NS.SVG: {
            if (SCOPING_ELEMENTS_SVG.has(tn2))
              return false;
            break;
          }
          case NS.MATHML: {
            if (SCOPING_ELEMENTS_MATHML.has(tn2))
              return false;
            break;
          }
        }
      }
      return true;
    }
    hasInScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
    }
    hasInListItemScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
    }
    hasInButtonScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
    }
    hasNumberedHeaderInScope() {
      for (let i3 = this.stackTop; i3 >= 0; i3--) {
        const tn2 = this.tagIDs[i3];
        switch (this.treeAdapter.getNamespaceURI(this.items[i3])) {
          case NS.HTML: {
            if (NUMBERED_HEADERS.has(tn2))
              return true;
            if (SCOPING_ELEMENTS_HTML.has(tn2))
              return false;
            break;
          }
          case NS.SVG: {
            if (SCOPING_ELEMENTS_SVG.has(tn2))
              return false;
            break;
          }
          case NS.MATHML: {
            if (SCOPING_ELEMENTS_MATHML.has(tn2))
              return false;
            break;
          }
        }
      }
      return true;
    }
    hasInTableScope(tagName) {
      for (let i3 = this.stackTop; i3 >= 0; i3--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i3]) !== NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i3]) {
          case tagName: {
            return true;
          }
          case TAG_ID.TABLE:
          case TAG_ID.HTML: {
            return false;
          }
        }
      }
      return true;
    }
    hasTableBodyContextInTableScope() {
      for (let i3 = this.stackTop; i3 >= 0; i3--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i3]) !== NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i3]) {
          case TAG_ID.TBODY:
          case TAG_ID.THEAD:
          case TAG_ID.TFOOT: {
            return true;
          }
          case TAG_ID.TABLE:
          case TAG_ID.HTML: {
            return false;
          }
        }
      }
      return true;
    }
    hasInSelectScope(tagName) {
      for (let i3 = this.stackTop; i3 >= 0; i3--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i3]) !== NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i3]) {
          case tagName: {
            return true;
          }
          case TAG_ID.OPTION:
          case TAG_ID.OPTGROUP: {
            break;
          }
          default: {
            return false;
          }
        }
      }
      return true;
    }
    //Implied end tags
    generateImpliedEndTags() {
      while (IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
        this.pop();
      }
    }
    generateImpliedEndTagsThoroughly() {
      while (IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
        this.pop();
      }
    }
    generateImpliedEndTagsWithExclusion(exclusionId) {
      while (this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
        this.pop();
      }
    }
  };

  // node_modules/parse5/dist/parser/formatting-element-list.js
  var NOAH_ARK_CAPACITY = 3;
  var EntryType;
  (function(EntryType2) {
    EntryType2[EntryType2["Marker"] = 0] = "Marker";
    EntryType2[EntryType2["Element"] = 1] = "Element";
  })(EntryType || (EntryType = {}));
  var MARKER = { type: EntryType.Marker };
  var FormattingElementList = class {
    constructor(treeAdapter) {
      this.treeAdapter = treeAdapter;
      this.entries = [];
      this.bookmark = null;
    }
    //Noah Ark's condition
    //OPTIMIZATION: at first we try to find possible candidates for exclusion using
    //lightweight heuristics without thorough attributes check.
    _getNoahArkConditionCandidates(newElement, neAttrs) {
      const candidates = [];
      const neAttrsLength = neAttrs.length;
      const neTagName = this.treeAdapter.getTagName(newElement);
      const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
      for (let i3 = 0; i3 < this.entries.length; i3++) {
        const entry = this.entries[i3];
        if (entry.type === EntryType.Marker) {
          break;
        }
        const { element } = entry;
        if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
          const elementAttrs = this.treeAdapter.getAttrList(element);
          if (elementAttrs.length === neAttrsLength) {
            candidates.push({ idx: i3, attrs: elementAttrs });
          }
        }
      }
      return candidates;
    }
    _ensureNoahArkCondition(newElement) {
      if (this.entries.length < NOAH_ARK_CAPACITY)
        return;
      const neAttrs = this.treeAdapter.getAttrList(newElement);
      const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
      if (candidates.length < NOAH_ARK_CAPACITY)
        return;
      const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
      let validCandidates = 0;
      for (let i3 = 0; i3 < candidates.length; i3++) {
        const candidate = candidates[i3];
        if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
          validCandidates += 1;
          if (validCandidates >= NOAH_ARK_CAPACITY) {
            this.entries.splice(candidate.idx, 1);
          }
        }
      }
    }
    //Mutations
    insertMarker() {
      this.entries.unshift(MARKER);
    }
    pushElement(element, token) {
      this._ensureNoahArkCondition(element);
      this.entries.unshift({
        type: EntryType.Element,
        element,
        token
      });
    }
    insertElementAfterBookmark(element, token) {
      const bookmarkIdx = this.entries.indexOf(this.bookmark);
      this.entries.splice(bookmarkIdx, 0, {
        type: EntryType.Element,
        element,
        token
      });
    }
    removeEntry(entry) {
      const entryIndex = this.entries.indexOf(entry);
      if (entryIndex >= 0) {
        this.entries.splice(entryIndex, 1);
      }
    }
    /**
     * Clears the list of formatting elements up to the last marker.
     *
     * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
     */
    clearToLastMarker() {
      const markerIdx = this.entries.indexOf(MARKER);
      if (markerIdx >= 0) {
        this.entries.splice(0, markerIdx + 1);
      } else {
        this.entries.length = 0;
      }
    }
    //Search
    getElementEntryInScopeWithTagName(tagName) {
      const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
      return entry && entry.type === EntryType.Element ? entry : null;
    }
    getElementEntry(element) {
      return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
    }
  };

  // node_modules/parse5/dist/tree-adapters/default.js
  var defaultTreeAdapter = {
    //Node construction
    createDocument() {
      return {
        nodeName: "#document",
        mode: DOCUMENT_MODE.NO_QUIRKS,
        childNodes: []
      };
    },
    createDocumentFragment() {
      return {
        nodeName: "#document-fragment",
        childNodes: []
      };
    },
    createElement(tagName, namespaceURI, attrs) {
      return {
        nodeName: tagName,
        tagName,
        attrs,
        namespaceURI,
        childNodes: [],
        parentNode: null
      };
    },
    createCommentNode(data) {
      return {
        nodeName: "#comment",
        data,
        parentNode: null
      };
    },
    createTextNode(value) {
      return {
        nodeName: "#text",
        value,
        parentNode: null
      };
    },
    //Tree mutation
    appendChild(parentNode, newNode) {
      parentNode.childNodes.push(newNode);
      newNode.parentNode = parentNode;
    },
    insertBefore(parentNode, newNode, referenceNode) {
      const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
      parentNode.childNodes.splice(insertionIdx, 0, newNode);
      newNode.parentNode = parentNode;
    },
    setTemplateContent(templateElement, contentElement) {
      templateElement.content = contentElement;
    },
    getTemplateContent(templateElement) {
      return templateElement.content;
    },
    setDocumentType(document, name, publicId, systemId) {
      const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
      if (doctypeNode) {
        doctypeNode.name = name;
        doctypeNode.publicId = publicId;
        doctypeNode.systemId = systemId;
      } else {
        const node = {
          nodeName: "#documentType",
          name,
          publicId,
          systemId,
          parentNode: null
        };
        defaultTreeAdapter.appendChild(document, node);
      }
    },
    setDocumentMode(document, mode) {
      document.mode = mode;
    },
    getDocumentMode(document) {
      return document.mode;
    },
    detachNode(node) {
      if (node.parentNode) {
        const idx = node.parentNode.childNodes.indexOf(node);
        node.parentNode.childNodes.splice(idx, 1);
        node.parentNode = null;
      }
    },
    insertText(parentNode, text2) {
      if (parentNode.childNodes.length > 0) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
        if (defaultTreeAdapter.isTextNode(prevNode)) {
          prevNode.value += text2;
          return;
        }
      }
      defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text2));
    },
    insertTextBefore(parentNode, text2, referenceNode) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
      if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
        prevNode.value += text2;
      } else {
        defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text2), referenceNode);
      }
    },
    adoptAttributes(recipient, attrs) {
      const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
      for (let j2 = 0; j2 < attrs.length; j2++) {
        if (!recipientAttrsMap.has(attrs[j2].name)) {
          recipient.attrs.push(attrs[j2]);
        }
      }
    },
    //Tree traversing
    getFirstChild(node) {
      return node.childNodes[0];
    },
    getChildNodes(node) {
      return node.childNodes;
    },
    getParentNode(node) {
      return node.parentNode;
    },
    getAttrList(element) {
      return element.attrs;
    },
    //Node data
    getTagName(element) {
      return element.tagName;
    },
    getNamespaceURI(element) {
      return element.namespaceURI;
    },
    getTextNodeContent(textNode) {
      return textNode.value;
    },
    getCommentNodeContent(commentNode) {
      return commentNode.data;
    },
    getDocumentTypeNodeName(doctypeNode) {
      return doctypeNode.name;
    },
    getDocumentTypeNodePublicId(doctypeNode) {
      return doctypeNode.publicId;
    },
    getDocumentTypeNodeSystemId(doctypeNode) {
      return doctypeNode.systemId;
    },
    //Node types
    isTextNode(node) {
      return node.nodeName === "#text";
    },
    isCommentNode(node) {
      return node.nodeName === "#comment";
    },
    isDocumentTypeNode(node) {
      return node.nodeName === "#documentType";
    },
    isElementNode(node) {
      return Object.prototype.hasOwnProperty.call(node, "tagName");
    },
    // Source code location
    setNodeSourceCodeLocation(node, location) {
      node.sourceCodeLocation = location;
    },
    getNodeSourceCodeLocation(node) {
      return node.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(node, endLocation) {
      node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
    }
  };

  // node_modules/parse5/dist/common/doctype.js
  var VALID_DOCTYPE_NAME = "html";
  var VALID_SYSTEM_ID = "about:legacy-compat";
  var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
  var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
    "+//silmaril//dtd html pro v0r11 19970101//",
    "-//as//dtd html 3.0 aswedit + extensions//",
    "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
    "-//ietf//dtd html 2.0 level 1//",
    "-//ietf//dtd html 2.0 level 2//",
    "-//ietf//dtd html 2.0 strict level 1//",
    "-//ietf//dtd html 2.0 strict level 2//",
    "-//ietf//dtd html 2.0 strict//",
    "-//ietf//dtd html 2.0//",
    "-//ietf//dtd html 2.1e//",
    "-//ietf//dtd html 3.0//",
    "-//ietf//dtd html 3.2 final//",
    "-//ietf//dtd html 3.2//",
    "-//ietf//dtd html 3//",
    "-//ietf//dtd html level 0//",
    "-//ietf//dtd html level 1//",
    "-//ietf//dtd html level 2//",
    "-//ietf//dtd html level 3//",
    "-//ietf//dtd html strict level 0//",
    "-//ietf//dtd html strict level 1//",
    "-//ietf//dtd html strict level 2//",
    "-//ietf//dtd html strict level 3//",
    "-//ietf//dtd html strict//",
    "-//ietf//dtd html//",
    "-//metrius//dtd metrius presentational//",
    "-//microsoft//dtd internet explorer 2.0 html strict//",
    "-//microsoft//dtd internet explorer 2.0 html//",
    "-//microsoft//dtd internet explorer 2.0 tables//",
    "-//microsoft//dtd internet explorer 3.0 html strict//",
    "-//microsoft//dtd internet explorer 3.0 html//",
    "-//microsoft//dtd internet explorer 3.0 tables//",
    "-//netscape comm. corp.//dtd html//",
    "-//netscape comm. corp.//dtd strict html//",
    "-//o'reilly and associates//dtd html 2.0//",
    "-//o'reilly and associates//dtd html extended 1.0//",
    "-//o'reilly and associates//dtd html extended relaxed 1.0//",
    "-//sq//dtd html 2.0 hotmetal + extensions//",
    "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
    "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
    "-//spyglass//dtd html 2.0 extended//",
    "-//sun microsystems corp.//dtd hotjava html//",
    "-//sun microsystems corp.//dtd hotjava strict html//",
    "-//w3c//dtd html 3 1995-03-24//",
    "-//w3c//dtd html 3.2 draft//",
    "-//w3c//dtd html 3.2 final//",
    "-//w3c//dtd html 3.2//",
    "-//w3c//dtd html 3.2s draft//",
    "-//w3c//dtd html 4.0 frameset//",
    "-//w3c//dtd html 4.0 transitional//",
    "-//w3c//dtd html experimental 19960712//",
    "-//w3c//dtd html experimental 970421//",
    "-//w3c//dtd w3 html//",
    "-//w3o//dtd w3 html 3.0//",
    "-//webtechs//dtd mozilla html 2.0//",
    "-//webtechs//dtd mozilla html//"
  ];
  var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//"
  ];
  var QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
    "-//w3o//dtd w3 html strict 3.0//en//",
    "-/w3c/dtd html 4.0 transitional/en",
    "html"
  ]);
  var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
  var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//"
  ];
  function hasPrefix(publicId, prefixes) {
    return prefixes.some((prefix) => publicId.startsWith(prefix));
  }
  function isConforming(token) {
    return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
  }
  function getDocumentMode(token) {
    if (token.name !== VALID_DOCTYPE_NAME) {
      return DOCUMENT_MODE.QUIRKS;
    }
    const { systemId } = token;
    if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
      return DOCUMENT_MODE.QUIRKS;
    }
    let { publicId } = token;
    if (publicId !== null) {
      publicId = publicId.toLowerCase();
      if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
        return DOCUMENT_MODE.QUIRKS;
      }
      let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return DOCUMENT_MODE.QUIRKS;
      }
      prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return DOCUMENT_MODE.LIMITED_QUIRKS;
      }
    }
    return DOCUMENT_MODE.NO_QUIRKS;
  }

  // node_modules/parse5/dist/common/foreign-content.js
  var MIME_TYPES = {
    TEXT_HTML: "text/html",
    APPLICATION_XML: "application/xhtml+xml"
  };
  var DEFINITION_URL_ATTR = "definitionurl";
  var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
  var SVG_ATTRS_ADJUSTMENT_MAP = new Map([
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map((attr) => [attr.toLowerCase(), attr]));
  var XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
    ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
    ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
    ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
    ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
    ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
    ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
    ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
    ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
    ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
    ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
    ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
  ]);
  var SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath"
  ].map((tn2) => [tn2.toLowerCase(), tn2]));
  var EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
    TAG_ID.B,
    TAG_ID.BIG,
    TAG_ID.BLOCKQUOTE,
    TAG_ID.BODY,
    TAG_ID.BR,
    TAG_ID.CENTER,
    TAG_ID.CODE,
    TAG_ID.DD,
    TAG_ID.DIV,
    TAG_ID.DL,
    TAG_ID.DT,
    TAG_ID.EM,
    TAG_ID.EMBED,
    TAG_ID.H1,
    TAG_ID.H2,
    TAG_ID.H3,
    TAG_ID.H4,
    TAG_ID.H5,
    TAG_ID.H6,
    TAG_ID.HEAD,
    TAG_ID.HR,
    TAG_ID.I,
    TAG_ID.IMG,
    TAG_ID.LI,
    TAG_ID.LISTING,
    TAG_ID.MENU,
    TAG_ID.META,
    TAG_ID.NOBR,
    TAG_ID.OL,
    TAG_ID.P,
    TAG_ID.PRE,
    TAG_ID.RUBY,
    TAG_ID.S,
    TAG_ID.SMALL,
    TAG_ID.SPAN,
    TAG_ID.STRONG,
    TAG_ID.STRIKE,
    TAG_ID.SUB,
    TAG_ID.SUP,
    TAG_ID.TABLE,
    TAG_ID.TT,
    TAG_ID.U,
    TAG_ID.UL,
    TAG_ID.VAR
  ]);
  function causesExit(startTagToken) {
    const tn2 = startTagToken.tagID;
    const isFontWithAttrs = tn2 === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
    return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn2);
  }
  function adjustTokenMathMLAttrs(token) {
    for (let i3 = 0; i3 < token.attrs.length; i3++) {
      if (token.attrs[i3].name === DEFINITION_URL_ATTR) {
        token.attrs[i3].name = ADJUSTED_DEFINITION_URL_ATTR;
        break;
      }
    }
  }
  function adjustTokenSVGAttrs(token) {
    for (let i3 = 0; i3 < token.attrs.length; i3++) {
      const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i3].name);
      if (adjustedAttrName != null) {
        token.attrs[i3].name = adjustedAttrName;
      }
    }
  }
  function adjustTokenXMLAttrs(token) {
    for (let i3 = 0; i3 < token.attrs.length; i3++) {
      const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i3].name);
      if (adjustedAttrEntry) {
        token.attrs[i3].prefix = adjustedAttrEntry.prefix;
        token.attrs[i3].name = adjustedAttrEntry.name;
        token.attrs[i3].namespace = adjustedAttrEntry.namespace;
      }
    }
  }
  function adjustTokenSVGTagName(token) {
    const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
    if (adjustedTagName != null) {
      token.tagName = adjustedTagName;
      token.tagID = getTagID(token.tagName);
    }
  }
  function isMathMLTextIntegrationPoint(tn2, ns) {
    return ns === NS.MATHML && (tn2 === TAG_ID.MI || tn2 === TAG_ID.MO || tn2 === TAG_ID.MN || tn2 === TAG_ID.MS || tn2 === TAG_ID.MTEXT);
  }
  function isHtmlIntegrationPoint(tn2, ns, attrs) {
    if (ns === NS.MATHML && tn2 === TAG_ID.ANNOTATION_XML) {
      for (let i3 = 0; i3 < attrs.length; i3++) {
        if (attrs[i3].name === ATTRS.ENCODING) {
          const value = attrs[i3].value.toLowerCase();
          return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
        }
      }
    }
    return ns === NS.SVG && (tn2 === TAG_ID.FOREIGN_OBJECT || tn2 === TAG_ID.DESC || tn2 === TAG_ID.TITLE);
  }
  function isIntegrationPoint(tn2, ns, attrs, foreignNS) {
    return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn2, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn2, ns);
  }

  // node_modules/parse5/dist/parser/index.js
  var HIDDEN_INPUT_TYPE = "hidden";
  var AA_OUTER_LOOP_ITER = 8;
  var AA_INNER_LOOP_ITER = 3;
  var InsertionMode;
  (function(InsertionMode2) {
    InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
    InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
    InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
    InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
    InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
    InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
    InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
    InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
    InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
    InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
    InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
    InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
    InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
    InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
    InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
    InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
    InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
    InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
    InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
    InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
    InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
    InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
    InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
  })(InsertionMode || (InsertionMode = {}));
  var BASE_LOC = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1
  };
  var TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
  var defaultParserOptions = {
    scriptingEnabled: true,
    sourceCodeLocationInfo: false,
    treeAdapter: defaultTreeAdapter,
    onParseError: null
  };
  var Parser = class {
    constructor(options, document, fragmentContext = null, scriptHandler = null) {
      this.fragmentContext = fragmentContext;
      this.scriptHandler = scriptHandler;
      this.currentToken = null;
      this.stopped = false;
      this.insertionMode = InsertionMode.INITIAL;
      this.originalInsertionMode = InsertionMode.INITIAL;
      this.headElement = null;
      this.formElement = null;
      this.currentNotInHTML = false;
      this.tmplInsertionModeStack = [];
      this.pendingCharacterTokens = [];
      this.hasNonWhitespacePendingCharacterToken = false;
      this.framesetOk = true;
      this.skipNextNewLine = false;
      this.fosterParentingEnabled = false;
      this.options = {
        ...defaultParserOptions,
        ...options
      };
      this.treeAdapter = this.options.treeAdapter;
      this.onParseError = this.options.onParseError;
      if (this.onParseError) {
        this.options.sourceCodeLocationInfo = true;
      }
      this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
      this.tokenizer = new Tokenizer(this.options, this);
      this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
      this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
      this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
      this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
    }
    // API
    static parse(html, options) {
      const parser = new this(options);
      parser.tokenizer.write(html, true);
      return parser.document;
    }
    static getFragmentParser(fragmentContext, options) {
      const opts = {
        ...defaultParserOptions,
        ...options
      };
      fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []);
      const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
      const parser = new this(opts, documentMock, fragmentContext);
      if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
        parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      }
      parser._initTokenizerForFragmentParsing();
      parser._insertFakeRootElement();
      parser._resetInsertionMode();
      parser._findFormInFragmentContext();
      return parser;
    }
    getFragment() {
      const rootElement = this.treeAdapter.getFirstChild(this.document);
      const fragment = this.treeAdapter.createDocumentFragment();
      this._adoptNodes(rootElement, fragment);
      return fragment;
    }
    //Errors
    /** @internal */
    _err(token, code, beforeToken) {
      var _a2;
      if (!this.onParseError)
        return;
      const loc = (_a2 = token.location) !== null && _a2 !== void 0 ? _a2 : BASE_LOC;
      const err = {
        code,
        startLine: loc.startLine,
        startCol: loc.startCol,
        startOffset: loc.startOffset,
        endLine: beforeToken ? loc.startLine : loc.endLine,
        endCol: beforeToken ? loc.startCol : loc.endCol,
        endOffset: beforeToken ? loc.startOffset : loc.endOffset
      };
      this.onParseError(err);
    }
    //Stack events
    /** @internal */
    onItemPush(node, tid, isTop) {
      var _a2, _b;
      (_b = (_a2 = this.treeAdapter).onItemPush) === null || _b === void 0 ? void 0 : _b.call(_a2, node);
      if (isTop && this.openElements.stackTop > 0)
        this._setContextModes(node, tid);
    }
    /** @internal */
    onItemPop(node, isTop) {
      var _a2, _b;
      if (this.options.sourceCodeLocationInfo) {
        this._setEndLocation(node, this.currentToken);
      }
      (_b = (_a2 = this.treeAdapter).onItemPop) === null || _b === void 0 ? void 0 : _b.call(_a2, node, this.openElements.current);
      if (isTop) {
        let current;
        let currentTagId;
        if (this.openElements.stackTop === 0 && this.fragmentContext) {
          current = this.fragmentContext;
          currentTagId = this.fragmentContextID;
        } else {
          ({ current, currentTagId } = this.openElements);
        }
        this._setContextModes(current, currentTagId);
      }
    }
    _setContextModes(current, tid) {
      const isHTML = current === this.document || this.treeAdapter.getNamespaceURI(current) === NS.HTML;
      this.currentNotInHTML = !isHTML;
      this.tokenizer.inForeignNode = !isHTML && !this._isIntegrationPoint(tid, current);
    }
    /** @protected */
    _switchToTextParsing(currentToken, nextTokenizerState) {
      this._insertElement(currentToken, NS.HTML);
      this.tokenizer.state = nextTokenizerState;
      this.originalInsertionMode = this.insertionMode;
      this.insertionMode = InsertionMode.TEXT;
    }
    switchToPlaintextParsing() {
      this.insertionMode = InsertionMode.TEXT;
      this.originalInsertionMode = InsertionMode.IN_BODY;
      this.tokenizer.state = TokenizerMode.PLAINTEXT;
    }
    //Fragment parsing
    /** @protected */
    _getAdjustedCurrentElement() {
      return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
    }
    /** @protected */
    _findFormInFragmentContext() {
      let node = this.fragmentContext;
      while (node) {
        if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
          this.formElement = node;
          break;
        }
        node = this.treeAdapter.getParentNode(node);
      }
    }
    _initTokenizerForFragmentParsing() {
      if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
        return;
      }
      switch (this.fragmentContextID) {
        case TAG_ID.TITLE:
        case TAG_ID.TEXTAREA: {
          this.tokenizer.state = TokenizerMode.RCDATA;
          break;
        }
        case TAG_ID.STYLE:
        case TAG_ID.XMP:
        case TAG_ID.IFRAME:
        case TAG_ID.NOEMBED:
        case TAG_ID.NOFRAMES:
        case TAG_ID.NOSCRIPT: {
          this.tokenizer.state = TokenizerMode.RAWTEXT;
          break;
        }
        case TAG_ID.SCRIPT: {
          this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
          break;
        }
        case TAG_ID.PLAINTEXT: {
          this.tokenizer.state = TokenizerMode.PLAINTEXT;
          break;
        }
        default:
      }
    }
    //Tree mutation
    /** @protected */
    _setDocumentType(token) {
      const name = token.name || "";
      const publicId = token.publicId || "";
      const systemId = token.systemId || "";
      this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
      if (token.location) {
        const documentChildren = this.treeAdapter.getChildNodes(this.document);
        const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
        if (docTypeNode) {
          this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
        }
      }
    }
    /** @protected */
    _attachElementToTree(element, location) {
      if (this.options.sourceCodeLocationInfo) {
        const loc = location && {
          ...location,
          startTag: location
        };
        this.treeAdapter.setNodeSourceCodeLocation(element, loc);
      }
      if (this._shouldFosterParentOnInsertion()) {
        this._fosterParentElement(element);
      } else {
        const parent = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.appendChild(parent, element);
      }
    }
    /**
     * For self-closing tags. Add an element to the tree, but skip adding it
     * to the stack.
     */
    /** @protected */
    _appendElement(token, namespaceURI) {
      const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
      this._attachElementToTree(element, token.location);
    }
    /** @protected */
    _insertElement(token, namespaceURI) {
      const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
      this._attachElementToTree(element, token.location);
      this.openElements.push(element, token.tagID);
    }
    /** @protected */
    _insertFakeElement(tagName, tagID) {
      const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
      this._attachElementToTree(element, null);
      this.openElements.push(element, tagID);
    }
    /** @protected */
    _insertTemplate(token) {
      const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
      const content = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(tmpl, content);
      this._attachElementToTree(tmpl, token.location);
      this.openElements.push(tmpl, token.tagID);
      if (this.options.sourceCodeLocationInfo)
        this.treeAdapter.setNodeSourceCodeLocation(content, null);
    }
    /** @protected */
    _insertFakeRootElement() {
      const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
      if (this.options.sourceCodeLocationInfo)
        this.treeAdapter.setNodeSourceCodeLocation(element, null);
      this.treeAdapter.appendChild(this.openElements.current, element);
      this.openElements.push(element, TAG_ID.HTML);
    }
    /** @protected */
    _appendCommentNode(token, parent) {
      const commentNode = this.treeAdapter.createCommentNode(token.data);
      this.treeAdapter.appendChild(parent, commentNode);
      if (this.options.sourceCodeLocationInfo) {
        this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
      }
    }
    /** @protected */
    _insertCharacters(token) {
      let parent;
      let beforeElement;
      if (this._shouldFosterParentOnInsertion()) {
        ({ parent, beforeElement } = this._findFosterParentingLocation());
        if (beforeElement) {
          this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
        } else {
          this.treeAdapter.insertText(parent, token.chars);
        }
      } else {
        parent = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.insertText(parent, token.chars);
      }
      if (!token.location)
        return;
      const siblings = this.treeAdapter.getChildNodes(parent);
      const textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length;
      const textNode = siblings[textNodeIdx - 1];
      const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
      if (tnLoc) {
        const { endLine, endCol, endOffset } = token.location;
        this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
      } else if (this.options.sourceCodeLocationInfo) {
        this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
      }
    }
    /** @protected */
    _adoptNodes(donor, recipient) {
      for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
        this.treeAdapter.detachNode(child);
        this.treeAdapter.appendChild(recipient, child);
      }
    }
    /** @protected */
    _setEndLocation(element, closingToken) {
      if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
        const ctLoc = closingToken.location;
        const tn2 = this.treeAdapter.getTagName(element);
        const endLoc = (
          // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
          // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
          closingToken.type === TokenType.END_TAG && tn2 === closingToken.tagName ? {
            endTag: { ...ctLoc },
            endLine: ctLoc.endLine,
            endCol: ctLoc.endCol,
            endOffset: ctLoc.endOffset
          } : {
            endLine: ctLoc.startLine,
            endCol: ctLoc.startCol,
            endOffset: ctLoc.startOffset
          }
        );
        this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
      }
    }
    //Token processing
    shouldProcessStartTagTokenInForeignContent(token) {
      if (!this.currentNotInHTML)
        return false;
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
        return false;
      }
      return (
        // Check that `current` is not an integration point for HTML or MathML elements.
        this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
        // integration point.
        (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && !this._isIntegrationPoint(currentTagId, current, NS.HTML)
      );
    }
    /** @protected */
    _processToken(token) {
      switch (token.type) {
        case TokenType.CHARACTER: {
          this.onCharacter(token);
          break;
        }
        case TokenType.NULL_CHARACTER: {
          this.onNullCharacter(token);
          break;
        }
        case TokenType.COMMENT: {
          this.onComment(token);
          break;
        }
        case TokenType.DOCTYPE: {
          this.onDoctype(token);
          break;
        }
        case TokenType.START_TAG: {
          this._processStartTag(token);
          break;
        }
        case TokenType.END_TAG: {
          this.onEndTag(token);
          break;
        }
        case TokenType.EOF: {
          this.onEof(token);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          this.onWhitespaceCharacter(token);
          break;
        }
      }
    }
    //Integration points
    /** @protected */
    _isIntegrationPoint(tid, element, foreignNS) {
      const ns = this.treeAdapter.getNamespaceURI(element);
      const attrs = this.treeAdapter.getAttrList(element);
      return isIntegrationPoint(tid, ns, attrs, foreignNS);
    }
    //Active formatting elements reconstruction
    /** @protected */
    _reconstructActiveFormattingElements() {
      const listLength = this.activeFormattingElements.entries.length;
      if (listLength) {
        const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
        const unopenIdx = endIndex < 0 ? listLength - 1 : endIndex - 1;
        for (let i3 = unopenIdx; i3 >= 0; i3--) {
          const entry = this.activeFormattingElements.entries[i3];
          this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
          entry.element = this.openElements.current;
        }
      }
    }
    //Close elements
    /** @protected */
    _closeTableCell() {
      this.openElements.generateImpliedEndTags();
      this.openElements.popUntilTableCellPopped();
      this.activeFormattingElements.clearToLastMarker();
      this.insertionMode = InsertionMode.IN_ROW;
    }
    /** @protected */
    _closePElement() {
      this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
      this.openElements.popUntilTagNamePopped(TAG_ID.P);
    }
    //Insertion modes
    /** @protected */
    _resetInsertionMode() {
      for (let i3 = this.openElements.stackTop; i3 >= 0; i3--) {
        switch (i3 === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i3]) {
          case TAG_ID.TR: {
            this.insertionMode = InsertionMode.IN_ROW;
            return;
          }
          case TAG_ID.TBODY:
          case TAG_ID.THEAD:
          case TAG_ID.TFOOT: {
            this.insertionMode = InsertionMode.IN_TABLE_BODY;
            return;
          }
          case TAG_ID.CAPTION: {
            this.insertionMode = InsertionMode.IN_CAPTION;
            return;
          }
          case TAG_ID.COLGROUP: {
            this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
            return;
          }
          case TAG_ID.TABLE: {
            this.insertionMode = InsertionMode.IN_TABLE;
            return;
          }
          case TAG_ID.BODY: {
            this.insertionMode = InsertionMode.IN_BODY;
            return;
          }
          case TAG_ID.FRAMESET: {
            this.insertionMode = InsertionMode.IN_FRAMESET;
            return;
          }
          case TAG_ID.SELECT: {
            this._resetInsertionModeForSelect(i3);
            return;
          }
          case TAG_ID.TEMPLATE: {
            this.insertionMode = this.tmplInsertionModeStack[0];
            return;
          }
          case TAG_ID.HTML: {
            this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
            return;
          }
          case TAG_ID.TD:
          case TAG_ID.TH: {
            if (i3 > 0) {
              this.insertionMode = InsertionMode.IN_CELL;
              return;
            }
            break;
          }
          case TAG_ID.HEAD: {
            if (i3 > 0) {
              this.insertionMode = InsertionMode.IN_HEAD;
              return;
            }
            break;
          }
        }
      }
      this.insertionMode = InsertionMode.IN_BODY;
    }
    /** @protected */
    _resetInsertionModeForSelect(selectIdx) {
      if (selectIdx > 0) {
        for (let i3 = selectIdx - 1; i3 > 0; i3--) {
          const tn2 = this.openElements.tagIDs[i3];
          if (tn2 === TAG_ID.TEMPLATE) {
            break;
          } else if (tn2 === TAG_ID.TABLE) {
            this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
            return;
          }
        }
      }
      this.insertionMode = InsertionMode.IN_SELECT;
    }
    //Foster parenting
    /** @protected */
    _isElementCausesFosterParenting(tn2) {
      return TABLE_STRUCTURE_TAGS.has(tn2);
    }
    /** @protected */
    _shouldFosterParentOnInsertion() {
      return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
    }
    /** @protected */
    _findFosterParentingLocation() {
      for (let i3 = this.openElements.stackTop; i3 >= 0; i3--) {
        const openElement = this.openElements.items[i3];
        switch (this.openElements.tagIDs[i3]) {
          case TAG_ID.TEMPLATE: {
            if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
              return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
            }
            break;
          }
          case TAG_ID.TABLE: {
            const parent = this.treeAdapter.getParentNode(openElement);
            if (parent) {
              return { parent, beforeElement: openElement };
            }
            return { parent: this.openElements.items[i3 - 1], beforeElement: null };
          }
          default:
        }
      }
      return { parent: this.openElements.items[0], beforeElement: null };
    }
    /** @protected */
    _fosterParentElement(element) {
      const location = this._findFosterParentingLocation();
      if (location.beforeElement) {
        this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
      } else {
        this.treeAdapter.appendChild(location.parent, element);
      }
    }
    //Special elements
    /** @protected */
    _isSpecialElement(element, id) {
      const ns = this.treeAdapter.getNamespaceURI(element);
      return SPECIAL_ELEMENTS[ns].has(id);
    }
    /** @internal */
    onCharacter(token) {
      this.skipNextNewLine = false;
      if (this.tokenizer.inForeignNode) {
        characterInForeignContent(this, token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_TEMPLATE: {
          characterInBody(this, token);
          break;
        }
        case InsertionMode.TEXT:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE: {
          this._insertCharacters(token);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          characterInTableText(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          tokenInColumnGroup(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          tokenAfterBody(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onNullCharacter(token) {
      this.skipNextNewLine = false;
      if (this.tokenizer.inForeignNode) {
        nullCharacterInForeignContent(this, token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token);
          break;
        }
        case InsertionMode.TEXT: {
          this._insertCharacters(token);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          tokenInColumnGroup(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          tokenAfterBody(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onComment(token) {
      this.skipNextNewLine = false;
      if (this.currentNotInHTML) {
        appendComment(this, token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL:
        case InsertionMode.BEFORE_HTML:
        case InsertionMode.BEFORE_HEAD:
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD:
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE:
        case InsertionMode.IN_TEMPLATE:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET: {
          appendComment(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          appendCommentToRootHtmlElement(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          appendCommentToDocument(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onDoctype(token) {
      this.skipNextNewLine = false;
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          doctypeInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD:
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD: {
          this._err(token, ERR.misplacedDoctype);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onStartTag(token) {
      this.skipNextNewLine = false;
      this.currentToken = token;
      this._processStartTag(token);
      if (token.selfClosing && !token.ackSelfClosing) {
        this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
      }
    }
    /**
     * Processes a given start tag.
     *
     * `onStartTag` checks if a self-closing tag was recognized. When a token
     * is moved inbetween multiple insertion modes, this check for self-closing
     * could lead to false positives. To avoid this, `_processStartTag` is used
     * for nested calls.
     *
     * @param token The token to process.
     * @protected
     */
    _processStartTag(token) {
      if (this.shouldProcessStartTagTokenInForeignContent(token)) {
        startTagInForeignContent(this, token);
      } else {
        this._startTagOutsideForeignContent(token);
      }
    }
    /** @protected */
    _startTagOutsideForeignContent(token) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          startTagBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          startTagBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          startTagInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          startTagInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          startTagAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY: {
          startTagInBody(this, token);
          break;
        }
        case InsertionMode.IN_TABLE: {
          startTagInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.IN_CAPTION: {
          startTagInCaption(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          startTagInColumnGroup(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_BODY: {
          startTagInTableBody(this, token);
          break;
        }
        case InsertionMode.IN_ROW: {
          startTagInRow(this, token);
          break;
        }
        case InsertionMode.IN_CELL: {
          startTagInCell(this, token);
          break;
        }
        case InsertionMode.IN_SELECT: {
          startTagInSelect(this, token);
          break;
        }
        case InsertionMode.IN_SELECT_IN_TABLE: {
          startTagInSelectInTable(this, token);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          startTagInTemplate(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          startTagAfterBody(this, token);
          break;
        }
        case InsertionMode.IN_FRAMESET: {
          startTagInFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_FRAMESET: {
          startTagAfterFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          startTagAfterAfterBody(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          startTagAfterAfterFrameset(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onEndTag(token) {
      this.skipNextNewLine = false;
      this.currentToken = token;
      if (this.currentNotInHTML) {
        endTagInForeignContent(this, token);
      } else {
        this._endTagOutsideForeignContent(token);
      }
    }
    /** @protected */
    _endTagOutsideForeignContent(token) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          endTagBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          endTagBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          endTagInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          endTagInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          endTagAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY: {
          endTagInBody(this, token);
          break;
        }
        case InsertionMode.TEXT: {
          endTagInText(this, token);
          break;
        }
        case InsertionMode.IN_TABLE: {
          endTagInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.IN_CAPTION: {
          endTagInCaption(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          endTagInColumnGroup(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_BODY: {
          endTagInTableBody(this, token);
          break;
        }
        case InsertionMode.IN_ROW: {
          endTagInRow(this, token);
          break;
        }
        case InsertionMode.IN_CELL: {
          endTagInCell(this, token);
          break;
        }
        case InsertionMode.IN_SELECT: {
          endTagInSelect(this, token);
          break;
        }
        case InsertionMode.IN_SELECT_IN_TABLE: {
          endTagInSelectInTable(this, token);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          endTagInTemplate(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          endTagAfterBody(this, token);
          break;
        }
        case InsertionMode.IN_FRAMESET: {
          endTagInFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_FRAMESET: {
          endTagAfterFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onEof(token) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE: {
          eofInBody(this, token);
          break;
        }
        case InsertionMode.TEXT: {
          eofInText(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          eofInTemplate(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET:
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          stopParsing(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onWhitespaceCharacter(token) {
      if (this.skipNextNewLine) {
        this.skipNextNewLine = false;
        if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
          if (token.chars.length === 1) {
            return;
          }
          token.chars = token.chars.substr(1);
        }
      }
      if (this.tokenizer.inForeignNode) {
        this._insertCharacters(token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD:
        case InsertionMode.TEXT:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET: {
          this._insertCharacters(token);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_TEMPLATE:
        case InsertionMode.AFTER_BODY:
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          whitespaceCharacterInBody(this, token);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          whitespaceCharacterInTableText(this, token);
          break;
        }
        default:
      }
    }
  };
  function aaObtainFormattingElementEntry(p3, token) {
    let formattingElementEntry = p3.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
    if (formattingElementEntry) {
      if (!p3.openElements.contains(formattingElementEntry.element)) {
        p3.activeFormattingElements.removeEntry(formattingElementEntry);
        formattingElementEntry = null;
      } else if (!p3.openElements.hasInScope(token.tagID)) {
        formattingElementEntry = null;
      }
    } else {
      genericEndTagInBody(p3, token);
    }
    return formattingElementEntry;
  }
  function aaObtainFurthestBlock(p3, formattingElementEntry) {
    let furthestBlock = null;
    let idx = p3.openElements.stackTop;
    for (; idx >= 0; idx--) {
      const element = p3.openElements.items[idx];
      if (element === formattingElementEntry.element) {
        break;
      }
      if (p3._isSpecialElement(element, p3.openElements.tagIDs[idx])) {
        furthestBlock = element;
      }
    }
    if (!furthestBlock) {
      p3.openElements.shortenToLength(idx < 0 ? 0 : idx);
      p3.activeFormattingElements.removeEntry(formattingElementEntry);
    }
    return furthestBlock;
  }
  function aaInnerLoop(p3, furthestBlock, formattingElement) {
    let lastElement = furthestBlock;
    let nextElement = p3.openElements.getCommonAncestor(furthestBlock);
    for (let i3 = 0, element = nextElement; element !== formattingElement; i3++, element = nextElement) {
      nextElement = p3.openElements.getCommonAncestor(element);
      const elementEntry = p3.activeFormattingElements.getElementEntry(element);
      const counterOverflow = elementEntry && i3 >= AA_INNER_LOOP_ITER;
      const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
      if (shouldRemoveFromOpenElements) {
        if (counterOverflow) {
          p3.activeFormattingElements.removeEntry(elementEntry);
        }
        p3.openElements.remove(element);
      } else {
        element = aaRecreateElementFromEntry(p3, elementEntry);
        if (lastElement === furthestBlock) {
          p3.activeFormattingElements.bookmark = elementEntry;
        }
        p3.treeAdapter.detachNode(lastElement);
        p3.treeAdapter.appendChild(element, lastElement);
        lastElement = element;
      }
    }
    return lastElement;
  }
  function aaRecreateElementFromEntry(p3, elementEntry) {
    const ns = p3.treeAdapter.getNamespaceURI(elementEntry.element);
    const newElement = p3.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
    p3.openElements.replace(elementEntry.element, newElement);
    elementEntry.element = newElement;
    return newElement;
  }
  function aaInsertLastNodeInCommonAncestor(p3, commonAncestor, lastElement) {
    const tn2 = p3.treeAdapter.getTagName(commonAncestor);
    const tid = getTagID(tn2);
    if (p3._isElementCausesFosterParenting(tid)) {
      p3._fosterParentElement(lastElement);
    } else {
      const ns = p3.treeAdapter.getNamespaceURI(commonAncestor);
      if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) {
        commonAncestor = p3.treeAdapter.getTemplateContent(commonAncestor);
      }
      p3.treeAdapter.appendChild(commonAncestor, lastElement);
    }
  }
  function aaReplaceFormattingElement(p3, furthestBlock, formattingElementEntry) {
    const ns = p3.treeAdapter.getNamespaceURI(formattingElementEntry.element);
    const { token } = formattingElementEntry;
    const newElement = p3.treeAdapter.createElement(token.tagName, ns, token.attrs);
    p3._adoptNodes(furthestBlock, newElement);
    p3.treeAdapter.appendChild(furthestBlock, newElement);
    p3.activeFormattingElements.insertElementAfterBookmark(newElement, token);
    p3.activeFormattingElements.removeEntry(formattingElementEntry);
    p3.openElements.remove(formattingElementEntry.element);
    p3.openElements.insertAfter(furthestBlock, newElement, token.tagID);
  }
  function callAdoptionAgency(p3, token) {
    for (let i3 = 0; i3 < AA_OUTER_LOOP_ITER; i3++) {
      const formattingElementEntry = aaObtainFormattingElementEntry(p3, token);
      if (!formattingElementEntry) {
        break;
      }
      const furthestBlock = aaObtainFurthestBlock(p3, formattingElementEntry);
      if (!furthestBlock) {
        break;
      }
      p3.activeFormattingElements.bookmark = formattingElementEntry;
      const lastElement = aaInnerLoop(p3, furthestBlock, formattingElementEntry.element);
      const commonAncestor = p3.openElements.getCommonAncestor(formattingElementEntry.element);
      p3.treeAdapter.detachNode(lastElement);
      if (commonAncestor)
        aaInsertLastNodeInCommonAncestor(p3, commonAncestor, lastElement);
      aaReplaceFormattingElement(p3, furthestBlock, formattingElementEntry);
    }
  }
  function appendComment(p3, token) {
    p3._appendCommentNode(token, p3.openElements.currentTmplContentOrNode);
  }
  function appendCommentToRootHtmlElement(p3, token) {
    p3._appendCommentNode(token, p3.openElements.items[0]);
  }
  function appendCommentToDocument(p3, token) {
    p3._appendCommentNode(token, p3.document);
  }
  function stopParsing(p3, token) {
    p3.stopped = true;
    if (token.location) {
      const target = p3.fragmentContext ? 0 : 2;
      for (let i3 = p3.openElements.stackTop; i3 >= target; i3--) {
        p3._setEndLocation(p3.openElements.items[i3], token);
      }
      if (!p3.fragmentContext && p3.openElements.stackTop >= 0) {
        const htmlElement = p3.openElements.items[0];
        const htmlLocation = p3.treeAdapter.getNodeSourceCodeLocation(htmlElement);
        if (htmlLocation && !htmlLocation.endTag) {
          p3._setEndLocation(htmlElement, token);
          if (p3.openElements.stackTop >= 1) {
            const bodyElement = p3.openElements.items[1];
            const bodyLocation = p3.treeAdapter.getNodeSourceCodeLocation(bodyElement);
            if (bodyLocation && !bodyLocation.endTag) {
              p3._setEndLocation(bodyElement, token);
            }
          }
        }
      }
    }
  }
  function doctypeInInitialMode(p3, token) {
    p3._setDocumentType(token);
    const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
    if (!isConforming(token)) {
      p3._err(token, ERR.nonConformingDoctype);
    }
    p3.treeAdapter.setDocumentMode(p3.document, mode);
    p3.insertionMode = InsertionMode.BEFORE_HTML;
  }
  function tokenInInitialMode(p3, token) {
    p3._err(token, ERR.missingDoctype, true);
    p3.treeAdapter.setDocumentMode(p3.document, DOCUMENT_MODE.QUIRKS);
    p3.insertionMode = InsertionMode.BEFORE_HTML;
    p3._processToken(token);
  }
  function startTagBeforeHtml(p3, token) {
    if (token.tagID === TAG_ID.HTML) {
      p3._insertElement(token, NS.HTML);
      p3.insertionMode = InsertionMode.BEFORE_HEAD;
    } else {
      tokenBeforeHtml(p3, token);
    }
  }
  function endTagBeforeHtml(p3, token) {
    const tn2 = token.tagID;
    if (tn2 === TAG_ID.HTML || tn2 === TAG_ID.HEAD || tn2 === TAG_ID.BODY || tn2 === TAG_ID.BR) {
      tokenBeforeHtml(p3, token);
    }
  }
  function tokenBeforeHtml(p3, token) {
    p3._insertFakeRootElement();
    p3.insertionMode = InsertionMode.BEFORE_HEAD;
    p3._processToken(token);
  }
  function startTagBeforeHead(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.HEAD: {
        p3._insertElement(token, NS.HTML);
        p3.headElement = p3.openElements.current;
        p3.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      default: {
        tokenBeforeHead(p3, token);
      }
    }
  }
  function endTagBeforeHead(p3, token) {
    const tn2 = token.tagID;
    if (tn2 === TAG_ID.HEAD || tn2 === TAG_ID.BODY || tn2 === TAG_ID.HTML || tn2 === TAG_ID.BR) {
      tokenBeforeHead(p3, token);
    } else {
      p3._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenBeforeHead(p3, token) {
    p3._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
    p3.headElement = p3.openElements.current;
    p3.insertionMode = InsertionMode.IN_HEAD;
    p3._processToken(token);
  }
  function startTagInHead(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META: {
        p3._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.TITLE: {
        p3._switchToTextParsing(token, TokenizerMode.RCDATA);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        if (p3.options.scriptingEnabled) {
          p3._switchToTextParsing(token, TokenizerMode.RAWTEXT);
        } else {
          p3._insertElement(token, NS.HTML);
          p3.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
        }
        break;
      }
      case TAG_ID.NOFRAMES:
      case TAG_ID.STYLE: {
        p3._switchToTextParsing(token, TokenizerMode.RAWTEXT);
        break;
      }
      case TAG_ID.SCRIPT: {
        p3._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
        break;
      }
      case TAG_ID.TEMPLATE: {
        p3._insertTemplate(token);
        p3.activeFormattingElements.insertMarker();
        p3.framesetOk = false;
        p3.insertionMode = InsertionMode.IN_TEMPLATE;
        p3.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
        break;
      }
      case TAG_ID.HEAD: {
        p3._err(token, ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenInHead(p3, token);
      }
    }
  }
  function endTagInHead(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HEAD: {
        p3.openElements.pop();
        p3.insertionMode = InsertionMode.AFTER_HEAD;
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.BR:
      case TAG_ID.HTML: {
        tokenInHead(p3, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p3, token);
        break;
      }
      default: {
        p3._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function templateEndTagInHead(p3, token) {
    if (p3.openElements.tmplCount > 0) {
      p3.openElements.generateImpliedEndTagsThoroughly();
      if (p3.openElements.currentTagId !== TAG_ID.TEMPLATE) {
        p3._err(token, ERR.closingOfElementWithOpenChildElements);
      }
      p3.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
      p3.activeFormattingElements.clearToLastMarker();
      p3.tmplInsertionModeStack.shift();
      p3._resetInsertionMode();
    } else {
      p3._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenInHead(p3, token) {
    p3.openElements.pop();
    p3.insertionMode = InsertionMode.AFTER_HEAD;
    p3._processToken(token);
  }
  function startTagInHeadNoScript(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.HEAD:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.STYLE: {
        startTagInHead(p3, token);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        p3._err(token, ERR.nestedNoscriptInHead);
        break;
      }
      default: {
        tokenInHeadNoScript(p3, token);
      }
    }
  }
  function endTagInHeadNoScript(p3, token) {
    switch (token.tagID) {
      case TAG_ID.NOSCRIPT: {
        p3.openElements.pop();
        p3.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      case TAG_ID.BR: {
        tokenInHeadNoScript(p3, token);
        break;
      }
      default: {
        p3._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenInHeadNoScript(p3, token) {
    const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
    p3._err(token, errCode);
    p3.openElements.pop();
    p3.insertionMode = InsertionMode.IN_HEAD;
    p3._processToken(token);
  }
  function startTagAfterHead(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.BODY: {
        p3._insertElement(token, NS.HTML);
        p3.framesetOk = false;
        p3.insertionMode = InsertionMode.IN_BODY;
        break;
      }
      case TAG_ID.FRAMESET: {
        p3._insertElement(token, NS.HTML);
        p3.insertionMode = InsertionMode.IN_FRAMESET;
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.SCRIPT:
      case TAG_ID.STYLE:
      case TAG_ID.TEMPLATE:
      case TAG_ID.TITLE: {
        p3._err(token, ERR.abandonedHeadElementChild);
        p3.openElements.push(p3.headElement, TAG_ID.HEAD);
        startTagInHead(p3, token);
        p3.openElements.remove(p3.headElement);
        break;
      }
      case TAG_ID.HEAD: {
        p3._err(token, ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenAfterHead(p3, token);
      }
    }
  }
  function endTagAfterHead(p3, token) {
    switch (token.tagID) {
      case TAG_ID.BODY:
      case TAG_ID.HTML:
      case TAG_ID.BR: {
        tokenAfterHead(p3, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p3, token);
        break;
      }
      default: {
        p3._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenAfterHead(p3, token) {
    p3._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
    p3.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p3, token);
  }
  function modeInBody(p3, token) {
    switch (token.type) {
      case TokenType.CHARACTER: {
        characterInBody(p3, token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInBody(p3, token);
        break;
      }
      case TokenType.COMMENT: {
        appendComment(p3, token);
        break;
      }
      case TokenType.START_TAG: {
        startTagInBody(p3, token);
        break;
      }
      case TokenType.END_TAG: {
        endTagInBody(p3, token);
        break;
      }
      case TokenType.EOF: {
        eofInBody(p3, token);
        break;
      }
      default:
    }
  }
  function whitespaceCharacterInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._insertCharacters(token);
  }
  function characterInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._insertCharacters(token);
    p3.framesetOk = false;
  }
  function htmlStartTagInBody(p3, token) {
    if (p3.openElements.tmplCount === 0) {
      p3.treeAdapter.adoptAttributes(p3.openElements.items[0], token.attrs);
    }
  }
  function bodyStartTagInBody(p3, token) {
    const bodyElement = p3.openElements.tryPeekProperlyNestedBodyElement();
    if (bodyElement && p3.openElements.tmplCount === 0) {
      p3.framesetOk = false;
      p3.treeAdapter.adoptAttributes(bodyElement, token.attrs);
    }
  }
  function framesetStartTagInBody(p3, token) {
    const bodyElement = p3.openElements.tryPeekProperlyNestedBodyElement();
    if (p3.framesetOk && bodyElement) {
      p3.treeAdapter.detachNode(bodyElement);
      p3.openElements.popAllUpToHtmlElement();
      p3._insertElement(token, NS.HTML);
      p3.insertionMode = InsertionMode.IN_FRAMESET;
    }
  }
  function addressStartTagInBody(p3, token) {
    if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    p3._insertElement(token, NS.HTML);
  }
  function numberedHeaderStartTagInBody(p3, token) {
    if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    if (NUMBERED_HEADERS.has(p3.openElements.currentTagId)) {
      p3.openElements.pop();
    }
    p3._insertElement(token, NS.HTML);
  }
  function preStartTagInBody(p3, token) {
    if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    p3._insertElement(token, NS.HTML);
    p3.skipNextNewLine = true;
    p3.framesetOk = false;
  }
  function formStartTagInBody(p3, token) {
    const inTemplate = p3.openElements.tmplCount > 0;
    if (!p3.formElement || inTemplate) {
      if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
        p3._closePElement();
      }
      p3._insertElement(token, NS.HTML);
      if (!inTemplate) {
        p3.formElement = p3.openElements.current;
      }
    }
  }
  function listItemStartTagInBody(p3, token) {
    p3.framesetOk = false;
    const tn2 = token.tagID;
    for (let i3 = p3.openElements.stackTop; i3 >= 0; i3--) {
      const elementId = p3.openElements.tagIDs[i3];
      if (tn2 === TAG_ID.LI && elementId === TAG_ID.LI || (tn2 === TAG_ID.DD || tn2 === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
        p3.openElements.generateImpliedEndTagsWithExclusion(elementId);
        p3.openElements.popUntilTagNamePopped(elementId);
        break;
      }
      if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p3._isSpecialElement(p3.openElements.items[i3], elementId)) {
        break;
      }
    }
    if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    p3._insertElement(token, NS.HTML);
  }
  function plaintextStartTagInBody(p3, token) {
    if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    p3._insertElement(token, NS.HTML);
    p3.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  function buttonStartTagInBody(p3, token) {
    if (p3.openElements.hasInScope(TAG_ID.BUTTON)) {
      p3.openElements.generateImpliedEndTags();
      p3.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
    }
    p3._reconstructActiveFormattingElements();
    p3._insertElement(token, NS.HTML);
    p3.framesetOk = false;
  }
  function aStartTagInBody(p3, token) {
    const activeElementEntry = p3.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
    if (activeElementEntry) {
      callAdoptionAgency(p3, token);
      p3.openElements.remove(activeElementEntry.element);
      p3.activeFormattingElements.removeEntry(activeElementEntry);
    }
    p3._reconstructActiveFormattingElements();
    p3._insertElement(token, NS.HTML);
    p3.activeFormattingElements.pushElement(p3.openElements.current, token);
  }
  function bStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._insertElement(token, NS.HTML);
    p3.activeFormattingElements.pushElement(p3.openElements.current, token);
  }
  function nobrStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    if (p3.openElements.hasInScope(TAG_ID.NOBR)) {
      callAdoptionAgency(p3, token);
      p3._reconstructActiveFormattingElements();
    }
    p3._insertElement(token, NS.HTML);
    p3.activeFormattingElements.pushElement(p3.openElements.current, token);
  }
  function appletStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._insertElement(token, NS.HTML);
    p3.activeFormattingElements.insertMarker();
    p3.framesetOk = false;
  }
  function tableStartTagInBody(p3, token) {
    if (p3.treeAdapter.getDocumentMode(p3.document) !== DOCUMENT_MODE.QUIRKS && p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    p3._insertElement(token, NS.HTML);
    p3.framesetOk = false;
    p3.insertionMode = InsertionMode.IN_TABLE;
  }
  function areaStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._appendElement(token, NS.HTML);
    p3.framesetOk = false;
    token.ackSelfClosing = true;
  }
  function isHiddenInput(token) {
    const inputType = getTokenAttr(token, ATTRS.TYPE);
    return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
  }
  function inputStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._appendElement(token, NS.HTML);
    if (!isHiddenInput(token)) {
      p3.framesetOk = false;
    }
    token.ackSelfClosing = true;
  }
  function paramStartTagInBody(p3, token) {
    p3._appendElement(token, NS.HTML);
    token.ackSelfClosing = true;
  }
  function hrStartTagInBody(p3, token) {
    if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    p3._appendElement(token, NS.HTML);
    p3.framesetOk = false;
    token.ackSelfClosing = true;
  }
  function imageStartTagInBody(p3, token) {
    token.tagName = TAG_NAMES.IMG;
    token.tagID = TAG_ID.IMG;
    areaStartTagInBody(p3, token);
  }
  function textareaStartTagInBody(p3, token) {
    p3._insertElement(token, NS.HTML);
    p3.skipNextNewLine = true;
    p3.tokenizer.state = TokenizerMode.RCDATA;
    p3.originalInsertionMode = p3.insertionMode;
    p3.framesetOk = false;
    p3.insertionMode = InsertionMode.TEXT;
  }
  function xmpStartTagInBody(p3, token) {
    if (p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._closePElement();
    }
    p3._reconstructActiveFormattingElements();
    p3.framesetOk = false;
    p3._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function iframeStartTagInBody(p3, token) {
    p3.framesetOk = false;
    p3._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function rawTextStartTagInBody(p3, token) {
    p3._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function selectStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._insertElement(token, NS.HTML);
    p3.framesetOk = false;
    p3.insertionMode = p3.insertionMode === InsertionMode.IN_TABLE || p3.insertionMode === InsertionMode.IN_CAPTION || p3.insertionMode === InsertionMode.IN_TABLE_BODY || p3.insertionMode === InsertionMode.IN_ROW || p3.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
  }
  function optgroupStartTagInBody(p3, token) {
    if (p3.openElements.currentTagId === TAG_ID.OPTION) {
      p3.openElements.pop();
    }
    p3._reconstructActiveFormattingElements();
    p3._insertElement(token, NS.HTML);
  }
  function rbStartTagInBody(p3, token) {
    if (p3.openElements.hasInScope(TAG_ID.RUBY)) {
      p3.openElements.generateImpliedEndTags();
    }
    p3._insertElement(token, NS.HTML);
  }
  function rtStartTagInBody(p3, token) {
    if (p3.openElements.hasInScope(TAG_ID.RUBY)) {
      p3.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
    }
    p3._insertElement(token, NS.HTML);
  }
  function mathStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    adjustTokenMathMLAttrs(token);
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p3._appendElement(token, NS.MATHML);
    } else {
      p3._insertElement(token, NS.MATHML);
    }
    token.ackSelfClosing = true;
  }
  function svgStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    adjustTokenSVGAttrs(token);
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p3._appendElement(token, NS.SVG);
    } else {
      p3._insertElement(token, NS.SVG);
    }
    token.ackSelfClosing = true;
  }
  function genericStartTagInBody(p3, token) {
    p3._reconstructActiveFormattingElements();
    p3._insertElement(token, NS.HTML);
  }
  function startTagInBody(p3, token) {
    switch (token.tagID) {
      case TAG_ID.I:
      case TAG_ID.S:
      case TAG_ID.B:
      case TAG_ID.U:
      case TAG_ID.EM:
      case TAG_ID.TT:
      case TAG_ID.BIG:
      case TAG_ID.CODE:
      case TAG_ID.FONT:
      case TAG_ID.SMALL:
      case TAG_ID.STRIKE:
      case TAG_ID.STRONG: {
        bStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.A: {
        aStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.H1:
      case TAG_ID.H2:
      case TAG_ID.H3:
      case TAG_ID.H4:
      case TAG_ID.H5:
      case TAG_ID.H6: {
        numberedHeaderStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.P:
      case TAG_ID.DL:
      case TAG_ID.OL:
      case TAG_ID.UL:
      case TAG_ID.DIV:
      case TAG_ID.DIR:
      case TAG_ID.NAV:
      case TAG_ID.MAIN:
      case TAG_ID.MENU:
      case TAG_ID.ASIDE:
      case TAG_ID.CENTER:
      case TAG_ID.FIGURE:
      case TAG_ID.FOOTER:
      case TAG_ID.HEADER:
      case TAG_ID.HGROUP:
      case TAG_ID.DIALOG:
      case TAG_ID.DETAILS:
      case TAG_ID.ADDRESS:
      case TAG_ID.ARTICLE:
      case TAG_ID.SEARCH:
      case TAG_ID.SECTION:
      case TAG_ID.SUMMARY:
      case TAG_ID.FIELDSET:
      case TAG_ID.BLOCKQUOTE:
      case TAG_ID.FIGCAPTION: {
        addressStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.LI:
      case TAG_ID.DD:
      case TAG_ID.DT: {
        listItemStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.BR:
      case TAG_ID.IMG:
      case TAG_ID.WBR:
      case TAG_ID.AREA:
      case TAG_ID.EMBED:
      case TAG_ID.KEYGEN: {
        areaStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.HR: {
        hrStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.RB:
      case TAG_ID.RTC: {
        rbStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.RT:
      case TAG_ID.RP: {
        rtStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.PRE:
      case TAG_ID.LISTING: {
        preStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.XMP: {
        xmpStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.SVG: {
        svgStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.HTML: {
        htmlStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.STYLE:
      case TAG_ID.TITLE:
      case TAG_ID.SCRIPT:
      case TAG_ID.BGSOUND:
      case TAG_ID.BASEFONT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p3, token);
        break;
      }
      case TAG_ID.BODY: {
        bodyStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.FORM: {
        formStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.NOBR: {
        nobrStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.MATH: {
        mathStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.TABLE: {
        tableStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.INPUT: {
        inputStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.PARAM:
      case TAG_ID.TRACK:
      case TAG_ID.SOURCE: {
        paramStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.IMAGE: {
        imageStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.BUTTON: {
        buttonStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.APPLET:
      case TAG_ID.OBJECT:
      case TAG_ID.MARQUEE: {
        appletStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.IFRAME: {
        iframeStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.SELECT: {
        selectStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.OPTION:
      case TAG_ID.OPTGROUP: {
        optgroupStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.NOEMBED:
      case TAG_ID.NOFRAMES: {
        rawTextStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.FRAMESET: {
        framesetStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.TEXTAREA: {
        textareaStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        if (p3.options.scriptingEnabled) {
          rawTextStartTagInBody(p3, token);
        } else {
          genericStartTagInBody(p3, token);
        }
        break;
      }
      case TAG_ID.PLAINTEXT: {
        plaintextStartTagInBody(p3, token);
        break;
      }
      case TAG_ID.COL:
      case TAG_ID.TH:
      case TAG_ID.TD:
      case TAG_ID.TR:
      case TAG_ID.HEAD:
      case TAG_ID.FRAME:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.CAPTION:
      case TAG_ID.COLGROUP: {
        break;
      }
      default: {
        genericStartTagInBody(p3, token);
      }
    }
  }
  function bodyEndTagInBody(p3, token) {
    if (p3.openElements.hasInScope(TAG_ID.BODY)) {
      p3.insertionMode = InsertionMode.AFTER_BODY;
      if (p3.options.sourceCodeLocationInfo) {
        const bodyElement = p3.openElements.tryPeekProperlyNestedBodyElement();
        if (bodyElement) {
          p3._setEndLocation(bodyElement, token);
        }
      }
    }
  }
  function htmlEndTagInBody(p3, token) {
    if (p3.openElements.hasInScope(TAG_ID.BODY)) {
      p3.insertionMode = InsertionMode.AFTER_BODY;
      endTagAfterBody(p3, token);
    }
  }
  function addressEndTagInBody(p3, token) {
    const tn2 = token.tagID;
    if (p3.openElements.hasInScope(tn2)) {
      p3.openElements.generateImpliedEndTags();
      p3.openElements.popUntilTagNamePopped(tn2);
    }
  }
  function formEndTagInBody(p3) {
    const inTemplate = p3.openElements.tmplCount > 0;
    const { formElement } = p3;
    if (!inTemplate) {
      p3.formElement = null;
    }
    if ((formElement || inTemplate) && p3.openElements.hasInScope(TAG_ID.FORM)) {
      p3.openElements.generateImpliedEndTags();
      if (inTemplate) {
        p3.openElements.popUntilTagNamePopped(TAG_ID.FORM);
      } else if (formElement) {
        p3.openElements.remove(formElement);
      }
    }
  }
  function pEndTagInBody(p3) {
    if (!p3.openElements.hasInButtonScope(TAG_ID.P)) {
      p3._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
    }
    p3._closePElement();
  }
  function liEndTagInBody(p3) {
    if (p3.openElements.hasInListItemScope(TAG_ID.LI)) {
      p3.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
      p3.openElements.popUntilTagNamePopped(TAG_ID.LI);
    }
  }
  function ddEndTagInBody(p3, token) {
    const tn2 = token.tagID;
    if (p3.openElements.hasInScope(tn2)) {
      p3.openElements.generateImpliedEndTagsWithExclusion(tn2);
      p3.openElements.popUntilTagNamePopped(tn2);
    }
  }
  function numberedHeaderEndTagInBody(p3) {
    if (p3.openElements.hasNumberedHeaderInScope()) {
      p3.openElements.generateImpliedEndTags();
      p3.openElements.popUntilNumberedHeaderPopped();
    }
  }
  function appletEndTagInBody(p3, token) {
    const tn2 = token.tagID;
    if (p3.openElements.hasInScope(tn2)) {
      p3.openElements.generateImpliedEndTags();
      p3.openElements.popUntilTagNamePopped(tn2);
      p3.activeFormattingElements.clearToLastMarker();
    }
  }
  function brEndTagInBody(p3) {
    p3._reconstructActiveFormattingElements();
    p3._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
    p3.openElements.pop();
    p3.framesetOk = false;
  }
  function genericEndTagInBody(p3, token) {
    const tn2 = token.tagName;
    const tid = token.tagID;
    for (let i3 = p3.openElements.stackTop; i3 > 0; i3--) {
      const element = p3.openElements.items[i3];
      const elementId = p3.openElements.tagIDs[i3];
      if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p3.treeAdapter.getTagName(element) === tn2)) {
        p3.openElements.generateImpliedEndTagsWithExclusion(tid);
        if (p3.openElements.stackTop >= i3)
          p3.openElements.shortenToLength(i3);
        break;
      }
      if (p3._isSpecialElement(element, elementId)) {
        break;
      }
    }
  }
  function endTagInBody(p3, token) {
    switch (token.tagID) {
      case TAG_ID.A:
      case TAG_ID.B:
      case TAG_ID.I:
      case TAG_ID.S:
      case TAG_ID.U:
      case TAG_ID.EM:
      case TAG_ID.TT:
      case TAG_ID.BIG:
      case TAG_ID.CODE:
      case TAG_ID.FONT:
      case TAG_ID.NOBR:
      case TAG_ID.SMALL:
      case TAG_ID.STRIKE:
      case TAG_ID.STRONG: {
        callAdoptionAgency(p3, token);
        break;
      }
      case TAG_ID.P: {
        pEndTagInBody(p3);
        break;
      }
      case TAG_ID.DL:
      case TAG_ID.UL:
      case TAG_ID.OL:
      case TAG_ID.DIR:
      case TAG_ID.DIV:
      case TAG_ID.NAV:
      case TAG_ID.PRE:
      case TAG_ID.MAIN:
      case TAG_ID.MENU:
      case TAG_ID.ASIDE:
      case TAG_ID.BUTTON:
      case TAG_ID.CENTER:
      case TAG_ID.FIGURE:
      case TAG_ID.FOOTER:
      case TAG_ID.HEADER:
      case TAG_ID.HGROUP:
      case TAG_ID.DIALOG:
      case TAG_ID.ADDRESS:
      case TAG_ID.ARTICLE:
      case TAG_ID.DETAILS:
      case TAG_ID.SEARCH:
      case TAG_ID.SECTION:
      case TAG_ID.SUMMARY:
      case TAG_ID.LISTING:
      case TAG_ID.FIELDSET:
      case TAG_ID.BLOCKQUOTE:
      case TAG_ID.FIGCAPTION: {
        addressEndTagInBody(p3, token);
        break;
      }
      case TAG_ID.LI: {
        liEndTagInBody(p3);
        break;
      }
      case TAG_ID.DD:
      case TAG_ID.DT: {
        ddEndTagInBody(p3, token);
        break;
      }
      case TAG_ID.H1:
      case TAG_ID.H2:
      case TAG_ID.H3:
      case TAG_ID.H4:
      case TAG_ID.H5:
      case TAG_ID.H6: {
        numberedHeaderEndTagInBody(p3);
        break;
      }
      case TAG_ID.BR: {
        brEndTagInBody(p3);
        break;
      }
      case TAG_ID.BODY: {
        bodyEndTagInBody(p3, token);
        break;
      }
      case TAG_ID.HTML: {
        htmlEndTagInBody(p3, token);
        break;
      }
      case TAG_ID.FORM: {
        formEndTagInBody(p3);
        break;
      }
      case TAG_ID.APPLET:
      case TAG_ID.OBJECT:
      case TAG_ID.MARQUEE: {
        appletEndTagInBody(p3, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p3, token);
        break;
      }
      default: {
        genericEndTagInBody(p3, token);
      }
    }
  }
  function eofInBody(p3, token) {
    if (p3.tmplInsertionModeStack.length > 0) {
      eofInTemplate(p3, token);
    } else {
      stopParsing(p3, token);
    }
  }
  function endTagInText(p3, token) {
    var _a2;
    if (token.tagID === TAG_ID.SCRIPT) {
      (_a2 = p3.scriptHandler) === null || _a2 === void 0 ? void 0 : _a2.call(p3, p3.openElements.current);
    }
    p3.openElements.pop();
    p3.insertionMode = p3.originalInsertionMode;
  }
  function eofInText(p3, token) {
    p3._err(token, ERR.eofInElementThatCanContainOnlyText);
    p3.openElements.pop();
    p3.insertionMode = p3.originalInsertionMode;
    p3.onEof(token);
  }
  function characterInTable(p3, token) {
    if (TABLE_STRUCTURE_TAGS.has(p3.openElements.currentTagId)) {
      p3.pendingCharacterTokens.length = 0;
      p3.hasNonWhitespacePendingCharacterToken = false;
      p3.originalInsertionMode = p3.insertionMode;
      p3.insertionMode = InsertionMode.IN_TABLE_TEXT;
      switch (token.type) {
        case TokenType.CHARACTER: {
          characterInTableText(p3, token);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          whitespaceCharacterInTableText(p3, token);
          break;
        }
      }
    } else {
      tokenInTable(p3, token);
    }
  }
  function captionStartTagInTable(p3, token) {
    p3.openElements.clearBackToTableContext();
    p3.activeFormattingElements.insertMarker();
    p3._insertElement(token, NS.HTML);
    p3.insertionMode = InsertionMode.IN_CAPTION;
  }
  function colgroupStartTagInTable(p3, token) {
    p3.openElements.clearBackToTableContext();
    p3._insertElement(token, NS.HTML);
    p3.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  }
  function colStartTagInTable(p3, token) {
    p3.openElements.clearBackToTableContext();
    p3._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
    p3.insertionMode = InsertionMode.IN_COLUMN_GROUP;
    startTagInColumnGroup(p3, token);
  }
  function tbodyStartTagInTable(p3, token) {
    p3.openElements.clearBackToTableContext();
    p3._insertElement(token, NS.HTML);
    p3.insertionMode = InsertionMode.IN_TABLE_BODY;
  }
  function tdStartTagInTable(p3, token) {
    p3.openElements.clearBackToTableContext();
    p3._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
    p3.insertionMode = InsertionMode.IN_TABLE_BODY;
    startTagInTableBody(p3, token);
  }
  function tableStartTagInTable(p3, token) {
    if (p3.openElements.hasInTableScope(TAG_ID.TABLE)) {
      p3.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
      p3._resetInsertionMode();
      p3._processStartTag(token);
    }
  }
  function inputStartTagInTable(p3, token) {
    if (isHiddenInput(token)) {
      p3._appendElement(token, NS.HTML);
    } else {
      tokenInTable(p3, token);
    }
    token.ackSelfClosing = true;
  }
  function formStartTagInTable(p3, token) {
    if (!p3.formElement && p3.openElements.tmplCount === 0) {
      p3._insertElement(token, NS.HTML);
      p3.formElement = p3.openElements.current;
      p3.openElements.pop();
    }
  }
  function startTagInTable(p3, token) {
    switch (token.tagID) {
      case TAG_ID.TD:
      case TAG_ID.TH:
      case TAG_ID.TR: {
        tdStartTagInTable(p3, token);
        break;
      }
      case TAG_ID.STYLE:
      case TAG_ID.SCRIPT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p3, token);
        break;
      }
      case TAG_ID.COL: {
        colStartTagInTable(p3, token);
        break;
      }
      case TAG_ID.FORM: {
        formStartTagInTable(p3, token);
        break;
      }
      case TAG_ID.TABLE: {
        tableStartTagInTable(p3, token);
        break;
      }
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        tbodyStartTagInTable(p3, token);
        break;
      }
      case TAG_ID.INPUT: {
        inputStartTagInTable(p3, token);
        break;
      }
      case TAG_ID.CAPTION: {
        captionStartTagInTable(p3, token);
        break;
      }
      case TAG_ID.COLGROUP: {
        colgroupStartTagInTable(p3, token);
        break;
      }
      default: {
        tokenInTable(p3, token);
      }
    }
  }
  function endTagInTable(p3, token) {
    switch (token.tagID) {
      case TAG_ID.TABLE: {
        if (p3.openElements.hasInTableScope(TAG_ID.TABLE)) {
          p3.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
          p3._resetInsertionMode();
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p3, token);
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TBODY:
      case TAG_ID.TD:
      case TAG_ID.TFOOT:
      case TAG_ID.TH:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        break;
      }
      default: {
        tokenInTable(p3, token);
      }
    }
  }
  function tokenInTable(p3, token) {
    const savedFosterParentingState = p3.fosterParentingEnabled;
    p3.fosterParentingEnabled = true;
    modeInBody(p3, token);
    p3.fosterParentingEnabled = savedFosterParentingState;
  }
  function whitespaceCharacterInTableText(p3, token) {
    p3.pendingCharacterTokens.push(token);
  }
  function characterInTableText(p3, token) {
    p3.pendingCharacterTokens.push(token);
    p3.hasNonWhitespacePendingCharacterToken = true;
  }
  function tokenInTableText(p3, token) {
    let i3 = 0;
    if (p3.hasNonWhitespacePendingCharacterToken) {
      for (; i3 < p3.pendingCharacterTokens.length; i3++) {
        tokenInTable(p3, p3.pendingCharacterTokens[i3]);
      }
    } else {
      for (; i3 < p3.pendingCharacterTokens.length; i3++) {
        p3._insertCharacters(p3.pendingCharacterTokens[i3]);
      }
    }
    p3.insertionMode = p3.originalInsertionMode;
    p3._processToken(token);
  }
  var TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
  function startTagInCaption(p3, token) {
    const tn2 = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn2)) {
      if (p3.openElements.hasInTableScope(TAG_ID.CAPTION)) {
        p3.openElements.generateImpliedEndTags();
        p3.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
        p3.activeFormattingElements.clearToLastMarker();
        p3.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p3, token);
      }
    } else {
      startTagInBody(p3, token);
    }
  }
  function endTagInCaption(p3, token) {
    const tn2 = token.tagID;
    switch (tn2) {
      case TAG_ID.CAPTION:
      case TAG_ID.TABLE: {
        if (p3.openElements.hasInTableScope(TAG_ID.CAPTION)) {
          p3.openElements.generateImpliedEndTags();
          p3.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
          p3.activeFormattingElements.clearToLastMarker();
          p3.insertionMode = InsertionMode.IN_TABLE;
          if (tn2 === TAG_ID.TABLE) {
            endTagInTable(p3, token);
          }
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TBODY:
      case TAG_ID.TD:
      case TAG_ID.TFOOT:
      case TAG_ID.TH:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        break;
      }
      default: {
        endTagInBody(p3, token);
      }
    }
  }
  function startTagInColumnGroup(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.COL: {
        p3._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.TEMPLATE: {
        startTagInHead(p3, token);
        break;
      }
      default: {
        tokenInColumnGroup(p3, token);
      }
    }
  }
  function endTagInColumnGroup(p3, token) {
    switch (token.tagID) {
      case TAG_ID.COLGROUP: {
        if (p3.openElements.currentTagId === TAG_ID.COLGROUP) {
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p3, token);
        break;
      }
      case TAG_ID.COL: {
        break;
      }
      default: {
        tokenInColumnGroup(p3, token);
      }
    }
  }
  function tokenInColumnGroup(p3, token) {
    if (p3.openElements.currentTagId === TAG_ID.COLGROUP) {
      p3.openElements.pop();
      p3.insertionMode = InsertionMode.IN_TABLE;
      p3._processToken(token);
    }
  }
  function startTagInTableBody(p3, token) {
    switch (token.tagID) {
      case TAG_ID.TR: {
        p3.openElements.clearBackToTableBodyContext();
        p3._insertElement(token, NS.HTML);
        p3.insertionMode = InsertionMode.IN_ROW;
        break;
      }
      case TAG_ID.TH:
      case TAG_ID.TD: {
        p3.openElements.clearBackToTableBodyContext();
        p3._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
        p3.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p3, token);
        break;
      }
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p3.openElements.hasTableBodyContextInTableScope()) {
          p3.openElements.clearBackToTableBodyContext();
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE;
          startTagInTable(p3, token);
        }
        break;
      }
      default: {
        startTagInTable(p3, token);
      }
    }
  }
  function endTagInTableBody(p3, token) {
    const tn2 = token.tagID;
    switch (token.tagID) {
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p3.openElements.hasInTableScope(tn2)) {
          p3.openElements.clearBackToTableBodyContext();
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case TAG_ID.TABLE: {
        if (p3.openElements.hasTableBodyContextInTableScope()) {
          p3.openElements.clearBackToTableBodyContext();
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE;
          endTagInTable(p3, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TD:
      case TAG_ID.TH:
      case TAG_ID.TR: {
        break;
      }
      default: {
        endTagInTable(p3, token);
      }
    }
  }
  function startTagInRow(p3, token) {
    switch (token.tagID) {
      case TAG_ID.TH:
      case TAG_ID.TD: {
        p3.openElements.clearBackToTableRowContext();
        p3._insertElement(token, NS.HTML);
        p3.insertionMode = InsertionMode.IN_CELL;
        p3.activeFormattingElements.insertMarker();
        break;
      }
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        if (p3.openElements.hasInTableScope(TAG_ID.TR)) {
          p3.openElements.clearBackToTableRowContext();
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE_BODY;
          startTagInTableBody(p3, token);
        }
        break;
      }
      default: {
        startTagInTable(p3, token);
      }
    }
  }
  function endTagInRow(p3, token) {
    switch (token.tagID) {
      case TAG_ID.TR: {
        if (p3.openElements.hasInTableScope(TAG_ID.TR)) {
          p3.openElements.clearBackToTableRowContext();
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE_BODY;
        }
        break;
      }
      case TAG_ID.TABLE: {
        if (p3.openElements.hasInTableScope(TAG_ID.TR)) {
          p3.openElements.clearBackToTableRowContext();
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p3, token);
        }
        break;
      }
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p3.openElements.hasInTableScope(token.tagID) || p3.openElements.hasInTableScope(TAG_ID.TR)) {
          p3.openElements.clearBackToTableRowContext();
          p3.openElements.pop();
          p3.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p3, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TD:
      case TAG_ID.TH: {
        break;
      }
      default: {
        endTagInTable(p3, token);
      }
    }
  }
  function startTagInCell(p3, token) {
    const tn2 = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn2)) {
      if (p3.openElements.hasInTableScope(TAG_ID.TD) || p3.openElements.hasInTableScope(TAG_ID.TH)) {
        p3._closeTableCell();
        startTagInRow(p3, token);
      }
    } else {
      startTagInBody(p3, token);
    }
  }
  function endTagInCell(p3, token) {
    const tn2 = token.tagID;
    switch (tn2) {
      case TAG_ID.TD:
      case TAG_ID.TH: {
        if (p3.openElements.hasInTableScope(tn2)) {
          p3.openElements.generateImpliedEndTags();
          p3.openElements.popUntilTagNamePopped(tn2);
          p3.activeFormattingElements.clearToLastMarker();
          p3.insertionMode = InsertionMode.IN_ROW;
        }
        break;
      }
      case TAG_ID.TABLE:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        if (p3.openElements.hasInTableScope(tn2)) {
          p3._closeTableCell();
          endTagInRow(p3, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML: {
        break;
      }
      default: {
        endTagInBody(p3, token);
      }
    }
  }
  function startTagInSelect(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.OPTION: {
        if (p3.openElements.currentTagId === TAG_ID.OPTION) {
          p3.openElements.pop();
        }
        p3._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.OPTGROUP: {
        if (p3.openElements.currentTagId === TAG_ID.OPTION) {
          p3.openElements.pop();
        }
        if (p3.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p3.openElements.pop();
        }
        p3._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.HR: {
        if (p3.openElements.currentTagId === TAG_ID.OPTION) {
          p3.openElements.pop();
        }
        if (p3.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p3.openElements.pop();
        }
        p3._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.INPUT:
      case TAG_ID.KEYGEN:
      case TAG_ID.TEXTAREA:
      case TAG_ID.SELECT: {
        if (p3.openElements.hasInSelectScope(TAG_ID.SELECT)) {
          p3.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
          p3._resetInsertionMode();
          if (token.tagID !== TAG_ID.SELECT) {
            p3._processStartTag(token);
          }
        }
        break;
      }
      case TAG_ID.SCRIPT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p3, token);
        break;
      }
      default:
    }
  }
  function endTagInSelect(p3, token) {
    switch (token.tagID) {
      case TAG_ID.OPTGROUP: {
        if (p3.openElements.stackTop > 0 && p3.openElements.currentTagId === TAG_ID.OPTION && p3.openElements.tagIDs[p3.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
          p3.openElements.pop();
        }
        if (p3.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p3.openElements.pop();
        }
        break;
      }
      case TAG_ID.OPTION: {
        if (p3.openElements.currentTagId === TAG_ID.OPTION) {
          p3.openElements.pop();
        }
        break;
      }
      case TAG_ID.SELECT: {
        if (p3.openElements.hasInSelectScope(TAG_ID.SELECT)) {
          p3.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
          p3._resetInsertionMode();
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p3, token);
        break;
      }
      default:
    }
  }
  function startTagInSelectInTable(p3, token) {
    const tn2 = token.tagID;
    if (tn2 === TAG_ID.CAPTION || tn2 === TAG_ID.TABLE || tn2 === TAG_ID.TBODY || tn2 === TAG_ID.TFOOT || tn2 === TAG_ID.THEAD || tn2 === TAG_ID.TR || tn2 === TAG_ID.TD || tn2 === TAG_ID.TH) {
      p3.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
      p3._resetInsertionMode();
      p3._processStartTag(token);
    } else {
      startTagInSelect(p3, token);
    }
  }
  function endTagInSelectInTable(p3, token) {
    const tn2 = token.tagID;
    if (tn2 === TAG_ID.CAPTION || tn2 === TAG_ID.TABLE || tn2 === TAG_ID.TBODY || tn2 === TAG_ID.TFOOT || tn2 === TAG_ID.THEAD || tn2 === TAG_ID.TR || tn2 === TAG_ID.TD || tn2 === TAG_ID.TH) {
      if (p3.openElements.hasInTableScope(tn2)) {
        p3.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p3._resetInsertionMode();
        p3.onEndTag(token);
      }
    } else {
      endTagInSelect(p3, token);
    }
  }
  function startTagInTemplate(p3, token) {
    switch (token.tagID) {
      // First, handle tags that can start without a mode change
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.SCRIPT:
      case TAG_ID.STYLE:
      case TAG_ID.TEMPLATE:
      case TAG_ID.TITLE: {
        startTagInHead(p3, token);
        break;
      }
      // Re-process the token in the appropriate mode
      case TAG_ID.CAPTION:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        p3.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
        p3.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p3, token);
        break;
      }
      case TAG_ID.COL: {
        p3.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
        p3.insertionMode = InsertionMode.IN_COLUMN_GROUP;
        startTagInColumnGroup(p3, token);
        break;
      }
      case TAG_ID.TR: {
        p3.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
        p3.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p3, token);
        break;
      }
      case TAG_ID.TD:
      case TAG_ID.TH: {
        p3.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
        p3.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p3, token);
        break;
      }
      default: {
        p3.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
        p3.insertionMode = InsertionMode.IN_BODY;
        startTagInBody(p3, token);
      }
    }
  }
  function endTagInTemplate(p3, token) {
    if (token.tagID === TAG_ID.TEMPLATE) {
      templateEndTagInHead(p3, token);
    }
  }
  function eofInTemplate(p3, token) {
    if (p3.openElements.tmplCount > 0) {
      p3.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
      p3.activeFormattingElements.clearToLastMarker();
      p3.tmplInsertionModeStack.shift();
      p3._resetInsertionMode();
      p3.onEof(token);
    } else {
      stopParsing(p3, token);
    }
  }
  function startTagAfterBody(p3, token) {
    if (token.tagID === TAG_ID.HTML) {
      startTagInBody(p3, token);
    } else {
      tokenAfterBody(p3, token);
    }
  }
  function endTagAfterBody(p3, token) {
    var _a2;
    if (token.tagID === TAG_ID.HTML) {
      if (!p3.fragmentContext) {
        p3.insertionMode = InsertionMode.AFTER_AFTER_BODY;
      }
      if (p3.options.sourceCodeLocationInfo && p3.openElements.tagIDs[0] === TAG_ID.HTML) {
        p3._setEndLocation(p3.openElements.items[0], token);
        const bodyElement = p3.openElements.items[1];
        if (bodyElement && !((_a2 = p3.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a2 === void 0 ? void 0 : _a2.endTag)) {
          p3._setEndLocation(bodyElement, token);
        }
      }
    } else {
      tokenAfterBody(p3, token);
    }
  }
  function tokenAfterBody(p3, token) {
    p3.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p3, token);
  }
  function startTagInFrameset(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.FRAMESET: {
        p3._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.FRAME: {
        p3._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p3, token);
        break;
      }
      default:
    }
  }
  function endTagInFrameset(p3, token) {
    if (token.tagID === TAG_ID.FRAMESET && !p3.openElements.isRootHtmlElementCurrent()) {
      p3.openElements.pop();
      if (!p3.fragmentContext && p3.openElements.currentTagId !== TAG_ID.FRAMESET) {
        p3.insertionMode = InsertionMode.AFTER_FRAMESET;
      }
    }
  }
  function startTagAfterFrameset(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p3, token);
        break;
      }
      default:
    }
  }
  function endTagAfterFrameset(p3, token) {
    if (token.tagID === TAG_ID.HTML) {
      p3.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
    }
  }
  function startTagAfterAfterBody(p3, token) {
    if (token.tagID === TAG_ID.HTML) {
      startTagInBody(p3, token);
    } else {
      tokenAfterAfterBody(p3, token);
    }
  }
  function tokenAfterAfterBody(p3, token) {
    p3.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p3, token);
  }
  function startTagAfterAfterFrameset(p3, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p3, token);
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p3, token);
        break;
      }
      default:
    }
  }
  function nullCharacterInForeignContent(p3, token) {
    token.chars = REPLACEMENT_CHARACTER;
    p3._insertCharacters(token);
  }
  function characterInForeignContent(p3, token) {
    p3._insertCharacters(token);
    p3.framesetOk = false;
  }
  function popUntilHtmlOrIntegrationPoint(p3) {
    while (p3.treeAdapter.getNamespaceURI(p3.openElements.current) !== NS.HTML && !p3._isIntegrationPoint(p3.openElements.currentTagId, p3.openElements.current)) {
      p3.openElements.pop();
    }
  }
  function startTagInForeignContent(p3, token) {
    if (causesExit(token)) {
      popUntilHtmlOrIntegrationPoint(p3);
      p3._startTagOutsideForeignContent(token);
    } else {
      const current = p3._getAdjustedCurrentElement();
      const currentNs = p3.treeAdapter.getNamespaceURI(current);
      if (currentNs === NS.MATHML) {
        adjustTokenMathMLAttrs(token);
      } else if (currentNs === NS.SVG) {
        adjustTokenSVGTagName(token);
        adjustTokenSVGAttrs(token);
      }
      adjustTokenXMLAttrs(token);
      if (token.selfClosing) {
        p3._appendElement(token, currentNs);
      } else {
        p3._insertElement(token, currentNs);
      }
      token.ackSelfClosing = true;
    }
  }
  function endTagInForeignContent(p3, token) {
    if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
      popUntilHtmlOrIntegrationPoint(p3);
      p3._endTagOutsideForeignContent(token);
      return;
    }
    for (let i3 = p3.openElements.stackTop; i3 > 0; i3--) {
      const element = p3.openElements.items[i3];
      if (p3.treeAdapter.getNamespaceURI(element) === NS.HTML) {
        p3._endTagOutsideForeignContent(token);
        break;
      }
      const tagName = p3.treeAdapter.getTagName(element);
      if (tagName.toLowerCase() === token.tagName) {
        token.tagName = tagName;
        p3.openElements.shortenToLength(i3);
        break;
      }
    }
  }

  // node_modules/entities/lib/esm/escape.js
  var xmlCodeMap = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  var getCodePoint = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      (c3, index) => (c3.charCodeAt(index) & 64512) === 55296 ? (c3.charCodeAt(index) - 55296) * 1024 + c3.charCodeAt(index + 1) - 56320 + 65536 : c3.charCodeAt(index)
    )
  );
  function getEscaper(regex, map) {
    return function escape(data) {
      let match;
      let lastIdx = 0;
      let result = "";
      while (match = regex.exec(data)) {
        if (lastIdx !== match.index) {
          result += data.substring(lastIdx, match.index);
        }
        result += map.get(match[0].charCodeAt(0));
        lastIdx = match.index + 1;
      }
      return result + data.substring(lastIdx);
    };
  }
  var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
  var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ]));
  var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));

  // node_modules/parse5/dist/serializer/index.js
  var VOID_ELEMENTS = /* @__PURE__ */ new Set([
    TAG_NAMES.AREA,
    TAG_NAMES.BASE,
    TAG_NAMES.BASEFONT,
    TAG_NAMES.BGSOUND,
    TAG_NAMES.BR,
    TAG_NAMES.COL,
    TAG_NAMES.EMBED,
    TAG_NAMES.FRAME,
    TAG_NAMES.HR,
    TAG_NAMES.IMG,
    TAG_NAMES.INPUT,
    TAG_NAMES.KEYGEN,
    TAG_NAMES.LINK,
    TAG_NAMES.META,
    TAG_NAMES.PARAM,
    TAG_NAMES.SOURCE,
    TAG_NAMES.TRACK,
    TAG_NAMES.WBR
  ]);
  function isVoidElement(node, options) {
    return options.treeAdapter.isElementNode(node) && options.treeAdapter.getNamespaceURI(node) === NS.HTML && VOID_ELEMENTS.has(options.treeAdapter.getTagName(node));
  }
  var defaultOpts = { treeAdapter: defaultTreeAdapter, scriptingEnabled: true };
  function serialize(node, options) {
    const opts = { ...defaultOpts, ...options };
    if (isVoidElement(node, opts)) {
      return "";
    }
    return serializeChildNodes(node, opts);
  }
  function serializeChildNodes(parentNode, options) {
    let html = "";
    const container = options.treeAdapter.isElementNode(parentNode) && options.treeAdapter.getTagName(parentNode) === TAG_NAMES.TEMPLATE && options.treeAdapter.getNamespaceURI(parentNode) === NS.HTML ? options.treeAdapter.getTemplateContent(parentNode) : parentNode;
    const childNodes = options.treeAdapter.getChildNodes(container);
    if (childNodes) {
      for (const currentNode of childNodes) {
        html += serializeNode(currentNode, options);
      }
    }
    return html;
  }
  function serializeNode(node, options) {
    if (options.treeAdapter.isElementNode(node)) {
      return serializeElement(node, options);
    }
    if (options.treeAdapter.isTextNode(node)) {
      return serializeTextNode(node, options);
    }
    if (options.treeAdapter.isCommentNode(node)) {
      return serializeCommentNode(node, options);
    }
    if (options.treeAdapter.isDocumentTypeNode(node)) {
      return serializeDocumentTypeNode(node, options);
    }
    return "";
  }
  function serializeElement(node, options) {
    const tn2 = options.treeAdapter.getTagName(node);
    return `<${tn2}${serializeAttributes(node, options)}>${isVoidElement(node, options) ? "" : `${serializeChildNodes(node, options)}</${tn2}>`}`;
  }
  function serializeAttributes(node, { treeAdapter }) {
    let html = "";
    for (const attr of treeAdapter.getAttrList(node)) {
      html += " ";
      if (attr.namespace) {
        switch (attr.namespace) {
          case NS.XML: {
            html += `xml:${attr.name}`;
            break;
          }
          case NS.XMLNS: {
            if (attr.name !== "xmlns") {
              html += "xmlns:";
            }
            html += attr.name;
            break;
          }
          case NS.XLINK: {
            html += `xlink:${attr.name}`;
            break;
          }
          default: {
            html += `${attr.prefix}:${attr.name}`;
          }
        }
      } else {
        html += attr.name;
      }
      html += `="${escapeAttribute(attr.value)}"`;
    }
    return html;
  }
  function serializeTextNode(node, options) {
    const { treeAdapter } = options;
    const content = treeAdapter.getTextNodeContent(node);
    const parent = treeAdapter.getParentNode(node);
    const parentTn = parent && treeAdapter.isElementNode(parent) && treeAdapter.getTagName(parent);
    return parentTn && treeAdapter.getNamespaceURI(parent) === NS.HTML && hasUnescapedText(parentTn, options.scriptingEnabled) ? content : escapeText(content);
  }
  function serializeCommentNode(node, { treeAdapter }) {
    return `<!--${treeAdapter.getCommentNodeContent(node)}-->`;
  }
  function serializeDocumentTypeNode(node, { treeAdapter }) {
    return `<!DOCTYPE ${treeAdapter.getDocumentTypeNodeName(node)}>`;
  }

  // node_modules/parse5/dist/index.js
  function parse(html, options) {
    return Parser.parse(html, options);
  }
  function parseFragment(fragmentContext, html, options) {
    if (typeof fragmentContext === "string") {
      options = html;
      html = fragmentContext;
      fragmentContext = null;
    }
    const parser = Parser.getFragmentParser(fragmentContext, options);
    parser.tokenizer.write(html, true);
    return parser.getFragment();
  }

  // src/rewrite/html.js
  var HTML = class extends import_events.default {
    /**
     *
     * @param {Ultraviolet} ctx
     */
    constructor(ctx) {
      super();
      this.ctx = ctx;
      this.rewriteUrl = ctx.rewriteUrl;
      this.sourceUrl = ctx.sourceUrl;
    }
    rewrite(str, options = {}) {
      if (!str) return str;
      return this.recast(
        str,
        (node) => {
          if (node.tagName) this.emit("element", node, "rewrite");
          if (node.attr) this.emit("attr", node, "rewrite");
          if (node.nodeName === "#text") this.emit("text", node, "rewrite");
        },
        options
      );
    }
    source(str, options = {}) {
      if (!str) return str;
      return this.recast(
        str,
        (node) => {
          if (node.tagName) this.emit("element", node, "source");
          if (node.attr) this.emit("attr", node, "source");
          if (node.nodeName === "#text") this.emit("text", node, "source");
        },
        options
      );
    }
    recast(str, fn2, options = {}) {
      try {
        const ast = (options.document ? parse : parseFragment)(
          new String(str).toString()
        );
        this.iterate(ast, fn2, options);
        return serialize(ast);
      } catch (e2) {
        return str;
      }
    }
    iterate(ast, fn2, fnOptions) {
      if (!ast) return ast;
      if (ast.tagName) {
        const element = new P5Element(ast, false, fnOptions);
        fn2(element);
        if (ast.attrs) {
          for (const attr of ast.attrs) {
            if (!attr.skip) fn2(new AttributeEvent(element, attr, fnOptions));
          }
        }
      }
      if (ast.childNodes) {
        for (const child of ast.childNodes) {
          if (!child.skip) this.iterate(child, fn2, fnOptions);
        }
      }
      if (ast.nodeName === "#text") {
        fn2(new TextEvent(ast, new P5Element(ast.parentNode), false, fnOptions));
      }
      return ast;
    }
    wrapSrcset(str, meta = this.ctx.meta) {
      return str.split(",").map((src) => {
        const parts = src.trimStart().split(" ");
        if (parts[0]) parts[0] = this.ctx.rewriteUrl(parts[0], meta);
        return parts.join(" ");
      }).join(", ");
    }
    unwrapSrcset(str, meta = this.ctx.meta) {
      return str.split(",").map((src) => {
        const parts = src.trimStart().split(" ");
        if (parts[0]) parts[0] = this.ctx.sourceUrl(parts[0], meta);
        return parts.join(" ");
      }).join(", ");
    }
    static parse = parse;
    static parseFragment = parseFragment;
    static serialize = serialize;
  };
  var P5Element = class _P5Element extends import_events.default {
    constructor(node, stream = false, options = {}) {
      super();
      this.stream = stream;
      this.node = node;
      this.options = options;
    }
    setAttribute(name, value) {
      for (const attr of this.attrs) {
        if (attr.name === name) {
          attr.value = value;
          return true;
        }
      }
      this.attrs.push({
        name,
        value
      });
    }
    getAttribute(name) {
      const attr = this.attrs.find((attr2) => attr2.name === name) || {};
      return attr.value;
    }
    hasAttribute(name) {
      return !!this.attrs.find((attr) => attr.name === name);
    }
    removeAttribute(name) {
      const i3 = this.attrs.findIndex((attr) => attr.name === name);
      if (typeof i3 !== "undefined") this.attrs.splice(i3, 1);
    }
    get tagName() {
      return this.node.tagName;
    }
    set tagName(val) {
      this.node.tagName = val;
    }
    get childNodes() {
      return !this.stream ? this.node.childNodes : null;
    }
    get innerHTML() {
      return !this.stream ? serialize({
        nodeName: "#document-fragment",
        childNodes: this.childNodes
      }) : null;
    }
    set innerHTML(val) {
      if (!this.stream) this.node.childNodes = parseFragment(val).childNodes;
    }
    get outerHTML() {
      return !this.stream ? serialize({
        nodeName: "#document-fragment",
        childNodes: [this]
      }) : null;
    }
    set outerHTML(val) {
      if (!this.stream)
        this.parentNode.childNodes.splice(
          this.parentNode.childNodes.findIndex((node) => node === this.node),
          1,
          ...parseFragment(val).childNodes
        );
    }
    get textContent() {
      if (this.stream) return null;
      let str = "";
      this.iterate(this.node, (node) => {
        if (node.nodeName === "#text") str += node.value;
      });
      return str;
    }
    set textContent(val) {
      if (!this.stream)
        this.node.childNodes = [
          {
            nodeName: "#text",
            value: val,
            parentNode: this.node
          }
        ];
    }
    get nodeName() {
      return this.node.nodeName;
    }
    get parentNode() {
      return this.node.parentNode ? new _P5Element(this.node.parentNode) : null;
    }
    get attrs() {
      return this.node.attrs;
    }
    get namespaceURI() {
      return this.node.namespaceURI;
    }
  };
  var AttributeEvent = class {
    constructor(node, attr, options = {}) {
      this.attr = attr;
      this.attrs = node.attrs;
      this.node = node;
      this.options = options;
    }
    delete() {
      const i3 = this.attrs.findIndex((attr) => attr === this.attr);
      this.attrs.splice(i3, 1);
      Object.defineProperty(this, "deleted", {
        get: () => true
      });
      return true;
    }
    get name() {
      return this.attr.name;
    }
    set name(val) {
      this.attr.name = val;
    }
    get value() {
      return this.attr.value;
    }
    set value(val) {
      this.attr.value = val;
    }
    get deleted() {
      return false;
    }
  };
  var TextEvent = class {
    constructor(node, element, stream = false, options = {}) {
      this.stream = stream;
      this.node = node;
      this.element = element;
      this.options = options;
    }
    get nodeName() {
      return this.node.nodeName;
    }
    get parentNode() {
      return this.element;
    }
    get value() {
      return this.stream ? this.node.text : this.node.value;
    }
    set value(val) {
      if (this.stream) this.node.text = val;
      else this.node.value = val;
    }
  };
  var html_default = HTML;

  // src/rewrite/css.js
  var import_events2 = __toESM(require_events(), 1);
  var CSS = class extends import_events2.default {
    constructor(ctx) {
      super();
      this.ctx = ctx;
      this.meta = ctx.meta;
    }
    rewrite(str, options) {
      return this.recast(str, options, "rewrite");
    }
    source(str, options) {
      return this.recast(str, options, "source");
    }
    recast(str, options, type) {
      const urlRegex = /url\(['"]?(.+?)['"]?\)/gm;
      const Atruleregex = /@import\s+(url\s*?\(.{0,9999}?\)|['"].{0,9999}?['"]|.{0,9999}?)($|\s|;)/gm;
      str = new String(str).toString();
      str = str.replace(urlRegex, (match, url) => {
        const encodedUrl = type === "rewrite" ? this.ctx.rewriteUrl(url) : this.ctx.sourceUrl(url);
        return match.replace(url, encodedUrl);
      });
      str = str.replace(Atruleregex, (match, importStatement) => {
        return match.replace(
          importStatement,
          importStatement.replace(
            /^(url\(['"]?|['"]|)(.+?)(['"]|['"]?\)|)$/gm,
            (match2, firstQuote, url, endQuote) => {
              if (firstQuote.startsWith("url")) {
                return match2;
              }
              const encodedUrl = type === "rewrite" ? this.ctx.rewriteUrl(url) : this.ctx.sourceUrl(url);
              return `${firstQuote}${encodedUrl}${endQuote}`;
            }
          )
        );
      });
      return str;
    }
  };
  var css_default = CSS;

  // node_modules/meriyah/dist/meriyah.min.mjs
  var e = { 0: "Unexpected token", 30: "Unexpected token: '%0'", 1: "Octal escape sequences are not allowed in strict mode", 2: "Octal escape sequences are not allowed in template strings", 3: "\\8 and \\9 are not allowed in template strings", 4: "Private identifier #%0 is not defined", 5: "Illegal Unicode escape sequence", 6: "Invalid code point %0", 7: "Invalid hexadecimal escape sequence", 9: "Octal literals are not allowed in strict mode", 8: "Decimal integer literals with a leading zero are forbidden in strict mode", 10: "Expected number in radix %0", 151: "Invalid left-hand side assignment to a destructible right-hand side", 11: "Non-number found after exponent indicator", 12: "Invalid BigIntLiteral", 13: "No identifiers allowed directly after numeric literal", 14: "Escapes \\8 or \\9 are not syntactically valid escapes", 15: "Escapes \\8 or \\9 are not allowed in strict mode", 16: "Unterminated string literal", 17: "Unterminated template literal", 18: "Multiline comment was not closed properly", 19: "The identifier contained dynamic unicode escape that was not closed", 20: "Illegal character '%0'", 21: "Missing hexadecimal digits", 22: "Invalid implicit octal", 23: "Invalid line break in string literal", 24: "Only unicode escapes are legal in identifier names", 25: "Expected '%0'", 26: "Invalid left-hand side in assignment", 27: "Invalid left-hand side in async arrow", 28: 'Calls to super must be in the "constructor" method of a class expression or class declaration that has a superclass', 29: "Member access on super must be in a method", 31: "Await expression not allowed in formal parameter", 32: "Yield expression not allowed in formal parameter", 95: "Unexpected token: 'escaped keyword'", 33: "Unary expressions as the left operand of an exponentiation expression must be disambiguated with parentheses", 123: "Async functions can only be declared at the top level or inside a block", 34: "Unterminated regular expression", 35: "Unexpected regular expression flag", 36: "Duplicate regular expression flag '%0'", 37: "%0 functions must have exactly %1 argument%2", 38: "Setter function argument must not be a rest parameter", 39: "%0 declaration must have a name in this context", 40: "Function name may not contain any reserved words or be eval or arguments in strict mode", 41: "The rest operator is missing an argument", 42: "A getter cannot be a generator", 43: "A setter cannot be a generator", 44: "A computed property name must be followed by a colon or paren", 134: "Object literal keys that are strings or numbers must be a method or have a colon", 46: "Found `* async x(){}` but this should be `async * x(){}`", 45: "Getters and setters can not be generators", 47: "'%0' can not be generator method", 48: "No line break is allowed after '=>'", 49: "The left-hand side of the arrow can only be destructed through assignment", 50: "The binding declaration is not destructible", 51: "Async arrow can not be followed by new expression", 52: "Classes may not have a static property named 'prototype'", 53: "Class constructor may not be a %0", 54: "Duplicate constructor method in class", 55: "Invalid increment/decrement operand", 56: "Invalid use of `new` keyword on an increment/decrement expression", 57: "`=>` is an invalid assignment target", 58: "Rest element may not have a trailing comma", 59: "Missing initializer in %0 declaration", 60: "'for-%0' loop head declarations can not have an initializer", 61: "Invalid left-hand side in for-%0 loop: Must have a single binding", 62: "Invalid shorthand property initializer", 63: "Property name __proto__ appears more than once in object literal", 64: "Let is disallowed as a lexically bound name", 65: "Invalid use of '%0' inside new expression", 66: "Illegal 'use strict' directive in function with non-simple parameter list", 67: 'Identifier "let" disallowed as left-hand side expression in strict mode', 68: "Illegal continue statement", 69: "Illegal break statement", 70: "Cannot have `let[...]` as a var name in strict mode", 71: "Invalid destructuring assignment target", 72: "Rest parameter may not have a default initializer", 73: "The rest argument must the be last parameter", 74: "Invalid rest argument", 76: "In strict mode code, functions can only be declared at top level or inside a block", 77: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement", 78: "Without web compatibility enabled functions can not be declared at top level, inside a block, or as the body of an if statement", 79: "Class declaration can't appear in single-statement context", 80: "Invalid left-hand side in for-%0", 81: "Invalid assignment in for-%0", 82: "for await (... of ...) is only valid in async functions and async generators", 83: "The first token after the template expression should be a continuation of the template", 85: "`let` declaration not allowed here and `let` cannot be a regular var name in strict mode", 84: "`let \n [` is a restricted production at the start of a statement", 86: "Catch clause requires exactly one parameter, not more (and no trailing comma)", 87: "Catch clause parameter does not support default values", 88: "Missing catch or finally after try", 89: "More than one default clause in switch statement", 90: "Illegal newline after throw", 91: "Strict mode code may not include a with statement", 92: "Illegal return statement", 93: "The left hand side of the for-header binding declaration is not destructible", 94: "new.target only allowed within functions or static blocks", 96: "'#' not followed by identifier", 102: "Invalid keyword", 101: "Can not use 'let' as a class name", 100: "'A lexical declaration can't define a 'let' binding", 99: "Can not use `let` as variable name in strict mode", 97: "'%0' may not be used as an identifier in this context", 98: "Await is only valid in async functions", 103: "The %0 keyword can only be used with the module goal", 104: "Unicode codepoint must not be greater than 0x10FFFF", 105: "%0 source must be string", 106: "Only a identifier or string can be used to indicate alias", 107: "Only '*' or '{...}' can be imported after default", 108: "Trailing decorator may be followed by method", 109: "Decorators can't be used with a constructor", 110: "Can not use `await` as identifier in module or async func", 111: "Can not use `await` as identifier in module", 112: "HTML comments are only allowed with web compatibility (Annex B)", 113: "The identifier 'let' must not be in expression position in strict mode", 114: "Cannot assign to `eval` and `arguments` in strict mode", 115: "The left-hand side of a for-of loop may not start with 'let'", 116: "Block body arrows can not be immediately invoked without a group", 117: "Block body arrows can not be immediately accessed without a group", 118: "Unexpected strict mode reserved word", 119: "Unexpected eval or arguments in strict mode", 120: "Decorators must not be followed by a semicolon", 121: "Calling delete on expression not allowed in strict mode", 122: "Pattern can not have a tail", 124: "Can not have a `yield` expression on the left side of a ternary", 125: "An arrow function can not have a postfix update operator", 126: "Invalid object literal key character after generator star", 127: "Private fields can not be deleted", 129: "Classes may not have a field called constructor", 128: "Classes may not have a private element named constructor", 130: "A class field initializer or static block may not contain arguments", 131: "Generators can only be declared at the top level or inside a block", 132: "Async methods are a restricted production and cannot have a newline following it", 133: "Unexpected character after object literal property name", 135: "Invalid key token", 136: "Label '%0' has already been declared", 137: "continue statement must be nested within an iteration statement", 138: "Undefined label '%0'", 139: "Trailing comma is disallowed inside import(...) arguments", 140: "Invalid binding in JSON import", 141: "import() requires exactly one argument", 142: "Cannot use new with import(...)", 143: "... is not allowed in import()", 144: "Expected '=>'", 145: "Duplicate binding '%0'", 146: "Duplicate private identifier #%0", 147: "Cannot export a duplicate name '%0'", 150: "Duplicate %0 for-binding", 148: "Exported binding '%0' needs to refer to a top-level declared variable", 149: "Unexpected private field", 153: "Numeric separators are not allowed at the end of numeric literals", 152: "Only one underscore is allowed as numeric separator", 154: "JSX value should be either an expression or a quoted JSX text", 155: "Expected corresponding JSX closing tag for %0", 156: "Adjacent JSX elements must be wrapped in an enclosing tag", 157: "JSX attributes must only be assigned a non-empty 'expression'", 158: "'%0' has already been declared", 159: "'%0' shadowed a catch clause binding", 160: "Dot property must be an identifier", 161: "Encountered invalid input after spread/rest argument", 162: "Catch without try", 163: "Finally without try", 164: "Expected corresponding closing tag for JSX fragment", 165: "Coalescing and logical operators used together in the same expression must be disambiguated with parentheses", 166: "Invalid tagged template on optional chain", 167: "Invalid optional chain from super property", 168: "Invalid optional chain from new expression", 169: 'Cannot use "import.meta" outside a module', 170: "Leading decorators must be attached to a class declaration", 171: "An export name cannot include a lone surrogate, found %0", 172: "A string literal cannot be used as an exported binding without `from`", 173: "Private fields can't be accessed on super", 174: "The only valid meta property for import is 'import.meta'", 175: "'import.meta' must not contain escaped characters", 176: 'cannot use "await" as identifier inside an async function', 177: 'cannot use "await" in static blocks' };
  var n = class extends SyntaxError {
    constructor(n3, t3, o3, r3, a3, i3, s3, ...l3) {
      const c3 = "[" + t3 + ":" + o3 + "-" + a3 + ":" + i3 + "]: " + e[s3].replace(/%(\d+)/g, (e2, n4) => l3[n4]);
      super(`${c3}`), this.start = n3, this.end = r3, this.range = [n3, r3], this.loc = { start: { line: t3, column: o3 }, end: { line: a3, column: i3 } }, this.description = c3;
    }
  };
  function t(e2, t3, ...o3) {
    throw new n(e2.tokenIndex, e2.tokenLine, e2.tokenColumn, e2.index, e2.line, e2.column, t3, ...o3);
  }
  function o(e2) {
    throw new n(e2.tokenIndex, e2.tokenLine, e2.tokenColumn, e2.index, e2.line, e2.column, e2.type, ...e2.params);
  }
  function r(e2, t3, o3, r3, a3, i3, s3, ...l3) {
    throw new n(e2, t3, o3, r3, a3, i3, s3, ...l3);
  }
  function a(e2, t3, o3, r3, a3, i3, s3) {
    throw new n(e2, t3, o3, r3, a3, i3, s3);
  }
  function i(e2) {
    return !!(1 & s[34816 + (e2 >>> 5)] >>> e2);
  }
  var s = ((e2, n3) => {
    const t3 = new Uint32Array(104448);
    let o3 = 0, r3 = 0;
    for (; o3 < 3822; ) {
      const a3 = e2[o3++];
      if (a3 < 0) r3 -= a3;
      else {
        let i3 = e2[o3++];
        2 & a3 && (i3 = n3[i3]), 1 & a3 ? t3.fill(i3, r3, r3 += e2[o3++]) : t3[r3++] = i3;
      }
    }
    return t3;
  })([-1, 2, 26, 2, 27, 2, 5, -1, 0, 77595648, 3, 44, 2, 3, 0, 14, 2, 63, 2, 64, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 41, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 16, 2, 65, 2, 0, 0, 4294836735, 0, 3221225471, 0, 4294901942, 2, 66, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 18, 2, 0, 0, 4294961151, 3, 0, 2, 2, 19, 2, 0, 0, 608174079, 2, 0, 2, 60, 2, 7, 2, 6, 0, 4286611199, 3, 0, 2, 2, 1, 3, 0, 3, 0, 4294901711, 2, 40, 0, 4089839103, 0, 2961209759, 0, 1342439375, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2967484831, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 203, 2, 3, 0, 4093640191, 0, 660618719, 0, 65487, 0, 4294828015, 0, 4092591615, 0, 1616920031, 0, 982991, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247022, 2, 71, 0, 4284449919, 0, 851904, 2, 4, 2, 12, 0, 67076095, -1, 2, 72, 0, 1073741743, 0, 4093607775, -1, 0, 50331649, 0, 3265266687, 2, 33, 0, 4294844415, 0, 4278190047, 2, 20, 2, 137, -1, 3, 0, 2, 2, 23, 2, 0, 2, 10, 2, 0, 2, 15, 2, 22, 3, 0, 10, 2, 74, 2, 0, 2, 75, 2, 76, 2, 77, 2, 0, 2, 78, 2, 0, 2, 11, 0, 261632, 2, 25, 3, 0, 2, 2, 13, 2, 4, 3, 0, 18, 2, 79, 2, 5, 3, 0, 2, 2, 80, 0, 2151677951, 2, 29, 2, 9, 0, 909311, 3, 0, 2, 0, 814743551, 2, 49, 0, 67090432, 3, 0, 2, 2, 42, 2, 0, 2, 6, 2, 0, 2, 30, 2, 8, 0, 268374015, 2, 110, 2, 51, 2, 0, 2, 81, 0, 134153215, -1, 2, 7, 2, 0, 2, 8, 0, 2684354559, 0, 67044351, 0, 3221160064, 2, 17, -1, 3, 0, 2, 2, 53, 0, 1046528, 3, 0, 3, 2, 9, 2, 0, 2, 54, 0, 4294960127, 2, 10, 2, 6, 2, 11, 0, 4294377472, 2, 12, 3, 0, 16, 2, 13, 2, 0, 2, 82, 2, 10, 2, 0, 2, 83, 2, 84, 2, 85, 2, 210, 2, 55, 0, 1048577, 2, 86, 2, 14, -1, 2, 14, 0, 131042, 2, 87, 2, 88, 2, 89, 2, 0, 2, 34, -83, 3, 0, 7, 0, 1046559, 2, 0, 2, 15, 2, 0, 0, 2147516671, 2, 21, 3, 90, 2, 2, 0, -16, 2, 91, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 3, 0, 2, 2, 28, 2, 16, 3, 0, 2, 2, 17, 2, 0, -1, 2, 18, -16, 3, 0, 206, -2, 3, 0, 692, 2, 73, -1, 2, 18, 2, 10, 3, 0, 8, 2, 93, 2, 133, 2, 0, 0, 3220242431, 3, 0, 3, 2, 19, 2, 94, 2, 95, 3, 0, 2, 2, 96, 2, 0, 2, 97, 2, 46, 2, 0, 0, 4351, 2, 0, 2, 9, 3, 0, 2, 0, 67043391, 0, 3909091327, 2, 0, 2, 24, 2, 9, 2, 20, 3, 0, 2, 0, 67076097, 2, 8, 2, 0, 2, 21, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 101, 2, 102, 2, 22, 2, 23, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 103, 2, 104, 2, 7, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 32, -1, 0, 3774349439, 2, 105, 2, 106, 3, 0, 2, 2, 19, 2, 107, 3, 0, 10, 2, 10, 2, 18, 2, 0, 2, 47, 2, 0, 2, 31, 2, 108, 2, 25, 0, 1638399, 2, 183, 2, 109, 3, 0, 3, 2, 20, 2, 26, 2, 27, 2, 5, 2, 28, 2, 0, 2, 8, 2, 111, -1, 2, 112, 2, 113, 2, 114, -1, 3, 0, 3, 2, 12, -2, 2, 0, 2, 29, -3, 2, 163, -4, 2, 20, 2, 0, 2, 36, 0, 1, 2, 0, 2, 67, 2, 6, 2, 12, 2, 10, 2, 0, 2, 115, -1, 3, 0, 4, 2, 10, 2, 23, 2, 116, 2, 7, 2, 0, 2, 117, 2, 0, 2, 118, 2, 119, 2, 120, 2, 0, 2, 9, 3, 0, 9, 2, 21, 2, 30, 2, 31, 2, 121, 2, 122, -2, 2, 123, 2, 124, 2, 30, 2, 21, 2, 8, -2, 2, 125, 2, 30, 2, 32, -2, 2, 0, 2, 39, -2, 0, 4277137519, 0, 2269118463, -1, 3, 20, 2, -1, 2, 33, 2, 38, 2, 0, 3, 30, 2, 2, 35, 2, 19, -3, 3, 0, 2, 2, 34, -1, 2, 0, 2, 35, 2, 0, 2, 35, 2, 0, 2, 48, 2, 0, 0, 4294950463, 2, 37, -7, 2, 0, 0, 203775, 2, 57, 2, 167, 2, 20, 2, 43, 2, 36, 2, 18, 2, 37, 2, 18, 2, 126, 2, 21, 3, 0, 2, 2, 38, 0, 2151677888, 2, 0, 2, 12, 0, 4294901764, 2, 144, 2, 0, 2, 58, 2, 56, 0, 5242879, 3, 0, 2, 0, 402644511, -1, 2, 128, 2, 39, 0, 3, -1, 2, 129, 2, 130, 2, 0, 0, 67045375, 2, 40, 0, 4226678271, 0, 3766565279, 0, 2039759, 2, 132, 2, 41, 0, 1046437, 0, 6, 3, 0, 2, 0, 3288270847, 0, 3, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 42, 2, 23, 2, 50, 2, 11, 2, 61, 2, 38, -5, 2, 0, 2, 12, -3, 3, 0, 2, 0, 2147484671, 2, 134, 0, 4190109695, 2, 52, -2, 2, 135, 0, 4244635647, 0, 27, 2, 0, 2, 8, 2, 43, 2, 0, 2, 68, 2, 18, 2, 0, 2, 42, -6, 2, 0, 2, 45, 2, 59, 2, 44, 2, 45, 2, 46, 2, 47, 0, 8388351, -2, 2, 136, 0, 3028287487, 2, 48, 2, 138, 0, 33259519, 2, 49, -9, 2, 21, 0, 4294836223, 0, 3355443199, 0, 134152199, -2, 2, 69, -2, 3, 0, 28, 2, 32, -3, 3, 0, 3, 2, 17, 3, 0, 6, 2, 50, -81, 2, 18, 3, 0, 2, 2, 36, 3, 0, 33, 2, 25, 2, 30, 3, 0, 124, 2, 12, 3, 0, 18, 2, 38, -213, 2, 0, 2, 32, -54, 3, 0, 17, 2, 42, 2, 8, 2, 23, 2, 0, 2, 8, 2, 23, 2, 51, 2, 0, 2, 21, 2, 52, 2, 139, 2, 25, -13, 2, 0, 2, 53, -6, 3, 0, 2, -4, 3, 0, 2, 0, 4294936575, 2, 0, 0, 4294934783, -2, 0, 196635, 3, 0, 191, 2, 54, 3, 0, 38, 2, 30, 2, 55, 2, 34, -278, 2, 140, 3, 0, 9, 2, 141, 2, 142, 2, 56, 3, 0, 11, 2, 7, -72, 3, 0, 3, 2, 143, 0, 1677656575, -130, 2, 26, -16, 2, 0, 2, 24, 2, 38, -16, 0, 4161266656, 0, 4071, 2, 205, -4, 2, 57, -13, 3, 0, 2, 2, 58, 2, 0, 2, 145, 2, 146, 2, 62, 2, 0, 2, 147, 2, 148, 2, 149, 3, 0, 10, 2, 150, 2, 151, 2, 22, 3, 58, 2, 3, 152, 2, 3, 59, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 92, 2, 0, 0, 2105343, 0, 4160749584, 2, 177, -34, 2, 8, 2, 154, -6, 0, 4194303871, 0, 4294903771, 2, 0, 2, 60, 2, 100, -3, 2, 0, 0, 1073684479, 0, 17407, -9, 2, 18, 2, 17, 2, 0, 2, 32, -14, 2, 18, 2, 32, -6, 2, 18, 2, 12, -15, 2, 155, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 61, -37, 2, 62, 2, 156, 2, 157, 2, 158, 2, 159, 2, 160, -105, 2, 26, -32, 3, 0, 1335, -1, 3, 0, 129, 2, 32, 3, 0, 6, 2, 10, 3, 0, 180, 2, 161, 3, 0, 233, 2, 162, 3, 0, 18, 2, 10, -77, 3, 0, 16, 2, 10, -47, 3, 0, 154, 2, 6, 3, 0, 130, 2, 25, -22250, 3, 0, 7, 2, 25, -6130, 3, 5, 2, -1, 0, 69207040, 3, 44, 2, 3, 0, 14, 2, 63, 2, 64, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 41, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 16, 2, 65, 2, 0, 2, 34, -1, 2, 18, 2, 66, -1, 2, 0, 0, 2047, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 25, 2, 67, 3, 0, 2, 0, 131135, 2, 98, 0, 70256639, 0, 71303167, 0, 272, 2, 42, 2, 6, 0, 32511, 2, 0, 2, 49, -1, 2, 99, 2, 68, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 70, 2, 69, 0, 33554435, 2, 131, 2, 70, 2, 164, 0, 131075, 0, 3594373096, 0, 67094296, 2, 69, -1, 0, 4294828e3, 0, 603979263, 0, 654311424, 0, 3, 0, 4294828001, 0, 602930687, 2, 171, 0, 393219, 0, 4294828016, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 71, 2, 38, -1, 2, 4, 0, 917503, 2, 38, -1, 2, 72, 0, 537788335, 0, 4026531935, -1, 0, 1, -1, 2, 33, 2, 73, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 15, 2, 22, 3, 0, 10, 2, 74, 2, 0, 2, 75, 2, 76, 2, 77, 2, 0, 2, 78, 2, 0, 2, 12, -1, 2, 25, 3, 0, 2, 2, 13, 2, 4, 3, 0, 18, 2, 79, 2, 5, 3, 0, 2, 2, 80, 0, 2147745791, 3, 19, 2, 0, 122879, 2, 0, 2, 9, 0, 276824064, -2, 3, 0, 2, 2, 42, 2, 0, 0, 4294903295, 2, 0, 2, 30, 2, 8, -1, 2, 18, 2, 51, 2, 0, 2, 81, 2, 49, -1, 2, 21, 2, 0, 2, 29, -2, 0, 128, -2, 2, 28, 2, 9, 0, 8160, -1, 2, 127, 0, 4227907585, 2, 0, 2, 37, 2, 0, 2, 50, 2, 184, 2, 10, 2, 6, 2, 11, -1, 0, 74440192, 3, 0, 6, -2, 3, 0, 8, 2, 13, 2, 0, 2, 82, 2, 10, 2, 0, 2, 83, 2, 84, 2, 85, -3, 2, 86, 2, 14, -3, 2, 87, 2, 88, 2, 89, 2, 0, 2, 34, -83, 3, 0, 7, 0, 817183, 2, 0, 2, 15, 2, 0, 0, 33023, 2, 21, 3, 90, 2, -17, 2, 91, 0, 524157950, 2, 4, 2, 0, 2, 92, 2, 4, 2, 0, 2, 22, 2, 28, 2, 16, 3, 0, 2, 2, 17, 2, 0, -1, 2, 18, -16, 3, 0, 206, -2, 3, 0, 692, 2, 73, -1, 2, 18, 2, 10, 3, 0, 8, 2, 93, 0, 3072, 2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 25, 2, 94, 2, 95, 3, 0, 2, 2, 96, 2, 0, 2, 97, 2, 46, 0, 4294965179, 0, 7, 2, 0, 2, 9, 2, 95, 2, 9, -1, 0, 1761345536, 2, 98, 0, 4294901823, 2, 38, 2, 20, 2, 99, 2, 35, 2, 100, 0, 2080440287, 2, 0, 2, 34, 2, 153, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 101, 2, 102, 2, 22, 2, 23, 3, 0, 3, 0, 7, 3, 0, 349, 2, 103, 2, 104, 2, 7, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 32, -1, 0, 2700607615, 2, 105, 2, 106, 3, 0, 2, 2, 19, 2, 107, 3, 0, 10, 2, 10, 2, 18, 2, 0, 2, 47, 2, 0, 2, 31, 2, 108, -3, 2, 109, 3, 0, 3, 2, 20, -1, 3, 5, 2, 2, 110, 2, 0, 2, 8, 2, 111, -1, 2, 112, 2, 113, 2, 114, -1, 3, 0, 3, 2, 12, -2, 2, 0, 2, 29, -8, 2, 20, 2, 0, 2, 36, -1, 2, 0, 2, 67, 2, 6, 2, 30, 2, 10, 2, 0, 2, 115, -1, 3, 0, 4, 2, 10, 2, 18, 2, 116, 2, 7, 2, 0, 2, 117, 2, 0, 2, 118, 2, 119, 2, 120, 2, 0, 2, 9, 3, 0, 9, 2, 21, 2, 30, 2, 31, 2, 121, 2, 122, -2, 2, 123, 2, 124, 2, 30, 2, 21, 2, 8, -2, 2, 125, 2, 30, 2, 32, -2, 2, 0, 2, 39, -2, 0, 4277075969, 2, 30, -1, 3, 20, 2, -1, 2, 33, 2, 126, 2, 0, 3, 30, 2, 2, 35, 2, 19, -3, 3, 0, 2, 2, 34, -1, 2, 0, 2, 35, 2, 0, 2, 35, 2, 0, 2, 50, 2, 98, 0, 4294934591, 2, 37, -7, 2, 0, 0, 197631, 2, 57, -1, 2, 20, 2, 43, 2, 37, 2, 18, 0, 3, 2, 18, 2, 126, 2, 21, 2, 127, 2, 54, -1, 0, 2490368, 2, 127, 2, 25, 2, 18, 2, 34, 2, 127, 2, 38, 0, 4294901904, 0, 4718591, 2, 127, 2, 35, 0, 335544350, -1, 2, 128, 0, 2147487743, 0, 1, -1, 2, 129, 2, 130, 2, 8, -1, 2, 131, 2, 70, 0, 3758161920, 0, 3, 2, 132, 0, 12582911, 0, 655360, -1, 2, 0, 2, 29, 0, 2147485568, 0, 3, 2, 0, 2, 25, 0, 176, -5, 2, 0, 2, 17, 2, 192, -1, 2, 0, 2, 25, 2, 209, -1, 2, 0, 0, 16779263, -2, 2, 12, -1, 2, 38, -5, 2, 0, 2, 133, -3, 3, 0, 2, 2, 55, 2, 134, 0, 2147549183, 0, 2, -2, 2, 135, 2, 36, 0, 10, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 536871935, 2, 18, 2, 0, 2, 42, -6, 2, 0, 0, 1, 2, 59, 2, 17, 0, 1, 2, 46, 2, 25, -3, 2, 136, 2, 36, 2, 137, 2, 138, 0, 16778239, -10, 2, 35, 0, 4294836212, 2, 9, -3, 2, 69, -2, 3, 0, 28, 2, 32, -3, 3, 0, 3, 2, 17, 3, 0, 6, 2, 50, -81, 2, 18, 3, 0, 2, 2, 36, 3, 0, 33, 2, 25, 0, 126, 3, 0, 124, 2, 12, 3, 0, 18, 2, 38, -213, 2, 10, -55, 3, 0, 17, 2, 42, 2, 8, 2, 18, 2, 0, 2, 8, 2, 18, 2, 60, 2, 0, 2, 25, 2, 50, 2, 139, 2, 25, -13, 2, 0, 2, 73, -6, 3, 0, 2, -4, 3, 0, 2, 0, 67583, -1, 2, 107, -2, 0, 11, 3, 0, 191, 2, 54, 3, 0, 38, 2, 30, 2, 55, 2, 34, -278, 2, 140, 3, 0, 9, 2, 141, 2, 142, 2, 56, 3, 0, 11, 2, 7, -72, 3, 0, 3, 2, 143, 2, 144, -187, 3, 0, 2, 2, 58, 2, 0, 2, 145, 2, 146, 2, 62, 2, 0, 2, 147, 2, 148, 2, 149, 3, 0, 10, 2, 150, 2, 151, 2, 22, 3, 58, 2, 3, 152, 2, 3, 59, 2, 2, 153, -57, 2, 8, 2, 154, -7, 2, 18, 2, 0, 2, 60, -4, 2, 0, 0, 1065361407, 0, 16384, -9, 2, 18, 2, 60, 2, 0, 2, 133, -14, 2, 18, 2, 133, -6, 2, 18, 0, 81919, -15, 2, 155, 3, 0, 6, 2, 126, -1, 3, 0, 2, 0, 2063, -37, 2, 62, 2, 156, 2, 157, 2, 158, 2, 159, 2, 160, -138, 3, 0, 1335, -1, 3, 0, 129, 2, 32, 3, 0, 6, 2, 10, 3, 0, 180, 2, 161, 3, 0, 233, 2, 162, 3, 0, 18, 2, 10, -77, 3, 0, 16, 2, 10, -47, 3, 0, 154, 2, 6, 3, 0, 130, 2, 25, -28386, 2, 0, 0, 1, -1, 2, 55, 2, 0, 0, 8193, -21, 2, 201, 0, 10255, 0, 4, -11, 2, 69, 2, 182, -1, 0, 71680, -1, 2, 174, 0, 4292900864, 0, 268435519, -5, 2, 163, -1, 2, 173, -1, 0, 6144, -2, 2, 46, -1, 2, 168, -1, 0, 2147532800, 2, 164, 2, 170, 0, 8355840, -2, 0, 4, -4, 2, 198, 0, 205128192, 0, 1333757536, 0, 2147483696, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4286578751, 0, 278545, 2, 165, 0, 4294886464, 0, 33292336, 0, 417809, 2, 165, 0, 1327482464, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 166, 0, 201327104, 0, 3634348576, 0, 8323120, 2, 166, 0, 202375680, 0, 2678047264, 0, 4293984304, 2, 166, -1, 0, 983584, 0, 48, 0, 58720273, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 2, 213, 2, 167, 2, 0, 0, 2089, 0, 3221225552, 0, 201359520, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 163, 0, 4160757760, 2, 0, -6, 2, 179, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 2, 168, 2, 186, 2, 187, -2, 2, 175, -20, 0, 3758096385, -2, 2, 169, 2, 195, 2, 94, 2, 180, 0, 4294057984, -2, 2, 176, 2, 172, 0, 4227874816, -2, 2, 169, -1, 2, 170, -1, 2, 181, 2, 55, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 178, 0, 939588608, -1, 0, 805306368, -1, 2, 55, 2, 171, 2, 172, 2, 173, 2, 211, 2, 0, -2, 0, 8192, -4, 0, 267386880, -1, 0, 117440512, 0, 7168, -1, 2, 170, 2, 168, 2, 174, 2, 188, -16, 2, 175, -1, 0, 1426112704, 2, 176, -1, 2, 196, 0, 271581216, 0, 2149777408, 2, 25, 2, 174, 2, 55, 0, 851967, 2, 189, -1, 2, 177, 2, 190, -4, 2, 178, -20, 2, 98, 2, 208, -56, 0, 3145728, 2, 191, -10, 0, 32505856, -1, 2, 179, -1, 0, 2147385088, 2, 94, 1, 2155905152, 2, -3, 2, 176, 2, 0, 0, 67108864, -2, 2, 180, -6, 2, 181, 2, 25, 0, 1, -1, 0, 1, -1, 2, 182, -3, 2, 126, 2, 69, -2, 2, 100, -2, 0, 32704, 2, 55, -915, 2, 183, -1, 2, 207, -10, 2, 194, -5, 2, 185, -6, 0, 3759456256, 2, 19, -1, 2, 184, -1, 2, 185, -2, 0, 4227874752, -3, 0, 2146435072, 2, 186, -2, 0, 1006649344, 2, 55, -1, 2, 94, 0, 201375744, -3, 0, 134217720, 2, 94, 0, 4286677377, 0, 32896, -1, 2, 178, -3, 0, 4227907584, -349, 0, 65520, 0, 1920, 2, 167, 3, 0, 264, -11, 2, 173, -2, 2, 187, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524280, -13, 2, 193, -1, 0, 4294934272, 2, 25, 2, 187, -1, 2, 215, 0, 2158720, -3, 2, 186, 0, 1, -4, 2, 55, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 188, 0, 120, 0, 7340032, -2, 2, 189, 2, 4, 2, 25, 2, 176, 3, 0, 4, 2, 186, -1, 2, 190, 2, 167, -1, 0, 8176, 2, 170, 2, 188, 0, 1073741824, -1, 0, 4290773232, 2, 0, -4, 2, 176, 2, 197, 0, 15728640, 2, 167, -1, 2, 174, -1, 0, 134250480, 0, 4720640, 0, 3825467396, -1, 2, 180, -9, 2, 94, 2, 181, 0, 4294967040, 2, 137, 0, 4160880640, 3, 0, 2, 0, 704, 0, 1849688064, 2, 191, -1, 2, 55, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 2, 212, 3, 0, 2, -1, 2, 192, 2, 193, -1, 0, 17829776, 0, 2025848832, 0, 4261477888, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 200, 0, 16252928, 0, 3791388672, 2, 130, 3, 0, 2, -2, 2, 206, 2, 0, -1, 2, 107, -1, 0, 66584576, -1, 2, 199, -1, 0, 448, 0, 4294918080, 3, 0, 6, 2, 55, -1, 0, 4294755328, 0, 4294967267, 2, 7, -1, 2, 174, 2, 187, 2, 25, 2, 98, 2, 25, 2, 194, 2, 94, -2, 0, 245760, 2, 195, -1, 2, 163, 2, 202, 0, 4227923456, -1, 2, 196, 2, 174, 2, 94, -3, 0, 4292870145, 0, 262144, -1, 2, 95, 2, 0, 0, 1073758848, 2, 197, -1, 0, 4227921920, 2, 198, 0, 68289024, 0, 528402016, 0, 4292927536, 0, 46080, 2, 191, 0, 4265609306, 0, 4294967289, -2, 0, 268435456, 2, 95, -2, 2, 199, 3, 0, 5, -1, 2, 200, 2, 176, 2, 0, -2, 0, 4227923936, 2, 67, -1, 2, 187, 2, 197, 2, 99, 2, 168, 2, 178, 2, 204, 3, 0, 5, -1, 2, 167, 3, 0, 3, -2, 0, 2146959360, 0, 9440640, 0, 104857600, 0, 4227923840, 3, 0, 2, 0, 768, 2, 201, 2, 28, -2, 2, 174, -2, 2, 202, -1, 2, 169, 2, 98, 3, 0, 5, -1, 0, 4227923964, 0, 512, 0, 8388608, 2, 203, 2, 183, 2, 193, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 199, 0, 576, 0, 4261707776, 2, 98, 3, 0, 9, 2, 169, 0, 131072, 0, 939524096, 2, 188, 3, 0, 2, 2, 16, -1, 0, 2147221504, -28, 2, 187, 3, 0, 3, -3, 0, 4292902912, -6, 2, 99, 3, 0, 81, 2, 25, -2, 2, 107, -33, 2, 18, 2, 181, -124, 2, 188, -18, 2, 204, 3, 0, 213, -1, 2, 187, 3, 0, 54, -17, 2, 169, 2, 55, 2, 205, -1, 2, 55, 2, 197, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 18, 3, 0, 13, -1, 2, 187, 3, 0, 6, -2, 2, 188, 3, 0, 3, -2, 0, 30720, -1, 0, 32512, 3, 0, 2, 0, 4294770656, -191, 2, 185, -38, 2, 181, 2, 8, 2, 206, 3, 0, 278, 0, 2417033215, -9, 0, 4294705144, 0, 4292411391, 0, 65295, -11, 2, 167, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 123, -7, 2, 187, -13, 2, 180, 3, 0, 2, -1, 2, 173, 2, 207, -3, 2, 99, 2, 0, -7, 2, 181, -1, 0, 384, -1, 0, 133693440, -3, 2, 208, -2, 2, 110, 3, 0, 3, 3, 180, 2, -2, 2, 94, 2, 169, 3, 0, 4, -2, 2, 196, -1, 2, 163, 0, 335552923, 2, 209, -1, 0, 538974272, 0, 2214592512, 0, 132e3, -10, 0, 192, -8, 2, 210, -21, 0, 134213632, 2, 162, 3, 0, 34, 2, 55, 0, 4294965279, 3, 0, 6, 0, 100663424, 0, 63524, -1, 2, 214, 2, 152, 3, 0, 3, -1, 0, 3221282816, 0, 4294917120, 3, 0, 9, 2, 25, 2, 211, -1, 2, 212, 3, 0, 14, 2, 25, 2, 187, 3, 0, 6, 2, 25, 2, 213, 3, 0, 15, 0, 2147520640, -6, 0, 4286578784, 2, 0, -2, 0, 1006694400, 3, 0, 24, 2, 36, -1, 0, 4292870144, 3, 0, 2, 0, 1, 2, 176, 3, 0, 6, 2, 209, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 47, 3, 0, 8, -1, 2, 178, -2, 2, 180, 0, 98304, 0, 65537, 2, 181, -5, 2, 214, 2, 0, 2, 37, 2, 202, 2, 167, 0, 4294770176, 2, 110, 3, 0, 4, -30, 2, 192, 0, 3758153728, -3, 0, 125829120, -2, 2, 187, 0, 4294897664, 2, 178, -1, 2, 199, -1, 2, 174, 0, 4026580992, 2, 95, 2, 0, -10, 2, 180, 0, 3758145536, 0, 31744, -1, 0, 1610628992, 0, 4261477376, -4, 2, 215, -2, 2, 187, 3, 0, 32, -1335, 2, 0, -129, 2, 187, -6, 2, 176, -180, 0, 65532, -233, 2, 177, -18, 2, 176, 3, 0, 77, -16, 2, 176, 3, 0, 47, -154, 2, 170, -130, 2, 18, 3, 0, 22250, -7, 2, 18, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828031, 4294967294, 134217726, 4294903807, 268435455, 2147483647, 1048575, 1073741823, 3892314111, 134217727, 1061158911, 536805376, 4294910143, 4294901759, 32767, 4294901760, 262143, 536870911, 8388607, 4160749567, 4294902783, 4294918143, 65535, 67043328, 2281701374, 4294967264, 2097151, 4194303, 255, 67108863, 4294967039, 511, 524287, 131071, 63, 127, 3238002687, 4294549487, 4290772991, 33554431, 4294901888, 4286578687, 67043329, 4294705152, 4294770687, 67043583, 1023, 15, 2047999, 67043343, 67051519, 16777215, 2147483648, 4294902e3, 28, 4292870143, 4294966783, 16383, 67047423, 4294967279, 262083, 20511, 41943039, 493567, 4294959104, 603979775, 65536, 602799615, 805044223, 4294965206, 8191, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294909951, 4286578688, 4294967292, 4294965759, 535511039, 4294966272, 4294967280, 32768, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008, 268369920, 4292804608, 4294967232, 486341884, 4294963199, 3087007615, 1073692671, 4128527, 4279238655, 4294902015, 4160684047, 4290246655, 469499899, 4294967231, 134086655, 4294966591, 2445279231, 3670015, 31, 4294967288, 4294705151, 3221208447, 4294902271, 4294549472, 4294921215, 4095, 4285526655, 4294966527, 4294966143, 64, 4294966719, 3774873592, 1877934080, 262151, 2555904, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4294934527, 4087, 2016, 2147446655, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 4294901761, 536870912, 2952790016, 202506752, 139264, 4026531840, 402653184, 4261412864, 63488, 1610612736, 4227922944, 49152, 65280, 3233808384, 3221225472, 65534, 61440, 57152, 4293918720, 4290772992, 25165824, 57344, 4227915776, 4278190080, 3758096384, 4227858432, 4160749568, 3758129152, 4294836224, 4194304, 251658240, 196608, 4294963200, 2143289344, 2097152, 64512, 417808, 4227923712, 12582912, 50331648, 65528, 65472, 4294967168, 15360, 4294966784, 65408, 4294965248, 16, 12288, 4294934528, 2080374784, 2013265920, 4294950912, 524288]);
  function l(e2) {
    return e2.column++, e2.currentChar = e2.source.charCodeAt(++e2.index);
  }
  function c(e2) {
    const n3 = e2.currentChar;
    if (55296 != (64512 & n3)) return 0;
    const t3 = e2.source.charCodeAt(e2.index + 1);
    return 56320 != (64512 & t3) ? 0 : 65536 + ((1023 & n3) << 10) + (1023 & t3);
  }
  function u(e2, n3) {
    e2.currentChar = e2.source.charCodeAt(++e2.index), e2.flags |= 1, 4 & n3 || (e2.column = 0, e2.line++);
  }
  function d(e2) {
    e2.flags |= 1, e2.currentChar = e2.source.charCodeAt(++e2.index), e2.column = 0, e2.line++;
  }
  function g(e2) {
    return e2 < 65 ? e2 - 48 : e2 - 65 + 10 & 15;
  }
  function k(e2) {
    switch (e2) {
      case 134283266:
        return "NumericLiteral";
      case 134283267:
        return "StringLiteral";
      case 86021:
      case 86022:
        return "BooleanLiteral";
      case 86023:
        return "NullLiteral";
      case 65540:
        return "RegularExpression";
      case 67174408:
      case 67174409:
      case 131:
        return "TemplateLiteral";
      default:
        return 143360 & ~e2 ? 4096 & ~e2 ? "Punctuator" : "Keyword" : "Identifier";
    }
  }
  var p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1032, 0, 0, 2056, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8192, 0, 3, 0, 0, 8192, 0, 0, 0, 256, 0, 33024, 0, 0, 242, 242, 114, 114, 114, 114, 114, 114, 594, 594, 0, 0, 16384, 0, 0, 0, 0, 67, 67, 67, 67, 67, 67, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 0, 0, 4099, 0, 71, 71, 71, 71, 71, 71, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 16384, 0, 0, 0, 0];
  var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
  var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
  function b(e2) {
    return e2 <= 127 ? f[e2] > 0 : i(e2);
  }
  function h(e2) {
    return e2 <= 127 ? m[e2] > 0 : function(e3) {
      return !!(1 & s[0 + (e3 >>> 5)] >>> e3);
    }(e2) || 8204 === e2 || 8205 === e2;
  }
  var x = ["SingleLine", "MultiLine", "HTMLOpen", "HTMLClose", "HashbangComment"];
  function T(e2, n3, o3, r3, a3, i3, s3, l3) {
    return 512 & r3 && t(e2, 0), y(e2, n3, o3, a3, i3, s3, l3);
  }
  function y(e2, n3, t3, o3, r3, a3, i3) {
    const { index: s3 } = e2;
    for (e2.tokenIndex = e2.index, e2.tokenLine = e2.line, e2.tokenColumn = e2.column; e2.index < e2.end; ) {
      if (8 & p[e2.currentChar]) {
        const t4 = 13 === e2.currentChar;
        d(e2), t4 && e2.index < e2.end && 10 === e2.currentChar && (e2.currentChar = n3.charCodeAt(++e2.index));
        break;
      }
      if ((8232 ^ e2.currentChar) <= 1) {
        d(e2);
        break;
      }
      l(e2), e2.tokenIndex = e2.index, e2.tokenLine = e2.line, e2.tokenColumn = e2.column;
    }
    if (e2.onComment) {
      const t4 = { start: { line: a3, column: i3 }, end: { line: e2.tokenLine, column: e2.tokenColumn } };
      e2.onComment(x[255 & o3], n3.slice(s3, e2.tokenIndex), r3, e2.tokenIndex, t4);
    }
    return 1 | t3;
  }
  function C(e2, n3, o3) {
    const { index: r3 } = e2;
    for (; e2.index < e2.end; ) if (e2.currentChar < 43) {
      let t3 = false;
      for (; 42 === e2.currentChar; ) if (t3 || (o3 &= -5, t3 = true), 47 === l(e2)) {
        if (l(e2), e2.onComment) {
          const t4 = { start: { line: e2.tokenLine, column: e2.tokenColumn }, end: { line: e2.line, column: e2.column } };
          e2.onComment(x[1], n3.slice(r3, e2.index - 2), r3 - 2, e2.index, t4);
        }
        return e2.tokenIndex = e2.index, e2.tokenLine = e2.line, e2.tokenColumn = e2.column, o3;
      }
      if (t3) continue;
      8 & p[e2.currentChar] ? 13 === e2.currentChar ? (o3 |= 5, d(e2)) : (u(e2, o3), o3 = -5 & o3 | 1) : l(e2);
    } else (8232 ^ e2.currentChar) <= 1 ? (o3 = -5 & o3 | 1, d(e2)) : (o3 &= -5, l(e2));
    t(e2, 18);
  }
  var v;
  var w;
  function L(e2, n3) {
    const o3 = e2.index;
    let r3 = v.Empty;
    e: for (; ; ) {
      const n4 = e2.currentChar;
      if (l(e2), r3 & v.Escape) r3 &= ~v.Escape;
      else switch (n4) {
        case 47:
          if (r3) break;
          break e;
        case 92:
          r3 |= v.Escape;
          break;
        case 91:
          r3 |= v.Class;
          break;
        case 93:
          r3 &= v.Escape;
      }
      if (13 !== n4 && 10 !== n4 && 8232 !== n4 && 8233 !== n4 || t(e2, 34), e2.index >= e2.source.length) return t(e2, 34);
    }
    const a3 = e2.index - 1;
    let i3 = w.Empty, s3 = e2.currentChar;
    const { index: c3 } = e2;
    for (; h(s3); ) {
      switch (s3) {
        case 103:
          i3 & w.Global && t(e2, 36, "g"), i3 |= w.Global;
          break;
        case 105:
          i3 & w.IgnoreCase && t(e2, 36, "i"), i3 |= w.IgnoreCase;
          break;
        case 109:
          i3 & w.Multiline && t(e2, 36, "m"), i3 |= w.Multiline;
          break;
        case 117:
          i3 & w.Unicode && t(e2, 36, "u"), i3 & w.UnicodeSets && t(e2, 36, "vu"), i3 |= w.Unicode;
          break;
        case 118:
          i3 & w.Unicode && t(e2, 36, "uv"), i3 & w.UnicodeSets && t(e2, 36, "v"), i3 |= w.UnicodeSets;
          break;
        case 121:
          i3 & w.Sticky && t(e2, 36, "y"), i3 |= w.Sticky;
          break;
        case 115:
          i3 & w.DotAll && t(e2, 36, "s"), i3 |= w.DotAll;
          break;
        case 100:
          i3 & w.Indices && t(e2, 36, "d"), i3 |= w.Indices;
          break;
        default:
          t(e2, 35);
      }
      s3 = l(e2);
    }
    const u2 = e2.source.slice(c3, e2.index), d2 = e2.source.slice(o3, a3);
    return e2.tokenRegExp = { pattern: d2, flags: u2 }, 128 & n3 && (e2.tokenRaw = e2.source.slice(e2.tokenIndex, e2.index)), e2.tokenValue = function(e3, n4, o4) {
      try {
        return new RegExp(n4, o4);
      } catch {
        try {
          return new RegExp(n4, o4), null;
        } catch {
          t(e3, 34);
        }
      }
    }(e2, d2, u2), 65540;
  }
  function I(e2, n3, o3) {
    const { index: r3 } = e2;
    let a3 = "", i3 = l(e2), s3 = e2.index;
    for (; !(8 & p[i3]); ) {
      if (i3 === o3) return a3 += e2.source.slice(s3, e2.index), l(e2), 128 & n3 && (e2.tokenRaw = e2.source.slice(r3, e2.index)), e2.tokenValue = a3, 134283267;
      if (!(8 & ~i3) && 92 === i3) {
        if (a3 += e2.source.slice(s3, e2.index), i3 = l(e2), i3 < 127 || 8232 === i3 || 8233 === i3) {
          const t3 = q(e2, n3, i3);
          t3 >= 0 ? a3 += String.fromCodePoint(t3) : E(e2, t3, 0);
        } else a3 += String.fromCodePoint(i3);
        s3 = e2.index + 1;
      }
      e2.index >= e2.end && t(e2, 16), i3 = l(e2);
    }
    t(e2, 16);
  }
  function q(e2, n3, t3, o3 = 0) {
    switch (t3) {
      case 98:
        return 8;
      case 102:
        return 12;
      case 114:
        return 13;
      case 110:
        return 10;
      case 116:
        return 9;
      case 118:
        return 11;
      case 13:
        if (e2.index < e2.end) {
          const n4 = e2.source.charCodeAt(e2.index + 1);
          10 === n4 && (e2.index = e2.index + 1, e2.currentChar = n4);
        }
      case 10:
      case 8232:
      case 8233:
        return e2.column = -1, e2.line++, -1;
      case 48:
      case 49:
      case 50:
      case 51: {
        let r3 = t3 - 48, a3 = e2.index + 1, i3 = e2.column + 1;
        if (a3 < e2.end) {
          const t4 = e2.source.charCodeAt(a3);
          if (32 & p[t4]) {
            if (256 & n3 || o3) return -2;
            if (e2.currentChar = t4, r3 = r3 << 3 | t4 - 48, a3++, i3++, a3 < e2.end) {
              const n4 = e2.source.charCodeAt(a3);
              32 & p[n4] && (e2.currentChar = n4, r3 = r3 << 3 | n4 - 48, a3++, i3++);
            }
            e2.flags |= 64;
          } else if (0 !== r3 || 512 & p[t4]) {
            if (256 & n3 || o3) return -2;
            e2.flags |= 64;
          }
          e2.index = a3 - 1, e2.column = i3 - 1;
        }
        return r3;
      }
      case 52:
      case 53:
      case 54:
      case 55: {
        if (o3 || 256 & n3) return -2;
        let r3 = t3 - 48;
        const a3 = e2.index + 1, i3 = e2.column + 1;
        if (a3 < e2.end) {
          const n4 = e2.source.charCodeAt(a3);
          32 & p[n4] && (r3 = r3 << 3 | n4 - 48, e2.currentChar = n4, e2.index = a3, e2.column = i3);
        }
        return e2.flags |= 64, r3;
      }
      case 120: {
        const n4 = l(e2);
        if (!(64 & p[n4])) return -4;
        const t4 = g(n4), o4 = l(e2);
        if (!(64 & p[o4])) return -4;
        return t4 << 4 | g(o4);
      }
      case 117: {
        const n4 = l(e2);
        if (123 === e2.currentChar) {
          let n5 = 0;
          for (; 64 & p[l(e2)]; ) if (n5 = n5 << 4 | g(e2.currentChar), n5 > 1114111) return -5;
          return e2.currentChar < 1 || 125 !== e2.currentChar ? -4 : n5;
        }
        {
          if (!(64 & p[n4])) return -4;
          const t4 = e2.source.charCodeAt(e2.index + 1);
          if (!(64 & p[t4])) return -4;
          const o4 = e2.source.charCodeAt(e2.index + 2);
          if (!(64 & p[o4])) return -4;
          const r3 = e2.source.charCodeAt(e2.index + 3);
          return 64 & p[r3] ? (e2.index += 3, e2.column += 3, e2.currentChar = e2.source.charCodeAt(e2.index), g(n4) << 12 | g(t4) << 8 | g(o4) << 4 | g(r3)) : -4;
        }
      }
      case 56:
      case 57:
        if (o3 || !(64 & n3) || 256 & n3) return -3;
        e2.flags |= 4096;
      default:
        return t3;
    }
  }
  function E(e2, n3, o3) {
    switch (n3) {
      case -1:
        return;
      case -2:
        t(e2, o3 ? 2 : 1);
      case -3:
        t(e2, o3 ? 3 : 14);
      case -4:
        t(e2, 7);
      case -5:
        t(e2, 104);
    }
  }
  function S(e2, n3) {
    const { index: o3 } = e2;
    let r3 = 67174409, a3 = "", i3 = l(e2);
    for (; 96 !== i3; ) {
      if (36 === i3 && 123 === e2.source.charCodeAt(e2.index + 1)) {
        l(e2), r3 = 67174408;
        break;
      }
      if (92 === i3) if (i3 = l(e2), i3 > 126) a3 += String.fromCodePoint(i3);
      else {
        const { index: t3, line: o4, column: s3 } = e2, l3 = q(e2, 256 | n3, i3, 1);
        if (l3 >= 0) a3 += String.fromCodePoint(l3);
        else {
          if (-1 !== l3 && 16384 & n3) {
            e2.index = t3, e2.line = o4, e2.column = s3, a3 = null, i3 = A(e2, i3), i3 < 0 && (r3 = 67174408);
            break;
          }
          E(e2, l3, 1);
        }
      }
      else e2.index < e2.end && (13 === i3 && 10 === e2.source.charCodeAt(e2.index) && (a3 += String.fromCodePoint(i3), e2.currentChar = e2.source.charCodeAt(++e2.index)), ((83 & i3) < 3 && 10 === i3 || (8232 ^ i3) <= 1) && (e2.column = -1, e2.line++), a3 += String.fromCodePoint(i3));
      e2.index >= e2.end && t(e2, 17), i3 = l(e2);
    }
    return l(e2), e2.tokenValue = a3, e2.tokenRaw = e2.source.slice(o3 + 1, e2.index - (67174409 === r3 ? 1 : 2)), r3;
  }
  function A(e2, n3) {
    for (; 96 !== n3; ) {
      switch (n3) {
        case 36: {
          const t3 = e2.index + 1;
          if (t3 < e2.end && 123 === e2.source.charCodeAt(t3)) return e2.index = t3, e2.column++, -n3;
          break;
        }
        case 10:
        case 8232:
        case 8233:
          e2.column = -1, e2.line++;
      }
      e2.index >= e2.end && t(e2, 17), n3 = l(e2);
    }
    return n3;
  }
  function D(e2, n3) {
    return e2.index >= e2.end && t(e2, 0), e2.index--, e2.column--, S(e2, n3);
  }
  function V(e2, n3, o3) {
    let r3 = e2.currentChar, i3 = 0, s3 = 9, c3 = 64 & o3 ? 0 : 1, u2 = 0, d2 = 0;
    if (64 & o3) i3 = "." + R(e2, r3), r3 = e2.currentChar, 110 === r3 && t(e2, 12);
    else {
      if (48 === r3) if (r3 = l(e2), 120 == (32 | r3)) {
        for (o3 = 136, r3 = l(e2); 4160 & p[r3]; ) 95 !== r3 ? (d2 = 1, i3 = 16 * i3 + g(r3), u2++, r3 = l(e2)) : (d2 || t(e2, 152), d2 = 0, r3 = l(e2));
        0 !== u2 && d2 || t(e2, 0 === u2 ? 21 : 153);
      } else if (111 == (32 | r3)) {
        for (o3 = 132, r3 = l(e2); 4128 & p[r3]; ) 95 !== r3 ? (d2 = 1, i3 = 8 * i3 + (r3 - 48), u2++, r3 = l(e2)) : (d2 || t(e2, 152), d2 = 0, r3 = l(e2));
        0 !== u2 && d2 || t(e2, 0 === u2 ? 0 : 153);
      } else if (98 == (32 | r3)) {
        for (o3 = 130, r3 = l(e2); 4224 & p[r3]; ) 95 !== r3 ? (d2 = 1, i3 = 2 * i3 + (r3 - 48), u2++, r3 = l(e2)) : (d2 || t(e2, 152), d2 = 0, r3 = l(e2));
        0 !== u2 && d2 || t(e2, 0 === u2 ? 0 : 153);
      } else if (32 & p[r3]) for (256 & n3 && t(e2, 1), o3 = 1; 16 & p[r3]; ) {
        if (512 & p[r3]) {
          o3 = 32, c3 = 0;
          break;
        }
        i3 = 8 * i3 + (r3 - 48), r3 = l(e2);
      }
      else 512 & p[r3] ? (256 & n3 && t(e2, 1), e2.flags |= 64, o3 = 32) : 95 === r3 && t(e2, 0);
      if (48 & o3) {
        if (c3) {
          for (; s3 >= 0 && 4112 & p[r3]; ) 95 !== r3 ? (d2 = 0, i3 = 10 * i3 + (r3 - 48), r3 = l(e2), --s3) : (r3 = l(e2), (95 === r3 || 32 & o3) && a(e2.index, e2.line, e2.column, e2.index + 1, e2.line, e2.column, 152), d2 = 1);
          if (d2 && a(e2.index, e2.line, e2.column, e2.index + 1, e2.line, e2.column, 153), s3 >= 0 && !b(r3) && 46 !== r3) return e2.tokenValue = i3, 128 & n3 && (e2.tokenRaw = e2.source.slice(e2.tokenIndex, e2.index)), 134283266;
        }
        i3 += R(e2, r3), r3 = e2.currentChar, 46 === r3 && (95 === l(e2) && t(e2, 0), o3 = 64, i3 += "." + R(e2, e2.currentChar), r3 = e2.currentChar);
      }
    }
    const k3 = e2.index;
    let f3 = 0;
    if (110 === r3 && 128 & o3) f3 = 1, r3 = l(e2);
    else if (101 == (32 | r3)) {
      r3 = l(e2), 256 & p[r3] && (r3 = l(e2));
      const { index: n4 } = e2;
      16 & p[r3] || t(e2, 11), i3 += e2.source.substring(k3, n4) + R(e2, r3), r3 = e2.currentChar;
    }
    return (e2.index < e2.end && 16 & p[r3] || b(r3)) && t(e2, 13), f3 ? (e2.tokenRaw = e2.source.slice(e2.tokenIndex, e2.index), e2.tokenValue = BigInt(e2.tokenRaw.slice(0, -1).replaceAll("_", "")), 134283388) : (e2.tokenValue = 15 & o3 ? i3 : 32 & o3 ? parseFloat(e2.source.substring(e2.tokenIndex, e2.index)) : +i3, 128 & n3 && (e2.tokenRaw = e2.source.slice(e2.tokenIndex, e2.index)), 134283266);
  }
  function R(e2, n3) {
    let t3 = 0, o3 = e2.index, r3 = "";
    for (; 4112 & p[n3]; ) if (95 !== n3) t3 = 0, n3 = l(e2);
    else {
      const { index: i3 } = e2;
      95 === (n3 = l(e2)) && a(e2.index, e2.line, e2.column, e2.index + 1, e2.line, e2.column, 152), t3 = 1, r3 += e2.source.substring(o3, i3), o3 = e2.index;
    }
    return t3 && a(e2.index, e2.line, e2.column, e2.index + 1, e2.line, e2.column, 153), r3 + e2.source.substring(o3, e2.index);
  }
  !function(e2) {
    e2[e2.Empty = 0] = "Empty", e2[e2.Escape = 1] = "Escape", e2[e2.Class = 2] = "Class";
  }(v || (v = {})), function(e2) {
    e2[e2.Empty = 0] = "Empty", e2[e2.IgnoreCase = 1] = "IgnoreCase", e2[e2.Global = 2] = "Global", e2[e2.Multiline = 4] = "Multiline", e2[e2.Unicode = 16] = "Unicode", e2[e2.Sticky = 8] = "Sticky", e2[e2.DotAll = 32] = "DotAll", e2[e2.Indices = 64] = "Indices", e2[e2.UnicodeSets = 128] = "UnicodeSets";
  }(w || (w = {}));
  var N = ["end of source", "identifier", "number", "string", "regular expression", "false", "true", "null", "template continuation", "template tail", "=>", "(", "{", ".", "...", "}", ")", ";", ",", "[", "]", ":", "?", "'", '"', "++", "--", "=", "<<=", ">>=", ">>>=", "**=", "+=", "-=", "*=", "/=", "%=", "^=", "|=", "&=", "||=", "&&=", "??=", "typeof", "delete", "void", "!", "~", "+", "-", "in", "instanceof", "*", "%", "/", "**", "&&", "||", "===", "!==", "==", "!=", "<=", ">=", "<", ">", "<<", ">>", ">>>", "&", "|", "^", "var", "let", "const", "break", "case", "catch", "class", "continue", "debugger", "default", "do", "else", "export", "extends", "finally", "for", "function", "if", "import", "new", "return", "super", "switch", "this", "throw", "try", "while", "with", "implements", "interface", "package", "private", "protected", "public", "static", "yield", "as", "async", "await", "constructor", "get", "set", "accessor", "from", "of", "enum", "eval", "arguments", "escaped keyword", "escaped future reserved keyword", "reserved if strict", "#", "BigIntLiteral", "??", "?.", "WhiteSpace", "Illegal", "LineTerminator", "PrivateField", "Template", "@", "target", "meta", "LineFeed", "Escaped", "JSXText"];
  var U = Object.create(null, { this: { value: 86111 }, function: { value: 86104 }, if: { value: 20569 }, return: { value: 20572 }, var: { value: 86088 }, else: { value: 20563 }, for: { value: 20567 }, new: { value: 86107 }, in: { value: 8673330 }, typeof: { value: 16863275 }, while: { value: 20578 }, case: { value: 20556 }, break: { value: 20555 }, try: { value: 20577 }, catch: { value: 20557 }, delete: { value: 16863276 }, throw: { value: 86112 }, switch: { value: 86110 }, continue: { value: 20559 }, default: { value: 20561 }, instanceof: { value: 8411187 }, do: { value: 20562 }, void: { value: 16863277 }, finally: { value: 20566 }, async: { value: 209005 }, await: { value: 209006 }, class: { value: 86094 }, const: { value: 86090 }, constructor: { value: 12399 }, debugger: { value: 20560 }, export: { value: 20564 }, extends: { value: 20565 }, false: { value: 86021 }, from: { value: 12403 }, get: { value: 12400 }, implements: { value: 36964 }, import: { value: 86106 }, interface: { value: 36965 }, let: { value: 241737 }, null: { value: 86023 }, of: { value: 274548 }, package: { value: 36966 }, private: { value: 36967 }, protected: { value: 36968 }, public: { value: 36969 }, set: { value: 12401 }, static: { value: 36970 }, super: { value: 86109 }, true: { value: 86022 }, with: { value: 20579 }, yield: { value: 241771 }, enum: { value: 86133 }, eval: { value: 537079926 }, as: { value: 77932 }, arguments: { value: 537079927 }, target: { value: 209029 }, meta: { value: 209030 }, accessor: { value: 12402 } });
  function P(e2, n3, t3) {
    for (; m[l(e2)]; ) ;
    return e2.tokenValue = e2.source.slice(e2.tokenIndex, e2.index), 92 !== e2.currentChar && e2.currentChar <= 126 ? U[e2.tokenValue] || 208897 : O(e2, n3, 0, t3);
  }
  function B(e2, n3) {
    const o3 = F(e2);
    return b(o3) || t(e2, 5), e2.tokenValue = String.fromCodePoint(o3), O(e2, n3, 1, 4 & p[o3]);
  }
  function O(e2, n3, o3, r3) {
    let a3 = e2.index;
    for (; e2.index < e2.end; ) if (92 === e2.currentChar) {
      e2.tokenValue += e2.source.slice(a3, e2.index), o3 = 1;
      const n4 = F(e2);
      h(n4) || t(e2, 5), r3 = r3 && 4 & p[n4], e2.tokenValue += String.fromCodePoint(n4), a3 = e2.index;
    } else {
      const n4 = c(e2);
      if (n4 > 0) h(n4) || t(e2, 20, String.fromCodePoint(n4)), e2.currentChar = n4, e2.index++, e2.column++;
      else if (!h(e2.currentChar)) break;
      l(e2);
    }
    e2.index <= e2.end && (e2.tokenValue += e2.source.slice(a3, e2.index));
    const { length: i3 } = e2.tokenValue;
    if (r3 && i3 >= 2 && i3 <= 11) {
      const t3 = U[e2.tokenValue];
      return void 0 === t3 ? 208897 | (o3 ? -2147483648 : 0) : o3 ? 209006 === t3 ? 524800 & n3 ? -2147483528 : -2147483648 | t3 : 256 & n3 ? 36970 === t3 ? -2147483527 : 36864 & ~t3 ? 20480 & ~t3 ? -2147274630 : 67108864 & n3 && !(2048 & n3) ? -2147483648 | t3 : -2147483528 : -2147483527 : !(67108864 & n3) || 2048 & n3 || 20480 & ~t3 ? 241771 === t3 ? 67108864 & n3 ? -2147274630 : 262144 & n3 ? -2147483528 : -2147483648 | t3 : 209005 === t3 ? -2147274630 : 36864 & ~t3 ? -2147483528 : 12288 | t3 | -2147483648 : -2147483648 | t3 : t3;
    }
    return 208897 | (o3 ? -2147483648 : 0);
  }
  function G(e2) {
    let n3 = l(e2);
    if (92 === n3) return 130;
    const o3 = c(e2);
    return o3 && (n3 = o3), b(n3) || t(e2, 96), 130;
  }
  function F(e2) {
    return 117 !== e2.source.charCodeAt(e2.index + 1) && t(e2, 5), e2.currentChar = e2.source.charCodeAt(e2.index += 2), function(e3) {
      let n3 = 0;
      const o3 = e3.currentChar;
      if (123 === o3) {
        const t3 = e3.index - 2;
        for (; 64 & p[l(e3)]; ) n3 = n3 << 4 | g(e3.currentChar), n3 > 1114111 && a(t3, e3.line, e3.column, e3.index, e3.line, e3.column, 104);
        return 125 !== e3.currentChar && a(t3, e3.line, e3.column, e3.index, e3.line, e3.column, 7), l(e3), n3;
      }
      64 & p[o3] || t(e3, 7);
      const r3 = e3.source.charCodeAt(e3.index + 1);
      64 & p[r3] || t(e3, 7);
      const i3 = e3.source.charCodeAt(e3.index + 2);
      64 & p[i3] || t(e3, 7);
      const s3 = e3.source.charCodeAt(e3.index + 3);
      64 & p[s3] || t(e3, 7);
      return n3 = g(o3) << 12 | g(r3) << 8 | g(i3) << 4 | g(s3), e3.currentChar = e3.source.charCodeAt(e3.index += 4), n3;
    }(e2);
  }
  var j = [128, 128, 128, 128, 128, 128, 128, 128, 128, 127, 135, 127, 127, 129, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 127, 16842798, 134283267, 130, 208897, 8391477, 8390213, 134283267, 67174411, 16, 8391476, 25233968, 18, 25233969, 67108877, 8457014, 134283266, 134283266, 134283266, 134283266, 134283266, 134283266, 134283266, 134283266, 134283266, 134283266, 21, 1074790417, 8456256, 1077936155, 8390721, 22, 132, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 69271571, 136, 20, 8389959, 208897, 131, 4096, 4096, 4096, 4096, 4096, 4096, 4096, 208897, 4096, 208897, 208897, 4096, 208897, 4096, 208897, 4096, 208897, 4096, 4096, 4096, 208897, 4096, 4096, 208897, 4096, 4096, 2162700, 8389702, 1074790415, 16842799, 128];
  function J(e2, n3) {
    e2.flags = 1 ^ (1 | e2.flags), e2.startIndex = e2.index, e2.startColumn = e2.column, e2.startLine = e2.line, e2.setToken(H(e2, n3, 0));
  }
  function H(e2, n3, o3) {
    const r3 = 0 === e2.index, { source: a3 } = e2;
    let s3 = e2.index, g3 = e2.line, k3 = e2.column;
    for (; e2.index < e2.end; ) {
      e2.tokenIndex = e2.index, e2.tokenColumn = e2.column, e2.tokenLine = e2.line;
      let f3 = e2.currentChar;
      if (f3 <= 126) {
        const i3 = j[f3];
        switch (i3) {
          case 67174411:
          case 16:
          case 2162700:
          case 1074790415:
          case 69271571:
          case 20:
          case 21:
          case 1074790417:
          case 18:
          case 16842799:
          case 132:
          case 128:
            return l(e2), i3;
          case 208897:
            return P(e2, n3, 0);
          case 4096:
            return P(e2, n3, 1);
          case 134283266:
            return V(e2, n3, 144);
          case 134283267:
            return I(e2, n3, f3);
          case 131:
            return S(e2, n3);
          case 136:
            return B(e2, n3);
          case 130:
            return G(e2);
          case 127:
            l(e2);
            break;
          case 129:
            o3 |= 5, d(e2);
            break;
          case 135:
            u(e2, o3), o3 = -5 & o3 | 1;
            break;
          case 8456256: {
            const t3 = l(e2);
            if (e2.index < e2.end) {
              if (60 === t3) return e2.index < e2.end && 61 === l(e2) ? (l(e2), 4194332) : 8390978;
              if (61 === t3) return l(e2), 8390718;
              if (33 === t3) {
                const t4 = e2.index + 1;
                if (t4 + 1 < e2.end && 45 === a3.charCodeAt(t4) && 45 == a3.charCodeAt(t4 + 1)) {
                  e2.column += 3, e2.currentChar = a3.charCodeAt(e2.index += 3), o3 = T(e2, a3, o3, n3, 2, e2.tokenIndex, e2.tokenLine, e2.tokenColumn), s3 = e2.tokenIndex, g3 = e2.tokenLine, k3 = e2.tokenColumn;
                  continue;
                }
                return 8456256;
              }
            }
            return 8456256;
          }
          case 1077936155: {
            l(e2);
            const n4 = e2.currentChar;
            return 61 === n4 ? 61 === l(e2) ? (l(e2), 8390458) : 8390460 : 62 === n4 ? (l(e2), 10) : 1077936155;
          }
          case 16842798:
            return 61 !== l(e2) ? 16842798 : 61 !== l(e2) ? 8390461 : (l(e2), 8390459);
          case 8391477:
            return 61 !== l(e2) ? 8391477 : (l(e2), 4194340);
          case 8391476: {
            if (l(e2), e2.index >= e2.end) return 8391476;
            const n4 = e2.currentChar;
            return 61 === n4 ? (l(e2), 4194338) : 42 !== n4 ? 8391476 : 61 !== l(e2) ? 8391735 : (l(e2), 4194335);
          }
          case 8389959:
            return 61 !== l(e2) ? 8389959 : (l(e2), 4194341);
          case 25233968: {
            l(e2);
            const n4 = e2.currentChar;
            return 43 === n4 ? (l(e2), 33619993) : 61 === n4 ? (l(e2), 4194336) : 25233968;
          }
          case 25233969: {
            l(e2);
            const i4 = e2.currentChar;
            if (45 === i4) {
              if (l(e2), (1 & o3 || r3) && 62 === e2.currentChar) {
                64 & n3 || t(e2, 112), l(e2), o3 = T(e2, a3, o3, n3, 3, s3, g3, k3), s3 = e2.tokenIndex, g3 = e2.tokenLine, k3 = e2.tokenColumn;
                continue;
              }
              return 33619994;
            }
            return 61 === i4 ? (l(e2), 4194337) : 25233969;
          }
          case 8457014:
            if (l(e2), e2.index < e2.end) {
              const t3 = e2.currentChar;
              if (47 === t3) {
                l(e2), o3 = y(e2, a3, o3, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn), s3 = e2.tokenIndex, g3 = e2.tokenLine, k3 = e2.tokenColumn;
                continue;
              }
              if (42 === t3) {
                l(e2), o3 = C(e2, a3, o3), s3 = e2.tokenIndex, g3 = e2.tokenLine, k3 = e2.tokenColumn;
                continue;
              }
              if (8192 & n3) return L(e2, n3);
              if (61 === t3) return l(e2), 4259875;
            }
            return 8457014;
          case 67108877: {
            const t3 = l(e2);
            if (t3 >= 48 && t3 <= 57) return V(e2, n3, 80);
            if (46 === t3) {
              const n4 = e2.index + 1;
              if (n4 < e2.end && 46 === a3.charCodeAt(n4)) return e2.column += 2, e2.currentChar = a3.charCodeAt(e2.index += 2), 14;
            }
            return 67108877;
          }
          case 8389702: {
            l(e2);
            const n4 = e2.currentChar;
            return 124 === n4 ? (l(e2), 61 === e2.currentChar ? (l(e2), 4194344) : 8913465) : 61 === n4 ? (l(e2), 4194342) : 8389702;
          }
          case 8390721: {
            l(e2);
            const n4 = e2.currentChar;
            if (61 === n4) return l(e2), 8390719;
            if (62 !== n4) return 8390721;
            if (l(e2), e2.index < e2.end) {
              const n5 = e2.currentChar;
              if (62 === n5) return 61 === l(e2) ? (l(e2), 4194334) : 8390980;
              if (61 === n5) return l(e2), 4194333;
            }
            return 8390979;
          }
          case 8390213: {
            l(e2);
            const n4 = e2.currentChar;
            return 38 === n4 ? (l(e2), 61 === e2.currentChar ? (l(e2), 4194345) : 8913720) : 61 === n4 ? (l(e2), 4194343) : 8390213;
          }
          case 22: {
            let n4 = l(e2);
            if (63 === n4) return l(e2), 61 === e2.currentChar ? (l(e2), 4194346) : 276824445;
            if (46 === n4) {
              const t3 = e2.index + 1;
              if (t3 < e2.end && (n4 = a3.charCodeAt(t3), !(n4 >= 48 && n4 <= 57))) return l(e2), 67108990;
            }
            return 22;
          }
        }
      } else {
        if ((8232 ^ f3) <= 1) {
          o3 = -5 & o3 | 1, d(e2);
          continue;
        }
        const r4 = c(e2);
        if (r4 > 0 && (f3 = r4), i(f3)) return e2.tokenValue = "", O(e2, n3, 0, 0);
        if (160 === (p3 = f3) || 65279 === p3 || 133 === p3 || 5760 === p3 || p3 >= 8192 && p3 <= 8203 || 8239 === p3 || 8287 === p3 || 12288 === p3 || 8201 === p3 || 65519 === p3) {
          l(e2);
          continue;
        }
        t(e2, 20, String.fromCodePoint(f3));
      }
    }
    var p3;
    return 1048576;
  }
  var M = { AElig: "\xC6", AMP: "&", Aacute: "\xC1", Abreve: "\u0102", Acirc: "\xC2", Acy: "\u0410", Afr: "\u{1D504}", Agrave: "\xC0", Alpha: "\u0391", Amacr: "\u0100", And: "\u2A53", Aogon: "\u0104", Aopf: "\u{1D538}", ApplyFunction: "\u2061", Aring: "\xC5", Ascr: "\u{1D49C}", Assign: "\u2254", Atilde: "\xC3", Auml: "\xC4", Backslash: "\u2216", Barv: "\u2AE7", Barwed: "\u2306", Bcy: "\u0411", Because: "\u2235", Bernoullis: "\u212C", Beta: "\u0392", Bfr: "\u{1D505}", Bopf: "\u{1D539}", Breve: "\u02D8", Bscr: "\u212C", Bumpeq: "\u224E", CHcy: "\u0427", COPY: "\xA9", Cacute: "\u0106", Cap: "\u22D2", CapitalDifferentialD: "\u2145", Cayleys: "\u212D", Ccaron: "\u010C", Ccedil: "\xC7", Ccirc: "\u0108", Cconint: "\u2230", Cdot: "\u010A", Cedilla: "\xB8", CenterDot: "\xB7", Cfr: "\u212D", Chi: "\u03A7", CircleDot: "\u2299", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", Colon: "\u2237", Colone: "\u2A74", Congruent: "\u2261", Conint: "\u222F", ContourIntegral: "\u222E", Copf: "\u2102", Coproduct: "\u2210", CounterClockwiseContourIntegral: "\u2233", Cross: "\u2A2F", Cscr: "\u{1D49E}", Cup: "\u22D3", CupCap: "\u224D", DD: "\u2145", DDotrahd: "\u2911", DJcy: "\u0402", DScy: "\u0405", DZcy: "\u040F", Dagger: "\u2021", Darr: "\u21A1", Dashv: "\u2AE4", Dcaron: "\u010E", Dcy: "\u0414", Del: "\u2207", Delta: "\u0394", Dfr: "\u{1D507}", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", Diamond: "\u22C4", DifferentialD: "\u2146", Dopf: "\u{1D53B}", Dot: "\xA8", DotDot: "\u20DC", DotEqual: "\u2250", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", DownTeeArrow: "\u21A7", Downarrow: "\u21D3", Dscr: "\u{1D49F}", Dstrok: "\u0110", ENG: "\u014A", ETH: "\xD0", Eacute: "\xC9", Ecaron: "\u011A", Ecirc: "\xCA", Ecy: "\u042D", Edot: "\u0116", Efr: "\u{1D508}", Egrave: "\xC8", Element: "\u2208", Emacr: "\u0112", EmptySmallSquare: "\u25FB", EmptyVerySmallSquare: "\u25AB", Eogon: "\u0118", Eopf: "\u{1D53C}", Epsilon: "\u0395", Equal: "\u2A75", EqualTilde: "\u2242", Equilibrium: "\u21CC", Escr: "\u2130", Esim: "\u2A73", Eta: "\u0397", Euml: "\xCB", Exists: "\u2203", ExponentialE: "\u2147", Fcy: "\u0424", Ffr: "\u{1D509}", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", Fopf: "\u{1D53D}", ForAll: "\u2200", Fouriertrf: "\u2131", Fscr: "\u2131", GJcy: "\u0403", GT: ">", Gamma: "\u0393", Gammad: "\u03DC", Gbreve: "\u011E", Gcedil: "\u0122", Gcirc: "\u011C", Gcy: "\u0413", Gdot: "\u0120", Gfr: "\u{1D50A}", Gg: "\u22D9", Gopf: "\u{1D53E}", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", Gt: "\u226B", HARDcy: "\u042A", Hacek: "\u02C7", Hat: "^", Hcirc: "\u0124", Hfr: "\u210C", HilbertSpace: "\u210B", Hopf: "\u210D", HorizontalLine: "\u2500", Hscr: "\u210B", Hstrok: "\u0126", HumpDownHump: "\u224E", HumpEqual: "\u224F", IEcy: "\u0415", IJlig: "\u0132", IOcy: "\u0401", Iacute: "\xCD", Icirc: "\xCE", Icy: "\u0418", Idot: "\u0130", Ifr: "\u2111", Igrave: "\xCC", Im: "\u2111", Imacr: "\u012A", ImaginaryI: "\u2148", Implies: "\u21D2", Int: "\u222C", Integral: "\u222B", Intersection: "\u22C2", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", Iogon: "\u012E", Iopf: "\u{1D540}", Iota: "\u0399", Iscr: "\u2110", Itilde: "\u0128", Iukcy: "\u0406", Iuml: "\xCF", Jcirc: "\u0134", Jcy: "\u0419", Jfr: "\u{1D50D}", Jopf: "\u{1D541}", Jscr: "\u{1D4A5}", Jsercy: "\u0408", Jukcy: "\u0404", KHcy: "\u0425", KJcy: "\u040C", Kappa: "\u039A", Kcedil: "\u0136", Kcy: "\u041A", Kfr: "\u{1D50E}", Kopf: "\u{1D542}", Kscr: "\u{1D4A6}", LJcy: "\u0409", LT: "<", Lacute: "\u0139", Lambda: "\u039B", Lang: "\u27EA", Laplacetrf: "\u2112", Larr: "\u219E", Lcaron: "\u013D", Lcedil: "\u013B", Lcy: "\u041B", LeftAngleBracket: "\u27E8", LeftArrow: "\u2190", LeftArrowBar: "\u21E4", LeftArrowRightArrow: "\u21C6", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", LeftRightArrow: "\u2194", LeftRightVector: "\u294E", LeftTee: "\u22A3", LeftTeeArrow: "\u21A4", LeftTeeVector: "\u295A", LeftTriangle: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", LeftVectorBar: "\u2952", Leftarrow: "\u21D0", Leftrightarrow: "\u21D4", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", LessLess: "\u2AA1", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", Lfr: "\u{1D50F}", Ll: "\u22D8", Lleftarrow: "\u21DA", Lmidot: "\u013F", LongLeftArrow: "\u27F5", LongLeftRightArrow: "\u27F7", LongRightArrow: "\u27F6", Longleftarrow: "\u27F8", Longleftrightarrow: "\u27FA", Longrightarrow: "\u27F9", Lopf: "\u{1D543}", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", Lscr: "\u2112", Lsh: "\u21B0", Lstrok: "\u0141", Lt: "\u226A", Map: "\u2905", Mcy: "\u041C", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", MinusPlus: "\u2213", Mopf: "\u{1D544}", Mscr: "\u2133", Mu: "\u039C", NJcy: "\u040A", Nacute: "\u0143", Ncaron: "\u0147", Ncedil: "\u0145", Ncy: "\u041D", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: "\n", Nfr: "\u{1D511}", NoBreak: "\u2060", NonBreakingSpace: "\xA0", Nopf: "\u2115", Not: "\u2AEC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", NotLeftTriangle: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangle: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", Nscr: "\u{1D4A9}", Ntilde: "\xD1", Nu: "\u039D", OElig: "\u0152", Oacute: "\xD3", Ocirc: "\xD4", Ocy: "\u041E", Odblac: "\u0150", Ofr: "\u{1D512}", Ograve: "\xD2", Omacr: "\u014C", Omega: "\u03A9", Omicron: "\u039F", Oopf: "\u{1D546}", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", Or: "\u2A54", Oscr: "\u{1D4AA}", Oslash: "\xD8", Otilde: "\xD5", Otimes: "\u2A37", Ouml: "\xD6", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", PartialD: "\u2202", Pcy: "\u041F", Pfr: "\u{1D513}", Phi: "\u03A6", Pi: "\u03A0", PlusMinus: "\xB1", Poincareplane: "\u210C", Popf: "\u2119", Pr: "\u2ABB", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", Prime: "\u2033", Product: "\u220F", Proportion: "\u2237", Proportional: "\u221D", Pscr: "\u{1D4AB}", Psi: "\u03A8", QUOT: '"', Qfr: "\u{1D514}", Qopf: "\u211A", Qscr: "\u{1D4AC}", RBarr: "\u2910", REG: "\xAE", Racute: "\u0154", Rang: "\u27EB", Rarr: "\u21A0", Rarrtl: "\u2916", Rcaron: "\u0158", Rcedil: "\u0156", Rcy: "\u0420", Re: "\u211C", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", Rfr: "\u211C", Rho: "\u03A1", RightAngleBracket: "\u27E9", RightArrow: "\u2192", RightArrowBar: "\u21E5", RightArrowLeftArrow: "\u21C4", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", RightTee: "\u22A2", RightTeeArrow: "\u21A6", RightTeeVector: "\u295B", RightTriangle: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", RightVectorBar: "\u2953", Rightarrow: "\u21D2", Ropf: "\u211D", RoundImplies: "\u2970", Rrightarrow: "\u21DB", Rscr: "\u211B", Rsh: "\u21B1", RuleDelayed: "\u29F4", SHCHcy: "\u0429", SHcy: "\u0428", SOFTcy: "\u042C", Sacute: "\u015A", Sc: "\u2ABC", Scaron: "\u0160", Scedil: "\u015E", Scirc: "\u015C", Scy: "\u0421", Sfr: "\u{1D516}", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", Sigma: "\u03A3", SmallCircle: "\u2218", Sopf: "\u{1D54A}", Sqrt: "\u221A", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", Sscr: "\u{1D4AE}", Star: "\u22C6", Sub: "\u22D0", Subset: "\u22D0", SubsetEqual: "\u2286", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", SuchThat: "\u220B", Sum: "\u2211", Sup: "\u22D1", Superset: "\u2283", SupersetEqual: "\u2287", Supset: "\u22D1", THORN: "\xDE", TRADE: "\u2122", TSHcy: "\u040B", TScy: "\u0426", Tab: "	", Tau: "\u03A4", Tcaron: "\u0164", Tcedil: "\u0162", Tcy: "\u0422", Tfr: "\u{1D517}", Therefore: "\u2234", Theta: "\u0398", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", Topf: "\u{1D54B}", TripleDot: "\u20DB", Tscr: "\u{1D4AF}", Tstrok: "\u0166", Uacute: "\xDA", Uarr: "\u219F", Uarrocir: "\u2949", Ubrcy: "\u040E", Ubreve: "\u016C", Ucirc: "\xDB", Ucy: "\u0423", Udblac: "\u0170", Ufr: "\u{1D518}", Ugrave: "\xD9", Umacr: "\u016A", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", Uopf: "\u{1D54C}", UpArrow: "\u2191", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", UpDownArrow: "\u2195", UpEquilibrium: "\u296E", UpTee: "\u22A5", UpTeeArrow: "\u21A5", Uparrow: "\u21D1", Updownarrow: "\u21D5", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", Upsi: "\u03D2", Upsilon: "\u03A5", Uring: "\u016E", Uscr: "\u{1D4B0}", Utilde: "\u0168", Uuml: "\xDC", VDash: "\u22AB", Vbar: "\u2AEB", Vcy: "\u0412", Vdash: "\u22A9", Vdashl: "\u2AE6", Vee: "\u22C1", Verbar: "\u2016", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", Vopf: "\u{1D54D}", Vscr: "\u{1D4B1}", Vvdash: "\u22AA", Wcirc: "\u0174", Wedge: "\u22C0", Wfr: "\u{1D51A}", Wopf: "\u{1D54E}", Wscr: "\u{1D4B2}", Xfr: "\u{1D51B}", Xi: "\u039E", Xopf: "\u{1D54F}", Xscr: "\u{1D4B3}", YAcy: "\u042F", YIcy: "\u0407", YUcy: "\u042E", Yacute: "\xDD", Ycirc: "\u0176", Ycy: "\u042B", Yfr: "\u{1D51C}", Yopf: "\u{1D550}", Yscr: "\u{1D4B4}", Yuml: "\u0178", ZHcy: "\u0416", Zacute: "\u0179", Zcaron: "\u017D", Zcy: "\u0417", Zdot: "\u017B", ZeroWidthSpace: "\u200B", Zeta: "\u0396", Zfr: "\u2128", Zopf: "\u2124", Zscr: "\u{1D4B5}", aacute: "\xE1", abreve: "\u0103", ac: "\u223E", acE: "\u223E\u0333", acd: "\u223F", acirc: "\xE2", acute: "\xB4", acy: "\u0430", aelig: "\xE6", af: "\u2061", afr: "\u{1D51E}", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", alpha: "\u03B1", amacr: "\u0101", amalg: "\u2A3F", amp: "&", and: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsd: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", aogon: "\u0105", aopf: "\u{1D552}", ap: "\u2248", apE: "\u2A70", apacir: "\u2A6F", ape: "\u224A", apid: "\u224B", apos: "'", approx: "\u2248", approxeq: "\u224A", aring: "\xE5", ascr: "\u{1D4B6}", ast: "*", asymp: "\u2248", asympeq: "\u224D", atilde: "\xE3", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", bNot: "\u2AED", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", barvee: "\u22BD", barwed: "\u2305", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", beta: "\u03B2", beth: "\u2136", between: "\u226C", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bnot: "\u2310", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxDL: "\u2557", boxDR: "\u2554", boxDl: "\u2556", boxDr: "\u2553", boxH: "\u2550", boxHD: "\u2566", boxHU: "\u2569", boxHd: "\u2564", boxHu: "\u2567", boxUL: "\u255D", boxUR: "\u255A", boxUl: "\u255C", boxUr: "\u2559", boxV: "\u2551", boxVH: "\u256C", boxVL: "\u2563", boxVR: "\u2560", boxVh: "\u256B", boxVl: "\u2562", boxVr: "\u255F", boxbox: "\u29C9", boxdL: "\u2555", boxdR: "\u2552", boxdl: "\u2510", boxdr: "\u250C", boxh: "\u2500", boxhD: "\u2565", boxhU: "\u2568", boxhd: "\u252C", boxhu: "\u2534", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxuL: "\u255B", boxuR: "\u2558", boxul: "\u2518", boxur: "\u2514", boxv: "\u2502", boxvH: "\u256A", boxvL: "\u2561", boxvR: "\u255E", boxvh: "\u253C", boxvl: "\u2524", boxvr: "\u251C", bprime: "\u2035", breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", bumpeq: "\u224F", cacute: "\u0107", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", ccaps: "\u2A4D", ccaron: "\u010D", ccedil: "\xE7", ccirc: "\u0109", ccups: "\u2A4C", ccupssm: "\u2A50", cdot: "\u010B", cedil: "\xB8", cemptyv: "\u29B2", cent: "\xA2", centerdot: "\xB7", cfr: "\u{1D520}", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", chi: "\u03C7", cir: "\u25CB", cirE: "\u29C3", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledR: "\xAE", circledS: "\u24C8", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", clubs: "\u2663", clubsuit: "\u2663", colon: ":", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", conint: "\u222E", copf: "\u{1D554}", coprod: "\u2210", copy: "\xA9", copysr: "\u2117", crarr: "\u21B5", cross: "\u2717", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cup: "\u222A", cupbrcap: "\u2A48", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", dArr: "\u21D3", dHar: "\u2965", dagger: "\u2020", daleth: "\u2138", darr: "\u2193", dash: "\u2010", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", dcaron: "\u010F", dcy: "\u0434", dd: "\u2146", ddagger: "\u2021", ddarr: "\u21CA", ddotseq: "\u2A77", deg: "\xB0", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", dfr: "\u{1D521}", dharl: "\u21C3", dharr: "\u21C2", diam: "\u22C4", diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", dopf: "\u{1D555}", dot: "\u02D9", doteq: "\u2250", doteqdot: "\u2251", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", downarrow: "\u2193", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", dscr: "\u{1D4B9}", dscy: "\u0455", dsol: "\u29F6", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", dzcy: "\u045F", dzigrarr: "\u27FF", eDDot: "\u2A77", eDot: "\u2251", eacute: "\xE9", easter: "\u2A6E", ecaron: "\u011B", ecir: "\u2256", ecirc: "\xEA", ecolon: "\u2255", ecy: "\u044D", edot: "\u0117", ee: "\u2147", efDot: "\u2252", efr: "\u{1D522}", eg: "\u2A9A", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", emptyv: "\u2205", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", eng: "\u014B", ensp: "\u2002", eogon: "\u0119", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", equals: "=", equest: "\u225F", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erDot: "\u2253", erarr: "\u2971", escr: "\u212F", esdot: "\u2250", esim: "\u2242", eta: "\u03B7", eth: "\xF0", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", expectation: "\u2130", exponentiale: "\u2147", fallingdotseq: "\u2252", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", ffr: "\u{1D523}", filig: "\uFB01", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", fopf: "\u{1D557}", forall: "\u2200", fork: "\u22D4", forkv: "\u2AD9", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", gE: "\u2267", gEl: "\u2A8C", gacute: "\u01F5", gamma: "\u03B3", gammad: "\u03DD", gap: "\u2A86", gbreve: "\u011F", gcirc: "\u011D", gcy: "\u0433", gdot: "\u0121", ge: "\u2265", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", ges: "\u2A7E", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", gfr: "\u{1D524}", gg: "\u226B", ggg: "\u22D9", gimel: "\u2137", gjcy: "\u0453", gl: "\u2277", glE: "\u2A92", gla: "\u2AA5", glj: "\u2AA4", gnE: "\u2269", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", gopf: "\u{1D558}", grave: "`", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gt: ">", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", hArr: "\u21D4", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", hardcy: "\u044A", harr: "\u2194", harrcir: "\u2948", harrw: "\u21AD", hbar: "\u210F", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", horbar: "\u2015", hscr: "\u{1D4BD}", hslash: "\u210F", hstrok: "\u0127", hybull: "\u2043", hyphen: "\u2010", iacute: "\xED", ic: "\u2063", icirc: "\xEE", icy: "\u0438", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", ijlig: "\u0133", imacr: "\u012B", image: "\u2111", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", imof: "\u22B7", imped: "\u01B5", in: "\u2208", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", int: "\u222B", intcal: "\u22BA", integers: "\u2124", intercal: "\u22BA", intlarhk: "\u2A17", intprod: "\u2A3C", iocy: "\u0451", iogon: "\u012F", iopf: "\u{1D55A}", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", isin: "\u2208", isinE: "\u22F9", isindot: "\u22F5", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", itilde: "\u0129", iukcy: "\u0456", iuml: "\xEF", jcirc: "\u0135", jcy: "\u0439", jfr: "\u{1D527}", jmath: "\u0237", jopf: "\u{1D55B}", jscr: "\u{1D4BF}", jsercy: "\u0458", jukcy: "\u0454", kappa: "\u03BA", kappav: "\u03F0", kcedil: "\u0137", kcy: "\u043A", kfr: "\u{1D528}", kgreen: "\u0138", khcy: "\u0445", kjcy: "\u045C", kopf: "\u{1D55C}", kscr: "\u{1D4C0}", lAarr: "\u21DA", lArr: "\u21D0", lAtail: "\u291B", lBarr: "\u290E", lE: "\u2266", lEg: "\u2A8B", lHar: "\u2962", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", lambda: "\u03BB", lang: "\u27E8", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", laquo: "\xAB", larr: "\u2190", larrb: "\u21E4", larrbfs: "\u291F", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", lat: "\u2AAB", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", lcaron: "\u013E", lcedil: "\u013C", lceil: "\u2308", lcub: "{", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", leftarrow: "\u2190", leftarrowtail: "\u21A2", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", leftrightarrow: "\u2194", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", leftthreetimes: "\u22CB", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", les: "\u2A7D", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", lessgtr: "\u2276", lesssim: "\u2272", lfisht: "\u297C", lfloor: "\u230A", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", ljcy: "\u0459", ll: "\u226A", llarr: "\u21C7", llcorner: "\u231E", llhard: "\u296B", lltri: "\u25FA", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnE: "\u2268", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\u27F5", longleftrightarrow: "\u27F7", longmapsto: "\u27FC", longrightarrow: "\u27F6", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", lstrok: "\u0142", lt: "<", ltcc: "\u2AA6", ltcir: "\u2A79", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltrPar: "\u2996", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", mDDot: "\u223A", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", mcy: "\u043C", mdash: "\u2014", measuredangle: "\u2221", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", mid: "\u2223", midast: "*", midcir: "\u2AF0", middot: "\xB7", minus: "\u2212", minusb: "\u229F", minusd: "\u2238", minusdu: "\u2A2A", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", mopf: "\u{1D55E}", mp: "\u2213", mscr: "\u{1D4C2}", mstpos: "\u223E", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nGg: "\u22D9\u0338", nGt: "\u226B\u20D2", nGtv: "\u226B\u0338", nLeftarrow: "\u21CD", nLeftrightarrow: "\u21CE", nLl: "\u22D8\u0338", nLt: "\u226A\u20D2", nLtv: "\u226A\u0338", nRightarrow: "\u21CF", nVDash: "\u22AF", nVdash: "\u22AE", nabla: "\u2207", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natur: "\u266E", natural: "\u266E", naturals: "\u2115", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", ncaron: "\u0148", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", ncy: "\u043D", ndash: "\u2013", ne: "\u2260", neArr: "\u21D7", nearhk: "\u2924", nearr: "\u2197", nearrow: "\u2197", nedot: "\u2250\u0338", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", nexist: "\u2204", nexists: "\u2204", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", ngsim: "\u2275", ngt: "\u226F", ngtr: "\u226F", nhArr: "\u21CE", nharr: "\u21AE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", njcy: "\u045A", nlArr: "\u21CD", nlE: "\u2266\u0338", nlarr: "\u219A", nldr: "\u2025", nle: "\u2270", nleftarrow: "\u219A", nleftrightarrow: "\u21AE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nlsim: "\u2274", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nmid: "\u2224", nopf: "\u{1D55F}", not: "\xAC", notin: "\u2209", notinE: "\u22F9\u0338", notindot: "\u22F5\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", npar: "\u2226", nparallel: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", npre: "\u2AAF\u0338", nprec: "\u2280", npreceq: "\u2AAF\u0338", nrArr: "\u21CF", nrarr: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvDash: "\u22AD", nvHarr: "\u2904", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwArr: "\u21D6", nwarhk: "\u2923", nwarr: "\u2196", nwarrow: "\u2196", nwnear: "\u2927", oS: "\u24C8", oacute: "\xF3", oast: "\u229B", ocir: "\u229A", ocirc: "\xF4", ocy: "\u043E", odash: "\u229D", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", oelig: "\u0153", ofcir: "\u29BF", ofr: "\u{1D52C}", ogon: "\u02DB", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", omacr: "\u014D", omega: "\u03C9", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", oopf: "\u{1D560}", opar: "\u29B7", operp: "\u29B9", oplus: "\u2295", or: "\u2228", orarr: "\u21BB", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oscr: "\u2134", oslash: "\xF8", osol: "\u2298", otilde: "\xF5", otimes: "\u2297", otimesas: "\u2A36", ouml: "\xF6", ovbar: "\u233D", par: "\u2225", para: "\xB6", parallel: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", pfr: "\u{1D52D}", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plus: "+", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", pointint: "\u2A15", popf: "\u{1D561}", pound: "\xA3", pr: "\u227A", prE: "\u2AB3", prap: "\u2AB7", prcue: "\u227C", pre: "\u2AAF", prec: "\u227A", precapprox: "\u2AB7", preccurlyeq: "\u227C", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", precsim: "\u227E", prime: "\u2032", primes: "\u2119", prnE: "\u2AB5", prnap: "\u2AB9", prnsim: "\u22E8", prod: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", pscr: "\u{1D4C5}", psi: "\u03C8", puncsp: "\u2008", qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", qprime: "\u2057", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', rAarr: "\u21DB", rArr: "\u21D2", rAtail: "\u291C", rBarr: "\u290F", rHar: "\u2964", race: "\u223D\u0331", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", rarr: "\u2192", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", rcaron: "\u0159", rcedil: "\u0157", rceil: "\u2309", rcub: "}", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", rect: "\u25AD", reg: "\xAE", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", rho: "\u03C1", rhov: "\u03F1", rightarrow: "\u2192", rightarrowtail: "\u21A3", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", rightthreetimes: "\u22CC", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", rsaquo: "\u203A", rscr: "\u{1D4C7}", rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", ruluhar: "\u2968", rx: "\u211E", sacute: "\u015B", sbquo: "\u201A", sc: "\u227B", scE: "\u2AB4", scap: "\u2AB8", scaron: "\u0161", sccue: "\u227D", sce: "\u2AB0", scedil: "\u015F", scirc: "\u015D", scnE: "\u2AB6", scnap: "\u2ABA", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", scy: "\u0441", sdot: "\u22C5", sdotb: "\u22A1", sdote: "\u2A66", seArr: "\u21D8", searhk: "\u2925", searr: "\u2198", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", shchcy: "\u0449", shcy: "\u0448", shortmid: "\u2223", shortparallel: "\u2225", shy: "\xAD", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", squ: "\u25A1", square: "\u25A1", squarf: "\u25AA", squf: "\u25AA", srarr: "\u2192", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", subE: "\u2AC5", subdot: "\u2ABD", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", subseteq: "\u2286", subseteqq: "\u2AC5", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succ: "\u227B", succapprox: "\u2AB8", succcurlyeq: "\u227D", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", supE: "\u2AC6", supdot: "\u2ABE", supdsub: "\u2AD8", supe: "\u2287", supedot: "\u2AC4", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swArr: "\u21D9", swarhk: "\u2926", swarr: "\u2199", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", target: "\u2316", tau: "\u03C4", tbrk: "\u23B4", tcaron: "\u0165", tcedil: "\u0163", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", thinsp: "\u2009", thkap: "\u2248", thksim: "\u223C", thorn: "\xFE", tilde: "\u02DC", times: "\xD7", timesb: "\u22A0", timesbar: "\u2A31", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", top: "\u22A4", topbot: "\u2336", topcir: "\u2AF1", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", tscr: "\u{1D4C9}", tscy: "\u0446", tshcy: "\u045B", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", uArr: "\u21D1", uHar: "\u2963", uacute: "\xFA", uarr: "\u2191", ubrcy: "\u045E", ubreve: "\u016D", ucirc: "\xFB", ucy: "\u0443", udarr: "\u21C5", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", ufr: "\u{1D532}", ugrave: "\xF9", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", umacr: "\u016B", uml: "\xA8", uogon: "\u0173", uopf: "\u{1D566}", uparrow: "\u2191", updownarrow: "\u2195", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", upsi: "\u03C5", upsih: "\u03D2", upsilon: "\u03C5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", uring: "\u016F", urtri: "\u25F9", uscr: "\u{1D4CA}", utdot: "\u22F0", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", uuml: "\xFC", uwangle: "\u29A7", vArr: "\u21D5", vBar: "\u2AE8", vBarv: "\u2AE9", vDash: "\u22A8", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", vcy: "\u0432", vdash: "\u22A2", vee: "\u2228", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", verbar: "|", vert: "|", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", vzigzag: "\u299A", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\u2227", wedgeq: "\u2259", weierp: "\u2118", wfr: "\u{1D534}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", xfr: "\u{1D535}", xhArr: "\u27FA", xharr: "\u27F7", xi: "\u03BE", xlArr: "\u27F8", xlarr: "\u27F5", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrArr: "\u27F9", xrarr: "\u27F6", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", yacute: "\xFD", yacy: "\u044F", ycirc: "\u0177", ycy: "\u044B", yen: "\xA5", yfr: "\u{1D536}", yicy: "\u0457", yopf: "\u{1D56A}", yscr: "\u{1D4CE}", yucy: "\u044E", yuml: "\xFF", zacute: "\u017A", zcaron: "\u017E", zcy: "\u0437", zdot: "\u017C", zeetrf: "\u2128", zeta: "\u03B6", zfr: "\u{1D537}", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" };
  var z = { 0: 65533, 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };
  function X(e2) {
    return e2.replace(/&(?:[a-zA-Z]+|#[xX][\da-fA-F]+|#\d+);/g, (e3) => {
      if ("#" === e3.charAt(1)) {
        const n3 = e3.charAt(2);
        return function(e4) {
          if (e4 >= 55296 && e4 <= 57343 || e4 > 1114111) return "\uFFFD";
          e4 in z && (e4 = z[e4]);
          return String.fromCodePoint(e4);
        }("X" === n3 || "x" === n3 ? parseInt(e3.slice(3), 16) : parseInt(e3.slice(2), 10));
      }
      return M[e3.slice(1, -1)] || e3;
    });
  }
  function _(e2, n3) {
    return e2.startIndex = e2.tokenIndex = e2.index, e2.startColumn = e2.tokenColumn = e2.column, e2.startLine = e2.tokenLine = e2.line, e2.setToken(8192 & p[e2.currentChar] ? function(e3, n4) {
      const o3 = e3.currentChar;
      let r3 = l(e3);
      const a3 = e3.index;
      for (; r3 !== o3; ) e3.index >= e3.end && t(e3, 16), r3 = l(e3);
      r3 !== o3 && t(e3, 16);
      e3.tokenValue = e3.source.slice(a3, e3.index), l(e3), 128 & n4 && (e3.tokenRaw = e3.source.slice(e3.tokenIndex, e3.index));
      return 134283267;
    }(e2, n3) : H(e2, n3, 0)), e2.getToken();
  }
  function $2(e2, n3) {
    if (e2.startIndex = e2.tokenIndex = e2.index, e2.startColumn = e2.tokenColumn = e2.column, e2.startLine = e2.tokenLine = e2.line, e2.index >= e2.end) return void e2.setToken(1048576);
    if (60 === e2.currentChar) return l(e2), void e2.setToken(8456256);
    if (123 === e2.currentChar) return l(e2), void e2.setToken(2162700);
    let o3 = 0;
    for (; e2.index < e2.end; ) {
      const n4 = p[e2.source.charCodeAt(e2.index)];
      if (1024 & n4 ? (o3 |= 5, d(e2)) : 2048 & n4 ? (u(e2, o3), o3 = -5 & o3 | 1) : l(e2), 16384 & p[e2.currentChar]) break;
    }
    e2.tokenIndex === e2.index && t(e2, 0);
    const r3 = e2.source.slice(e2.tokenIndex, e2.index);
    128 & n3 && (e2.tokenRaw = r3), e2.tokenValue = X(r3), e2.setToken(137);
  }
  function Y(e2) {
    if (!(143360 & ~e2.getToken())) {
      const { index: n3 } = e2;
      let t3 = e2.currentChar;
      for (; 32770 & p[t3]; ) t3 = l(e2);
      e2.tokenValue += e2.source.slice(n3, e2.index), e2.setToken(208897, true);
    }
    return e2.getToken();
  }
  function Z(e2, n3) {
    !(1 & e2.flags) && 1048576 & ~e2.getToken() && t(e2, 30, N[255 & e2.getToken()]), Q(e2, n3, 1074790417) || e2.onInsertedSemicolon?.(e2.startIndex);
  }
  function W(e2, n3, t3, o3) {
    return n3 - t3 < 13 && "use strict" === o3 && (!(1048576 & ~e2.getToken()) || 1 & e2.flags) ? 1 : 0;
  }
  function K(e2, n3, t3) {
    return e2.getToken() !== t3 ? 0 : (J(e2, n3), 1);
  }
  function Q(e2, n3, t3) {
    return e2.getToken() === t3 && (J(e2, n3), true);
  }
  function ee(e2, n3, o3) {
    e2.getToken() !== o3 && t(e2, 25, N[255 & o3]), J(e2, n3);
  }
  function ne(e2, n3) {
    switch (n3.type) {
      case "ArrayExpression": {
        n3.type = "ArrayPattern";
        const { elements: t3 } = n3;
        for (let n4 = 0, o3 = t3.length; n4 < o3; ++n4) {
          const o4 = t3[n4];
          o4 && ne(e2, o4);
        }
        return;
      }
      case "ObjectExpression": {
        n3.type = "ObjectPattern";
        const { properties: t3 } = n3;
        for (let n4 = 0, o3 = t3.length; n4 < o3; ++n4) ne(e2, t3[n4]);
        return;
      }
      case "AssignmentExpression":
        return n3.type = "AssignmentPattern", "=" !== n3.operator && t(e2, 71), delete n3.operator, void ne(e2, n3.left);
      case "Property":
        return void ne(e2, n3.value);
      case "SpreadElement":
        n3.type = "RestElement", ne(e2, n3.argument);
    }
  }
  function te(e2, n3, o3, r3, a3) {
    256 & n3 && (36864 & ~r3 || t(e2, 118), a3 || 537079808 & ~r3 || t(e2, 119)), 20480 & ~r3 && -2147483528 !== r3 || t(e2, 102), 24 & o3 && 73 == (255 & r3) && t(e2, 100), 524800 & n3 && 209006 === r3 && t(e2, 110), 262400 & n3 && 241771 === r3 && t(e2, 97, "yield");
  }
  function oe(e2, n3, o3) {
    256 & n3 && (36864 & ~o3 || t(e2, 118), 537079808 & ~o3 || t(e2, 119), -2147483527 === o3 && t(e2, 95), -2147483528 === o3 && t(e2, 95)), 20480 & ~o3 || t(e2, 102), 524800 & n3 && 209006 === o3 && t(e2, 110), 262400 & n3 && 241771 === o3 && t(e2, 97, "yield");
  }
  function re(e2, n3, o3) {
    return 209006 === o3 && (524800 & n3 && t(e2, 110), e2.destructible |= 128), 241771 === o3 && 262144 & n3 && t(e2, 97, "yield"), !(20480 & ~o3 && 36864 & ~o3 && -2147483527 != o3);
  }
  function ae(e2, n3, o3, r3) {
    for (; n3; ) {
      if (n3["$" + o3]) return r3 && t(e2, 137), 1;
      r3 && n3.loop && (r3 = 0), n3 = n3.$;
    }
    return 0;
  }
  function ie(e2, n3, t3, o3, r3, a3) {
    return 2 & n3 && (a3.start = t3, a3.end = e2.startIndex, a3.range = [t3, e2.startIndex]), 4 & n3 && (a3.loc = { start: { line: o3, column: r3 }, end: { line: e2.startLine, column: e2.startColumn } }, e2.sourceFile && (a3.loc.source = e2.sourceFile)), a3;
  }
  function se(e2) {
    switch (e2.type) {
      case "JSXIdentifier":
        return e2.name;
      case "JSXNamespacedName":
        return e2.namespace + ":" + e2.name;
      case "JSXMemberExpression":
        return se(e2.object) + "." + se(e2.property);
    }
  }
  function le(e2, n3, t3) {
    const o3 = ue({ parent: void 0, type: 2 }, 1024);
    return ge(e2, n3, o3, t3, 1, 0), o3;
  }
  function ce(e2, n3, ...t3) {
    const { index: o3, line: r3, column: a3, tokenIndex: i3, tokenLine: s3, tokenColumn: l3 } = e2;
    return { type: n3, params: t3, index: o3, line: r3, column: a3, tokenIndex: i3, tokenLine: s3, tokenColumn: l3 };
  }
  function ue(e2, n3) {
    return { parent: e2, type: n3, scopeError: void 0 };
  }
  function de(e2, n3, t3, o3, r3, a3) {
    4 & r3 ? ke(e2, n3, t3, o3, r3) : ge(e2, n3, t3, o3, r3, a3), 64 & a3 && fe(e2, o3);
  }
  function ge(e2, n3, o3, r3, a3, i3) {
    const s3 = o3["#" + r3];
    !s3 || 2 & s3 || (1 & a3 ? o3.scopeError = ce(e2, 145, r3) : 64 & n3 && !(256 & n3) && 2 & i3 && 64 === s3 && 64 === a3 || t(e2, 145, r3)), 128 & o3.type && o3.parent["#" + r3] && !(2 & o3.parent["#" + r3]) && t(e2, 145, r3), 1024 & o3.type && s3 && !(2 & s3) && 1 & a3 && (o3.scopeError = ce(e2, 145, r3)), 64 & o3.type && 768 & o3.parent["#" + r3] && t(e2, 159, r3), o3["#" + r3] = a3;
  }
  function ke(e2, n3, o3, r3, a3) {
    let i3 = o3;
    for (; i3 && !(256 & i3.type); ) {
      const s3 = i3["#" + r3];
      248 & s3 && (64 & n3 && !(256 & n3) && (128 & a3 && 68 & s3 || 128 & s3 && 68 & a3) || t(e2, 145, r3)), i3 === o3 && 1 & s3 && 1 & a3 && (i3.scopeError = ce(e2, 145, r3)), (256 & s3 || 512 & s3 && !(64 & n3)) && t(e2, 145, r3), i3["#" + r3] = a3, i3 = i3.parent;
    }
  }
  function pe(e2, n3) {
    return n3["#" + e2] ? 1 : n3.parent ? pe(e2, n3.parent) : 0;
  }
  function fe(e2, n3) {
    void 0 !== e2.exportedNames && "" !== n3 && (e2.exportedNames["#" + n3] && t(e2, 147, n3), e2.exportedNames["#" + n3] = 1);
  }
  function me(e2, n3) {
    return 262400 & e2 ? !(512 & e2 && 209006 === n3) && (!(262144 & e2 && 241771 === n3) && !(12288 & ~n3)) : !(12288 & ~n3 && 36864 & ~n3);
  }
  function be(e2, n3, o3) {
    537079808 & ~o3 || (256 & n3 && t(e2, 119), e2.flags |= 512), me(n3, o3) || t(e2, 0);
  }
  function he(e2, n3, o3) {
    let a3, i3, s3, c3 = "";
    null != n3 && (n3.module && (o3 |= 768), n3.next && (o3 |= 1), n3.loc && (o3 |= 4), n3.ranges && (o3 |= 2), n3.uniqueKeyInPattern && (o3 |= 134217728), n3.lexical && (o3 |= 16), n3.webcompat && (o3 |= 64), n3.globalReturn && (o3 |= 1048576), n3.raw && (o3 |= 128), n3.preserveParens && (o3 |= 32), n3.impliedStrict && (o3 |= 256), n3.jsx && (o3 |= 8), n3.source && (c3 = n3.source), null != n3.onComment && (a3 = Array.isArray(n3.onComment) ? /* @__PURE__ */ function(e3, n4) {
      return function(t3, o4, r3, a4, i4) {
        const s4 = { type: t3, value: o4 };
        2 & e3 && (s4.start = r3, s4.end = a4, s4.range = [r3, a4]), 4 & e3 && (s4.loc = i4), n4.push(s4);
      };
    }(o3, n3.onComment) : n3.onComment), null != n3.onInsertedSemicolon && (i3 = n3.onInsertedSemicolon), null != n3.onToken && (s3 = Array.isArray(n3.onToken) ? /* @__PURE__ */ function(e3, n4) {
      return function(t3, o4, r3, a4) {
        const i4 = { token: t3 };
        2 & e3 && (i4.start = o4, i4.end = r3, i4.range = [o4, r3]), 4 & e3 && (i4.loc = a4), n4.push(i4);
      };
    }(o3, n3.onToken) : n3.onToken));
    const u2 = function(e3, n4, t3, o4, r3) {
      let a4 = 1048576, i4 = null;
      return { source: e3, flags: 0, index: 0, line: 1, column: 0, startIndex: 0, end: e3.length, tokenIndex: 0, startColumn: 0, tokenColumn: 0, tokenLine: 1, startLine: 1, sourceFile: n4, tokenValue: "", getToken: () => a4, setToken(e4, n5 = false) {
        if (o4) if (1048576 !== e4) {
          const t4 = { start: { line: this.tokenLine, column: this.tokenColumn }, end: { line: this.line, column: this.column } };
          !n5 && i4 && o4(...i4), i4 = [k(e4), this.tokenIndex, this.index, t4];
        } else i4 && (o4(...i4), i4 = null);
        return a4 = e4;
      }, tokenRaw: "", tokenRegExp: void 0, currentChar: e3.charCodeAt(0), exportedNames: [], exportedBindings: [], assignable: 1, destructible: 0, onComment: t3, onToken: o4, onInsertedSemicolon: r3, leadingDecorators: [] };
    }(e2, c3, a3, s3, i3);
    !function(e3) {
      const { source: n4 } = e3;
      35 === e3.currentChar && 33 === n4.charCodeAt(e3.index + 1) && (l(e3), l(e3), y(e3, n4, 0, 4, e3.tokenIndex, e3.tokenLine, e3.tokenColumn));
    }(u2);
    const d2 = 16 & o3 ? { parent: void 0, type: 2 } : void 0;
    let g3 = [], p3 = "script";
    if (512 & o3) {
      if (p3 = "module", g3 = function(e3, n4, t3) {
        J(e3, 8192 | n4);
        const o4 = [];
        for (; 134283267 === e3.getToken(); ) {
          const { tokenIndex: t4, tokenLine: r3, tokenColumn: a4 } = e3, i4 = e3.getToken();
          o4.push(Ie(e3, n4, un(e3, n4), i4, t4, r3, a4));
        }
        for (; 1048576 !== e3.getToken(); ) o4.push(xe(e3, n4, t3));
        return o4;
      }(u2, 2048 | o3, d2), d2) for (const e3 in u2.exportedBindings) "#" !== e3[0] || d2[e3] || t(u2, 148, e3.slice(1));
    } else g3 = function(e3, n4, t3) {
      J(e3, 67117056 | n4);
      const o4 = [];
      for (; 134283267 === e3.getToken(); ) {
        const { index: t4, tokenIndex: a4, tokenValue: i4, tokenLine: s4, tokenColumn: l3 } = e3, c4 = e3.getToken(), u3 = un(e3, n4);
        W(e3, t4, a4, i4) && (n4 |= 256, 64 & e3.flags && r(e3.tokenIndex, e3.tokenLine, e3.tokenColumn, e3.index, e3.line, e3.column, 9), 4096 & e3.flags && r(e3.tokenIndex, e3.tokenLine, e3.tokenColumn, e3.index, e3.line, e3.column, 15)), o4.push(Ie(e3, n4, u3, c4, a4, s4, l3));
      }
      for (; 1048576 !== e3.getToken(); ) o4.push(Te(e3, n4, t3, void 0, 4, {}));
      return o4;
    }(u2, 2048 | o3, d2);
    const f3 = { type: "Program", sourceType: p3, body: g3 };
    return 2 & o3 && (f3.start = 0, f3.end = e2.length, f3.range = [0, e2.length]), 4 & o3 && (f3.loc = { start: { line: 1, column: 0 }, end: { line: u2.line, column: u2.column } }, u2.sourceFile && (f3.loc.source = c3)), f3;
  }
  function xe(e2, n3, o3) {
    let r3;
    switch (e2.leadingDecorators = En(e2, n3, void 0), e2.getToken()) {
      case 20564:
        r3 = function(e3, n4, o4) {
          const r4 = e3.tokenIndex, a3 = e3.tokenLine, i3 = e3.tokenColumn;
          J(e3, 8192 | n4);
          const s3 = [];
          let l3 = null, c3 = null, u2 = null;
          if (Q(e3, 8192 | n4, 20561)) {
            switch (e3.getToken()) {
              case 86104:
                l3 = dn(e3, n4, o4, void 0, 4, 1, 1, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
                break;
              case 132:
              case 86094:
                l3 = qn(e3, n4, o4, void 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
                break;
              case 209005: {
                const { tokenIndex: t3, tokenLine: r5, tokenColumn: a4 } = e3;
                l3 = cn(e3, n4);
                const { flags: i4 } = e3;
                1 & i4 || (86104 === e3.getToken() ? l3 = dn(e3, n4, o4, void 0, 4, 1, 1, 1, t3, r5, a4) : 67174411 === e3.getToken() ? (l3 = In(e3, n4, void 0, l3, 1, 1, 0, i4, t3, r5, a4), l3 = _e(e3, n4, void 0, l3, 0, 0, t3, r5, a4), l3 = je(e3, n4, void 0, 0, 0, t3, r5, a4, l3)) : 143360 & e3.getToken() && (o4 && (o4 = le(e3, n4, e3.tokenValue)), l3 = cn(e3, n4), l3 = Cn(e3, n4, o4, void 0, [l3], 1, t3, r5, a4)));
                break;
              }
              default:
                l3 = Oe(e3, n4, void 0, 1, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn), Z(e3, 8192 | n4);
            }
            return o4 && fe(e3, "default"), ie(e3, n4, r4, a3, i3, { type: "ExportDefaultDeclaration", declaration: l3 });
          }
          switch (e3.getToken()) {
            case 8391476: {
              J(e3, n4);
              let s4 = null;
              Q(e3, n4, 77932) && (o4 && fe(e3, e3.tokenValue), s4 = nn(e3, n4)), ee(e3, n4, 12403), 134283267 !== e3.getToken() && t(e3, 105, "Export"), c3 = un(e3, n4);
              const l4 = { type: "ExportAllDeclaration", source: c3, exported: s4 };
              return 1 & n4 && (l4.attributes = Ke(e3, n4)), Z(e3, 8192 | n4), ie(e3, n4, r4, a3, i3, l4);
            }
            case 2162700: {
              J(e3, n4);
              const r5 = [], a4 = [];
              let i4 = 0;
              for (; 143360 & e3.getToken() || 134283267 === e3.getToken(); ) {
                const { tokenIndex: l4, tokenValue: c4, tokenLine: u3, tokenColumn: d3 } = e3, g3 = nn(e3, n4);
                let k3;
                "Literal" === g3.type && (i4 = 1), 77932 === e3.getToken() ? (J(e3, n4), 143360 & e3.getToken() || 134283267 === e3.getToken() || t(e3, 106), o4 && (r5.push(e3.tokenValue), a4.push(c4)), k3 = nn(e3, n4)) : (o4 && (r5.push(e3.tokenValue), a4.push(e3.tokenValue)), k3 = g3), s3.push(ie(e3, n4, l4, u3, d3, { type: "ExportSpecifier", local: g3, exported: k3 })), 1074790415 !== e3.getToken() && ee(e3, n4, 18);
              }
              ee(e3, n4, 1074790415), Q(e3, n4, 12403) ? (134283267 !== e3.getToken() && t(e3, 105, "Export"), c3 = un(e3, n4), 1 & n4 && (u2 = Ke(e3, n4, s3)), o4 && r5.forEach((n5) => fe(e3, n5))) : (i4 && t(e3, 172), o4 && (r5.forEach((n5) => fe(e3, n5)), a4.forEach((n5) => function(e4, n6) {
                void 0 !== e4.exportedBindings && "" !== n6 && (e4.exportedBindings["#" + n6] = 1);
              }(e3, n5)))), Z(e3, 8192 | n4);
              break;
            }
            case 86094:
              l3 = qn(e3, n4, o4, void 0, 2, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
              break;
            case 86104:
              l3 = dn(e3, n4, o4, void 0, 4, 1, 2, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
              break;
            case 241737:
              l3 = Se(e3, n4, o4, void 0, 8, 64, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
              break;
            case 86090:
              l3 = Se(e3, n4, o4, void 0, 16, 64, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
              break;
            case 86088:
              l3 = Ae(e3, n4, o4, void 0, 64, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
              break;
            case 209005: {
              const { tokenIndex: t3, tokenLine: r5, tokenColumn: a4 } = e3;
              if (J(e3, n4), !(1 & e3.flags) && 86104 === e3.getToken()) {
                l3 = dn(e3, n4, o4, void 0, 4, 1, 2, 1, t3, r5, a4);
                break;
              }
            }
            default:
              t(e3, 30, N[255 & e3.getToken()]);
          }
          const d2 = { type: "ExportNamedDeclaration", declaration: l3, specifiers: s3, source: c3 };
          u2 && (d2.attributes = u2);
          return ie(e3, n4, r4, a3, i3, d2);
        }(e2, n3, o3);
        break;
      case 86106:
        r3 = function(e3, n4, o4) {
          const r4 = e3.tokenIndex, a3 = e3.tokenLine, i3 = e3.tokenColumn;
          J(e3, n4);
          let s3 = null;
          const { tokenIndex: l3, tokenLine: c3, tokenColumn: u2 } = e3;
          let d2 = [];
          if (134283267 === e3.getToken()) s3 = un(e3, n4);
          else {
            if (143360 & e3.getToken()) {
              if (d2 = [ie(e3, n4, l3, c3, u2, { type: "ImportDefaultSpecifier", local: Re(e3, n4, o4) })], Q(e3, n4, 18)) switch (e3.getToken()) {
                case 8391476:
                  d2.push(Ne(e3, n4, o4));
                  break;
                case 2162700:
                  Ue(e3, n4, o4, d2);
                  break;
                default:
                  t(e3, 107);
              }
            } else switch (e3.getToken()) {
              case 8391476:
                d2 = [Ne(e3, n4, o4)];
                break;
              case 2162700:
                Ue(e3, n4, o4, d2);
                break;
              case 67174411:
                return Be(e3, n4, void 0, r4, a3, i3);
              case 67108877:
                return Pe(e3, n4, r4, a3, i3);
              default:
                t(e3, 30, N[255 & e3.getToken()]);
            }
            s3 = function(e4, n5) {
              ee(e4, n5, 12403), 134283267 !== e4.getToken() && t(e4, 105, "Import");
              return un(e4, n5);
            }(e3, n4);
          }
          const g3 = { type: "ImportDeclaration", specifiers: d2, source: s3 };
          1 & n4 && (g3.attributes = Ke(e3, n4, d2));
          return Z(e3, 8192 | n4), ie(e3, n4, r4, a3, i3, g3);
        }(e2, n3, o3);
        break;
      default:
        r3 = Te(e2, n3, o3, void 0, 4, {});
    }
    return e2.leadingDecorators.length && t(e2, 170), r3;
  }
  function Te(e2, n3, o3, r3, a3, i3) {
    const s3 = e2.tokenIndex, l3 = e2.tokenLine, c3 = e2.tokenColumn;
    switch (e2.getToken()) {
      case 86104:
        return dn(e2, n3, o3, r3, a3, 1, 0, 0, s3, l3, c3);
      case 132:
      case 86094:
        return qn(e2, n3, o3, r3, 0, s3, l3, c3);
      case 86090:
        return Se(e2, n3, o3, r3, 16, 0, s3, l3, c3);
      case 241737:
        return function(e3, n4, o4, r4, a4, i4, s4, l4) {
          const { tokenValue: c4 } = e3, u2 = e3.getToken();
          let d2 = cn(e3, n4);
          if (2240512 & e3.getToken()) {
            const t3 = De(e3, n4, o4, r4, 8, 0);
            return Z(e3, 8192 | n4), ie(e3, n4, i4, s4, l4, { type: "VariableDeclaration", kind: "let", declarations: t3 });
          }
          e3.assignable = 1, 256 & n4 && t(e3, 85);
          if (21 === e3.getToken()) return we(e3, n4, o4, r4, a4, {}, c4, d2, u2, 0, i4, s4, l4);
          if (10 === e3.getToken()) {
            let t3;
            16 & n4 && (t3 = le(e3, n4, c4)), e3.flags = 128 ^ (128 | e3.flags), d2 = Cn(e3, n4, t3, r4, [d2], 0, i4, s4, l4);
          } else d2 = _e(e3, n4, r4, d2, 0, 0, i4, s4, l4), d2 = je(e3, n4, r4, 0, 0, i4, s4, l4, d2);
          18 === e3.getToken() && (d2 = Ge(e3, n4, r4, 0, i4, s4, l4, d2));
          return ve(e3, n4, d2, i4, s4, l4);
        }(e2, n3, o3, r3, a3, s3, l3, c3);
      case 20564:
        t(e2, 103, "export");
      case 86106:
        switch (J(e2, n3), e2.getToken()) {
          case 67174411:
            return Be(e2, n3, r3, s3, l3, c3);
          case 67108877:
            return Pe(e2, n3, s3, l3, c3);
          default:
            t(e2, 103, "import");
        }
      case 209005:
        return Le(e2, n3, o3, r3, a3, i3, 1, s3, l3, c3);
      default:
        return ye(e2, n3, o3, r3, a3, i3, 1, s3, l3, c3);
    }
  }
  function ye(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2) {
    switch (e2.getToken()) {
      case 86088:
        return Ae(e2, n3, o3, r3, 0, l3, c3, u2);
      case 20572:
        return function(e3, n4, o4, r4, a4, i4) {
          1048576 & n4 || t(e3, 92);
          J(e3, 8192 | n4);
          const s4 = 1 & e3.flags || 1048576 & e3.getToken() ? null : Fe(e3, n4, o4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          return Z(e3, 8192 | n4), ie(e3, n4, r4, a4, i4, { type: "ReturnStatement", argument: s4 });
        }(e2, n3, r3, l3, c3, u2);
      case 20569:
        return function(e3, n4, t3, o4, r4, a4, i4, s4) {
          J(e3, n4), ee(e3, 8192 | n4, 67174411), e3.assignable = 1;
          const l4 = Fe(e3, n4, o4, 0, 1, e3.tokenIndex, e3.line, e3.tokenColumn);
          ee(e3, 8192 | n4, 16);
          const c4 = qe(e3, n4, t3, o4, r4, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          let u3 = null;
          20563 === e3.getToken() && (J(e3, 8192 | n4), u3 = qe(e3, n4, t3, o4, r4, e3.tokenIndex, e3.tokenLine, e3.tokenColumn));
          return ie(e3, n4, a4, i4, s4, { type: "IfStatement", test: l4, consequent: c4, alternate: u3 });
        }(e2, n3, o3, r3, i3, l3, c3, u2);
      case 20567:
        return function(e3, n4, o4, r4, a4, i4, s4, l4) {
          J(e3, n4);
          const c4 = ((524288 & n4) > 0 || (512 & n4) > 0 && (2048 & n4) > 0) && Q(e3, n4, 209006);
          ee(e3, 8192 | n4, 67174411), o4 && (o4 = ue(o4, 1));
          let u3, d2 = null, g3 = null, k3 = 0, p3 = null, f3 = 86088 === e3.getToken() || 241737 === e3.getToken() || 86090 === e3.getToken();
          const { tokenIndex: m2, tokenLine: b3, tokenColumn: h2 } = e3, x2 = e3.getToken();
          f3 ? 241737 === x2 ? (p3 = cn(e3, n4), 2240512 & e3.getToken() ? (8673330 === e3.getToken() ? 256 & n4 && t(e3, 67) : p3 = ie(e3, n4, m2, b3, h2, { type: "VariableDeclaration", kind: "let", declarations: De(e3, 33554432 | n4, o4, r4, 8, 32) }), e3.assignable = 1) : 256 & n4 ? t(e3, 67) : (f3 = false, e3.assignable = 1, p3 = _e(e3, n4, r4, p3, 0, 0, m2, b3, h2), 274548 === e3.getToken() && t(e3, 115))) : (J(e3, n4), p3 = ie(e3, n4, m2, b3, h2, 86088 === x2 ? { type: "VariableDeclaration", kind: "var", declarations: De(e3, 33554432 | n4, o4, r4, 4, 32) } : { type: "VariableDeclaration", kind: "const", declarations: De(e3, 33554432 | n4, o4, r4, 16, 32) }), e3.assignable = 1) : 1074790417 === x2 ? c4 && t(e3, 82) : 2097152 & ~x2 ? p3 = Xe(e3, 33554432 | n4, r4, 1, 0, 1, m2, b3, h2) : (p3 = 2162700 === x2 ? bn(e3, n4, void 0, r4, 1, 0, 0, 2, 32, m2, b3, h2) : kn(e3, n4, void 0, r4, 1, 0, 0, 2, 32, m2, b3, h2), k3 = e3.destructible, 64 & k3 && t(e3, 63), e3.assignable = 16 & k3 ? 2 : 1, p3 = _e(e3, 33554432 | n4, r4, p3, 0, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn));
          if (!(262144 & ~e3.getToken())) {
            if (274548 === e3.getToken()) {
              2 & e3.assignable && t(e3, 80, c4 ? "await" : "of"), ne(e3, p3), J(e3, 8192 | n4), u3 = Oe(e3, n4, r4, 1, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn), ee(e3, 8192 | n4, 16);
              return ie(e3, n4, i4, s4, l4, { type: "ForOfStatement", left: p3, right: u3, body: Ee(e3, n4, o4, r4, a4), await: c4 });
            }
            2 & e3.assignable && t(e3, 80, "in"), ne(e3, p3), J(e3, 8192 | n4), c4 && t(e3, 82), u3 = Fe(e3, n4, r4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn), ee(e3, 8192 | n4, 16);
            return ie(e3, n4, i4, s4, l4, { type: "ForInStatement", body: Ee(e3, n4, o4, r4, a4), left: p3, right: u3 });
          }
          c4 && t(e3, 82);
          f3 || (8 & k3 && 1077936155 !== e3.getToken() && t(e3, 80, "loop"), p3 = je(e3, 33554432 | n4, r4, 0, 0, m2, b3, h2, p3));
          18 === e3.getToken() && (p3 = Ge(e3, n4, r4, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn, p3));
          ee(e3, 8192 | n4, 1074790417), 1074790417 !== e3.getToken() && (d2 = Fe(e3, n4, r4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn));
          ee(e3, 8192 | n4, 1074790417), 16 !== e3.getToken() && (g3 = Fe(e3, n4, r4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn));
          ee(e3, 8192 | n4, 16);
          const T2 = Ee(e3, n4, o4, r4, a4);
          return ie(e3, n4, i4, s4, l4, { type: "ForStatement", init: p3, test: d2, update: g3, body: T2 });
        }(e2, n3, o3, r3, i3, l3, c3, u2);
      case 20562:
        return function(e3, n4, t3, o4, r4, a4, i4, s4) {
          J(e3, 8192 | n4);
          const l4 = Ee(e3, n4, t3, o4, r4);
          ee(e3, n4, 20578), ee(e3, 8192 | n4, 67174411);
          const c4 = Fe(e3, n4, o4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          return ee(e3, 8192 | n4, 16), Q(e3, 8192 | n4, 1074790417), ie(e3, n4, a4, i4, s4, { type: "DoWhileStatement", body: l4, test: c4 });
        }(e2, n3, o3, r3, i3, l3, c3, u2);
      case 20578:
        return function(e3, n4, t3, o4, r4, a4, i4, s4) {
          J(e3, n4), ee(e3, 8192 | n4, 67174411);
          const l4 = Fe(e3, n4, o4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          ee(e3, 8192 | n4, 16);
          const c4 = Ee(e3, n4, t3, o4, r4);
          return ie(e3, n4, a4, i4, s4, { type: "WhileStatement", test: l4, body: c4 });
        }(e2, n3, o3, r3, i3, l3, c3, u2);
      case 86110:
        return function(e3, n4, o4, r4, a4, i4, s4, l4) {
          J(e3, n4), ee(e3, 8192 | n4, 67174411);
          const c4 = Fe(e3, n4, r4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          ee(e3, n4, 16), ee(e3, n4, 2162700);
          const u3 = [];
          let d2 = 0;
          o4 && (o4 = ue(o4, 8));
          for (; 1074790415 !== e3.getToken(); ) {
            const { tokenIndex: i5, tokenLine: s5, tokenColumn: l5 } = e3;
            let c5 = null;
            const g3 = [];
            for (Q(e3, 8192 | n4, 20556) ? c5 = Fe(e3, n4, r4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn) : (ee(e3, 8192 | n4, 20561), d2 && t(e3, 89), d2 = 1), ee(e3, 8192 | n4, 21); 20556 !== e3.getToken() && 1074790415 !== e3.getToken() && 20561 !== e3.getToken(); ) g3.push(Te(e3, 1024 | n4, o4, r4, 2, { $: a4 }));
            u3.push(ie(e3, n4, i5, s5, l5, { type: "SwitchCase", test: c5, consequent: g3 }));
          }
          return ee(e3, 8192 | n4, 1074790415), ie(e3, n4, i4, s4, l4, { type: "SwitchStatement", discriminant: c4, cases: u3 });
        }(e2, n3, o3, r3, i3, l3, c3, u2);
      case 1074790417:
        return function(e3, n4, t3, o4, r4) {
          return J(e3, 8192 | n4), ie(e3, n4, t3, o4, r4, { type: "EmptyStatement" });
        }(e2, n3, l3, c3, u2);
      case 2162700:
        return Ce(e2, n3, o3 ? ue(o3, 2) : o3, r3, i3, l3, c3, u2);
      case 86112:
        return function(e3, n4, o4, r4, a4, i4) {
          J(e3, 8192 | n4), 1 & e3.flags && t(e3, 90);
          const s4 = Fe(e3, n4, o4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          return Z(e3, 8192 | n4), ie(e3, n4, r4, a4, i4, { type: "ThrowStatement", argument: s4 });
        }(e2, n3, r3, l3, c3, u2);
      case 20555:
        return function(e3, n4, o4, r4, a4, i4) {
          J(e3, 8192 | n4);
          let s4 = null;
          if (!(1 & e3.flags) && 143360 & e3.getToken()) {
            const { tokenValue: r5 } = e3;
            s4 = cn(e3, 8192 | n4), ae(e3, o4, r5, 0) || t(e3, 138, r5);
          } else 33792 & n4 || t(e3, 69);
          return Z(e3, 8192 | n4), ie(e3, n4, r4, a4, i4, { type: "BreakStatement", label: s4 });
        }(e2, n3, i3, l3, c3, u2);
      case 20559:
        return function(e3, n4, o4, r4, a4, i4) {
          32768 & n4 || t(e3, 68);
          J(e3, n4);
          let s4 = null;
          if (!(1 & e3.flags) && 143360 & e3.getToken()) {
            const { tokenValue: r5 } = e3;
            s4 = cn(e3, 8192 | n4), ae(e3, o4, r5, 1) || t(e3, 138, r5);
          }
          return Z(e3, 8192 | n4), ie(e3, n4, r4, a4, i4, { type: "ContinueStatement", label: s4 });
        }(e2, n3, i3, l3, c3, u2);
      case 20577:
        return function(e3, n4, o4, r4, a4, i4, s4, l4) {
          J(e3, 8192 | n4);
          const c4 = o4 ? ue(o4, 32) : void 0, u3 = Ce(e3, n4, c4, r4, { $: a4 }, e3.tokenIndex, e3.tokenLine, e3.tokenColumn), { tokenIndex: d2, tokenLine: g3, tokenColumn: k3 } = e3, p3 = Q(e3, 8192 | n4, 20557) ? function(e4, n5, o5, r5, a5, i5, s5, l5) {
            let c5 = null, u4 = o5;
            Q(e4, n5, 67174411) && (o5 && (o5 = ue(o5, 4)), c5 = Nn(e4, n5, o5, r5, 2097152 & ~e4.getToken() ? 512 : 256, 0, e4.tokenIndex, e4.tokenLine, e4.tokenColumn), 18 === e4.getToken() ? t(e4, 86) : 1077936155 === e4.getToken() && t(e4, 87), ee(e4, 8192 | n5, 16));
            o5 && (u4 = ue(o5, 64));
            const d3 = Ce(e4, n5, u4, r5, { $: a5 }, e4.tokenIndex, e4.tokenLine, e4.tokenColumn);
            return ie(e4, n5, i5, s5, l5, { type: "CatchClause", param: c5, body: d3 });
          }(e3, n4, o4, r4, a4, d2, g3, k3) : null;
          let f3 = null;
          if (20566 === e3.getToken()) {
            J(e3, 8192 | n4);
            f3 = Ce(e3, n4, c4 ? ue(o4, 4) : void 0, r4, { $: a4 }, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          }
          p3 || f3 || t(e3, 88);
          return ie(e3, n4, i4, s4, l4, { type: "TryStatement", block: u3, handler: p3, finalizer: f3 });
        }(e2, n3, o3, r3, i3, l3, c3, u2);
      case 20579:
        return function(e3, n4, o4, r4, a4, i4, s4, l4) {
          J(e3, n4), 256 & n4 && t(e3, 91);
          ee(e3, 8192 | n4, 67174411);
          const c4 = Fe(e3, n4, r4, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          ee(e3, 8192 | n4, 16);
          const u3 = ye(e3, n4, o4, r4, 2, a4, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          return ie(e3, n4, i4, s4, l4, { type: "WithStatement", object: c4, body: u3 });
        }(e2, n3, o3, r3, i3, l3, c3, u2);
      case 20560:
        return function(e3, n4, t3, o4, r4) {
          return J(e3, 8192 | n4), Z(e3, 8192 | n4), ie(e3, n4, t3, o4, r4, { type: "DebuggerStatement" });
        }(e2, n3, l3, c3, u2);
      case 209005:
        return Le(e2, n3, o3, r3, a3, i3, 0, l3, c3, u2);
      case 20557:
        t(e2, 162);
      case 20566:
        t(e2, 163);
      case 86104:
        t(e2, 256 & n3 ? 76 : 64 & n3 ? 77 : 78);
      case 86094:
        t(e2, 79);
      default:
        return function(e3, n4, o4, r4, a4, i4, s4, l4, c4, u3) {
          const { tokenValue: d2 } = e3, g3 = e3.getToken();
          let k3;
          if (241737 === g3) k3 = cn(e3, n4), 256 & n4 && t(e3, 85), 69271571 === e3.getToken() && t(e3, 84);
          else k3 = Ye(e3, n4, r4, 2, 0, 1, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          if (143360 & g3 && 21 === e3.getToken()) return we(e3, n4, o4, r4, a4, i4, d2, k3, g3, s4, l4, c4, u3);
          k3 = _e(e3, n4, r4, k3, 0, 0, l4, c4, u3), k3 = je(e3, n4, r4, 0, 0, l4, c4, u3, k3), 18 === e3.getToken() && (k3 = Ge(e3, n4, r4, 0, l4, c4, u3, k3));
          return ve(e3, n4, k3, l4, c4, u3);
        }(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2);
    }
  }
  function Ce(e2, n3, t3, o3, r3, a3, i3, s3) {
    const l3 = [];
    for (ee(e2, 8192 | n3, 2162700); 1074790415 !== e2.getToken(); ) l3.push(Te(e2, n3, t3, o3, 2, { $: r3 }));
    return ee(e2, 8192 | n3, 1074790415), ie(e2, n3, a3, i3, s3, { type: "BlockStatement", body: l3 });
  }
  function ve(e2, n3, t3, o3, r3, a3) {
    return Z(e2, 8192 | n3), ie(e2, n3, o3, r3, a3, { type: "ExpressionStatement", expression: t3 });
  }
  function we(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2, d2, g3, k3) {
    te(e2, n3, 0, c3, 1), function(e3, n4, o4) {
      let r4 = n4;
      for (; r4; ) r4["$" + o4] && t(e3, 136, o4), r4 = r4.$;
      n4["$" + o4] = 1;
    }(e2, i3, s3), J(e2, 8192 | n3);
    const p3 = u2 && !(256 & n3) && 64 & n3 && 86104 === e2.getToken() ? dn(e2, n3, ue(o3, 2), r3, a3, 0, 0, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) : ye(e2, n3, o3, r3, a3, i3, u2, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
    return ie(e2, n3, d2, g3, k3, { type: "LabeledStatement", label: l3, body: p3 });
  }
  function Le(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2) {
    const { tokenValue: d2 } = e2, g3 = e2.getToken();
    let k3 = cn(e2, n3);
    if (21 === e2.getToken()) return we(e2, n3, o3, r3, a3, i3, d2, k3, g3, 1, l3, c3, u2);
    const p3 = 1 & e2.flags;
    if (!p3) {
      if (86104 === e2.getToken()) return s3 || t(e2, 123), dn(e2, n3, o3, r3, a3, 1, 0, 1, l3, c3, u2);
      if (me(n3, e2.getToken())) return k3 = Ln(e2, n3, r3, 1, l3, c3, u2), 18 === e2.getToken() && (k3 = Ge(e2, n3, r3, 0, l3, c3, u2, k3)), ve(e2, n3, k3, l3, c3, u2);
    }
    return 67174411 === e2.getToken() ? k3 = In(e2, n3, r3, k3, 1, 1, 0, p3, l3, c3, u2) : (10 === e2.getToken() && (be(e2, n3, g3), 36864 & ~g3 || (e2.flags |= 256), k3 = Tn(e2, 524288 | n3, r3, e2.tokenValue, k3, 0, 1, 0, l3, c3, u2)), e2.assignable = 1), k3 = _e(e2, n3, r3, k3, 0, 0, l3, c3, u2), k3 = je(e2, n3, r3, 0, 0, l3, c3, u2, k3), e2.assignable = 1, 18 === e2.getToken() && (k3 = Ge(e2, n3, r3, 0, l3, c3, u2, k3)), ve(e2, n3, k3, l3, c3, u2);
  }
  function Ie(e2, n3, t3, o3, r3, a3, i3) {
    const s3 = e2.startIndex;
    return 1074790417 !== o3 && (e2.assignable = 2, t3 = _e(e2, n3, void 0, t3, 0, 0, r3, a3, i3), 1074790417 !== e2.getToken() && (t3 = je(e2, n3, void 0, 0, 0, r3, a3, i3, t3), 18 === e2.getToken() && (t3 = Ge(e2, n3, void 0, 0, r3, a3, i3, t3))), Z(e2, 8192 | n3)), "Literal" === t3.type && "string" == typeof t3.value ? ie(e2, n3, r3, a3, i3, { type: "ExpressionStatement", expression: t3, directive: e2.source.slice(r3 + 1, s3 - 1) }) : ie(e2, n3, r3, a3, i3, { type: "ExpressionStatement", expression: t3 });
  }
  function qe(e2, n3, t3, o3, r3, a3, i3, s3) {
    return 256 & n3 || !(64 & n3) || 86104 !== e2.getToken() ? ye(e2, n3, t3, o3, 0, { $: r3 }, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) : dn(e2, n3, ue(t3, 2), o3, 0, 0, 0, 0, a3, i3, s3);
  }
  function Ee(e2, n3, t3, o3, r3) {
    return ye(e2, 33554432 ^ (33554432 | n3) | 32768, t3, o3, 0, { loop: 1, $: r3 }, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
  }
  function Se(e2, n3, t3, o3, r3, a3, i3, s3, l3) {
    J(e2, n3);
    const c3 = De(e2, n3, t3, o3, r3, a3);
    return Z(e2, 8192 | n3), ie(e2, n3, i3, s3, l3, { type: "VariableDeclaration", kind: 8 & r3 ? "let" : "const", declarations: c3 });
  }
  function Ae(e2, n3, t3, o3, r3, a3, i3, s3) {
    J(e2, n3);
    const l3 = De(e2, n3, t3, o3, 4, r3);
    return Z(e2, 8192 | n3), ie(e2, n3, a3, i3, s3, { type: "VariableDeclaration", kind: "var", declarations: l3 });
  }
  function De(e2, n3, o3, r3, a3, i3) {
    let s3 = 1;
    const l3 = [Ve(e2, n3, o3, r3, a3, i3)];
    for (; Q(e2, n3, 18); ) s3++, l3.push(Ve(e2, n3, o3, r3, a3, i3));
    return s3 > 1 && 32 & i3 && 262144 & e2.getToken() && t(e2, 61, N[255 & e2.getToken()]), l3;
  }
  function Ve(e2, n3, o3, a3, i3, s3) {
    const { tokenIndex: l3, tokenLine: c3, tokenColumn: u2 } = e2, d2 = e2.getToken();
    let g3 = null;
    const k3 = Nn(e2, n3, o3, a3, i3, s3, l3, c3, u2);
    return 1077936155 === e2.getToken() ? (J(e2, 8192 | n3), g3 = Oe(e2, n3, a3, 1, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn), !(32 & s3) && 2097152 & d2 || (274548 === e2.getToken() || 8673330 === e2.getToken() && (2097152 & d2 || !(4 & i3) || 256 & n3)) && r(l3, c3, u2, e2.index, e2.line, e2.column, 60, 274548 === e2.getToken() ? "of" : "in")) : (16 & i3 || (2097152 & d2) > 0) && 262144 & ~e2.getToken() && t(e2, 59, 16 & i3 ? "const" : "destructuring"), ie(e2, n3, l3, c3, u2, { type: "VariableDeclarator", id: k3, init: g3 });
  }
  function Re(e2, n3, o3) {
    return me(n3, e2.getToken()) || t(e2, 118), 537079808 & ~e2.getToken() || t(e2, 119), o3 && ge(e2, n3, o3, e2.tokenValue, 8, 0), cn(e2, n3);
  }
  function Ne(e2, n3, t3) {
    const { tokenIndex: o3, tokenLine: a3, tokenColumn: i3 } = e2;
    return J(e2, n3), ee(e2, n3, 77932), 134217728 & ~e2.getToken() || r(o3, a3, i3, e2.index, e2.line, e2.column, 30, N[255 & e2.getToken()]), ie(e2, n3, o3, a3, i3, { type: "ImportNamespaceSpecifier", local: Re(e2, n3, t3) });
  }
  function Ue(e2, n3, o3, r3) {
    for (J(e2, n3); 143360 & e2.getToken() || 134283267 === e2.getToken(); ) {
      let { tokenValue: a3, tokenIndex: i3, tokenLine: s3, tokenColumn: l3 } = e2;
      const c3 = e2.getToken(), u2 = nn(e2, n3);
      let d2;
      Q(e2, n3, 77932) ? (134217728 & ~e2.getToken() && 18 !== e2.getToken() ? te(e2, n3, 16, e2.getToken(), 0) : t(e2, 106), a3 = e2.tokenValue, d2 = cn(e2, n3)) : "Identifier" === u2.type ? (te(e2, n3, 16, c3, 0), d2 = u2) : t(e2, 25, N[108]), o3 && ge(e2, n3, o3, a3, 8, 0), r3.push(ie(e2, n3, i3, s3, l3, { type: "ImportSpecifier", local: d2, imported: u2 })), 1074790415 !== e2.getToken() && ee(e2, n3, 18);
    }
    return ee(e2, n3, 1074790415), r3;
  }
  function Pe(e2, n3, t3, o3, r3) {
    let a3 = Ze(e2, n3, ie(e2, n3, t3, o3, r3, { type: "Identifier", name: "import" }), t3, o3, r3);
    return a3 = _e(e2, n3, void 0, a3, 0, 0, t3, o3, r3), a3 = je(e2, n3, void 0, 0, 0, t3, o3, r3, a3), 18 === e2.getToken() && (a3 = Ge(e2, n3, void 0, 0, t3, o3, r3, a3)), ve(e2, n3, a3, t3, o3, r3);
  }
  function Be(e2, n3, t3, o3, r3, a3) {
    let i3 = We(e2, n3, t3, 0, o3, r3, a3);
    return i3 = _e(e2, n3, t3, i3, 0, 0, o3, r3, a3), 18 === e2.getToken() && (i3 = Ge(e2, n3, t3, 0, o3, r3, a3, i3)), ve(e2, n3, i3, o3, r3, a3);
  }
  function Oe(e2, n3, t3, o3, r3, a3, i3, s3) {
    let l3 = Ye(e2, n3, t3, 2, 0, o3, r3, 1, a3, i3, s3);
    return l3 = _e(e2, n3, t3, l3, r3, 0, a3, i3, s3), je(e2, n3, t3, r3, 0, a3, i3, s3, l3);
  }
  function Ge(e2, n3, t3, o3, r3, a3, i3, s3) {
    const l3 = [s3];
    for (; Q(e2, 8192 | n3, 18); ) l3.push(Oe(e2, n3, t3, 1, o3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn));
    return ie(e2, n3, r3, a3, i3, { type: "SequenceExpression", expressions: l3 });
  }
  function Fe(e2, n3, t3, o3, r3, a3, i3, s3) {
    const l3 = Oe(e2, n3, t3, r3, o3, a3, i3, s3);
    return 18 === e2.getToken() ? Ge(e2, n3, t3, o3, a3, i3, s3, l3) : l3;
  }
  function je(e2, n3, o3, r3, a3, i3, s3, l3, c3) {
    const u2 = e2.getToken();
    if (!(4194304 & ~u2)) {
      2 & e2.assignable && t(e2, 26), (!a3 && 1077936155 === u2 && "ArrayExpression" === c3.type || "ObjectExpression" === c3.type) && ne(e2, c3), J(e2, 8192 | n3);
      const d2 = Oe(e2, n3, o3, 1, r3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
      return e2.assignable = 2, ie(e2, n3, i3, s3, l3, a3 ? { type: "AssignmentPattern", left: c3, right: d2 } : { type: "AssignmentExpression", left: c3, operator: N[255 & u2], right: d2 });
    }
    return 8388608 & ~u2 || (c3 = Me(e2, n3, o3, r3, i3, s3, l3, 4, u2, c3)), Q(e2, 8192 | n3, 22) && (c3 = He(e2, n3, o3, c3, i3, s3, l3)), c3;
  }
  function Je(e2, n3, t3, o3, r3, a3, i3, s3, l3) {
    const c3 = e2.getToken();
    J(e2, 8192 | n3);
    const u2 = Oe(e2, n3, t3, 1, o3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
    return l3 = ie(e2, n3, a3, i3, s3, r3 ? { type: "AssignmentPattern", left: l3, right: u2 } : { type: "AssignmentExpression", left: l3, operator: N[255 & c3], right: u2 }), e2.assignable = 2, l3;
  }
  function He(e2, n3, t3, o3, r3, a3, i3) {
    const s3 = Oe(e2, 33554432 ^ (33554432 | n3), t3, 1, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
    ee(e2, 8192 | n3, 21), e2.assignable = 1;
    const l3 = Oe(e2, n3, t3, 1, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
    return e2.assignable = 2, ie(e2, n3, r3, a3, i3, { type: "ConditionalExpression", test: o3, consequent: s3, alternate: l3 });
  }
  function Me(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2) {
    const d2 = 8673330 & -((33554432 & n3) > 0);
    let g3, k3;
    for (e2.assignable = 2; 8388608 & e2.getToken() && (g3 = e2.getToken(), k3 = 3840 & g3, (524288 & g3 && 268435456 & c3 || 524288 & c3 && 268435456 & g3) && t(e2, 165), !(k3 + ((8391735 === g3) << 8) - ((d2 === g3) << 12) <= l3)); ) J(e2, 8192 | n3), u2 = ie(e2, n3, a3, i3, s3, { type: 524288 & g3 || 268435456 & g3 ? "LogicalExpression" : "BinaryExpression", left: u2, right: Me(e2, n3, o3, r3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn, k3, g3, Xe(e2, n3, o3, 0, r3, 1, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)), operator: N[255 & g3] });
    return 1077936155 === e2.getToken() && t(e2, 26), u2;
  }
  function ze(e2, n3, a3, i3, s3, l3, c3) {
    const { tokenIndex: u2, tokenLine: d2, tokenColumn: g3 } = e2;
    ee(e2, 8192 | n3, 2162700);
    const k3 = [];
    if (1074790415 !== e2.getToken()) {
      for (; 134283267 === e2.getToken(); ) {
        const { index: t3, tokenIndex: a4, tokenValue: i4 } = e2, s4 = e2.getToken(), l4 = un(e2, n3);
        W(e2, t3, a4, i4) && (n3 |= 256, 128 & e2.flags && r(a4, d2, g3, e2.index, e2.line, e2.column, 66), 64 & e2.flags && r(a4, d2, g3, e2.index, e2.line, e2.column, 9), 4096 & e2.flags && r(a4, d2, g3, e2.index, e2.line, e2.column, 15), c3 && o(c3)), k3.push(Ie(e2, n3, l4, s4, a4, e2.tokenLine, e2.tokenColumn));
      }
      256 & n3 && (l3 && (537079808 & ~l3 || t(e2, 119), 36864 & ~l3 || t(e2, 40)), 512 & e2.flags && t(e2, 119), 256 & e2.flags && t(e2, 118));
    }
    for (e2.flags = 4928 ^ (4928 | e2.flags), e2.destructible = 256 ^ (256 | e2.destructible); 1074790415 !== e2.getToken(); ) k3.push(Te(e2, n3, a3, i3, 4, {}));
    return ee(e2, 24 & s3 ? 8192 | n3 : n3, 1074790415), e2.flags &= -4289, 1077936155 === e2.getToken() && t(e2, 26), ie(e2, n3, u2, d2, g3, { type: "BlockStatement", body: k3 });
  }
  function Xe(e2, n3, t3, o3, r3, a3, i3, s3, l3) {
    return _e(e2, n3, t3, Ye(e2, n3, t3, 2, 0, o3, r3, a3, i3, s3, l3), r3, 0, i3, s3, l3);
  }
  function _e(e2, n3, o3, r3, a3, i3, s3, l3, c3) {
    if (33619968 & ~e2.getToken() || 1 & e2.flags) {
      if (!(67108864 & ~e2.getToken())) {
        switch (n3 = 33554432 ^ (33554432 | n3), e2.getToken()) {
          case 67108877:
            J(e2, 2048 ^ (67110912 | n3)), 4096 & n3 && 130 === e2.getToken() && "super" === e2.tokenValue && t(e2, 173), e2.assignable = 1;
            r3 = ie(e2, n3, s3, l3, c3, { type: "MemberExpression", object: r3, computed: false, property: $e(e2, 16384 | n3, o3) });
            break;
          case 69271571: {
            let t3 = false;
            2048 & ~e2.flags || (t3 = true, e2.flags = 2048 ^ (2048 | e2.flags)), J(e2, 8192 | n3);
            const { tokenIndex: i4, tokenLine: u2, tokenColumn: d2 } = e2, g3 = Fe(e2, n3, o3, a3, 1, i4, u2, d2);
            ee(e2, n3, 20), e2.assignable = 1, r3 = ie(e2, n3, s3, l3, c3, { type: "MemberExpression", object: r3, computed: true, property: g3 }), t3 && (e2.flags |= 2048);
            break;
          }
          case 67174411: {
            if (!(1024 & ~e2.flags)) return e2.flags = 1024 ^ (1024 | e2.flags), r3;
            let t3 = false;
            2048 & ~e2.flags || (t3 = true, e2.flags = 2048 ^ (2048 | e2.flags));
            const i4 = ln(e2, n3, o3, a3);
            e2.assignable = 2, r3 = ie(e2, n3, s3, l3, c3, { type: "CallExpression", callee: r3, arguments: i4 }), t3 && (e2.flags |= 2048);
            break;
          }
          case 67108990:
            J(e2, 2048 ^ (67110912 | n3)), e2.flags |= 2048, e2.assignable = 2, r3 = function(e3, n4, t3, o4, r4, a4, i4) {
              let s4, l4 = false;
              69271571 !== e3.getToken() && 67174411 !== e3.getToken() || 2048 & ~e3.flags || (l4 = true, e3.flags = 2048 ^ (2048 | e3.flags));
              if (69271571 === e3.getToken()) {
                J(e3, 8192 | n4);
                const { tokenIndex: l5, tokenLine: c4, tokenColumn: u2 } = e3, d2 = Fe(e3, n4, t3, 0, 1, l5, c4, u2);
                ee(e3, n4, 20), e3.assignable = 2, s4 = ie(e3, n4, r4, a4, i4, { type: "MemberExpression", object: o4, computed: true, optional: true, property: d2 });
              } else if (67174411 === e3.getToken()) {
                const l5 = ln(e3, n4, t3, 0);
                e3.assignable = 2, s4 = ie(e3, n4, r4, a4, i4, { type: "CallExpression", callee: o4, arguments: l5, optional: true });
              } else {
                const l5 = $e(e3, n4, t3);
                e3.assignable = 2, s4 = ie(e3, n4, r4, a4, i4, { type: "MemberExpression", object: o4, computed: false, optional: true, property: l5 });
              }
              l4 && (e3.flags |= 2048);
              return s4;
            }(e2, n3, o3, r3, s3, l3, c3);
            break;
          default:
            2048 & ~e2.flags || t(e2, 166), e2.assignable = 2, r3 = ie(e2, n3, s3, l3, c3, { type: "TaggedTemplateExpression", tag: r3, quasi: 67174408 === e2.getToken() ? rn(e2, 16384 | n3, o3) : on(e2, n3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) });
        }
        r3 = _e(e2, n3, o3, r3, 0, 1, s3, l3, c3);
      }
    } else r3 = function(e3, n4, o4, r4, a4, i4) {
      2 & e3.assignable && t(e3, 55);
      const s4 = e3.getToken();
      return J(e3, n4), e3.assignable = 2, ie(e3, n4, r4, a4, i4, { type: "UpdateExpression", argument: o4, operator: N[255 & s4], prefix: false });
    }(e2, n3, r3, s3, l3, c3);
    return 0 !== i3 || 2048 & ~e2.flags || (e2.flags = 2048 ^ (2048 | e2.flags), r3 = ie(e2, n3, s3, l3, c3, { type: "ChainExpression", expression: r3 })), r3;
  }
  function $e(e2, n3, o3) {
    return 143360 & e2.getToken() || -2147483528 === e2.getToken() || -2147483527 === e2.getToken() || 130 === e2.getToken() || t(e2, 160), 130 === e2.getToken() ? Vn(e2, n3, o3, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) : cn(e2, n3);
  }
  function Ye(e2, n3, o3, a3, i3, s3, l3, c3, u2, d2, g3) {
    if (!(143360 & ~e2.getToken())) {
      switch (e2.getToken()) {
        case 209006:
          return function(e3, n4, o4, a4, i4, s4, l4, c4) {
            i4 && (e3.destructible |= 128), 268435456 & n4 && t(e3, 177);
            const u3 = xn(e3, n4, o4, s4, l4, c4);
            if ("ArrowFunctionExpression" === u3.type || !(65536 & e3.getToken())) return 524288 & n4 && r(s4, l4, c4, e3.startIndex, e3.startLine, e3.startColumn, 176), 512 & n4 && r(s4, l4, c4, e3.startIndex, e3.startLine, e3.startColumn, 110), 2097152 & n4 && 524288 & n4 && r(s4, l4, c4, e3.startIndex, e3.startLine, e3.startColumn, 110), u3;
            if (2097152 & n4 && r(s4, l4, c4, e3.startIndex, e3.startLine, e3.startColumn, 31), 524288 & n4 || 512 & n4 && 2048 & n4) {
              a4 && r(s4, l4, c4, e3.startIndex, e3.startLine, e3.startColumn, 0);
              const i5 = Xe(e3, n4, o4, 0, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
              return 8391735 === e3.getToken() && t(e3, 33), e3.assignable = 2, ie(e3, n4, s4, l4, c4, { type: "AwaitExpression", argument: i5 });
            }
            return 512 & n4 && r(s4, l4, c4, e3.startIndex, e3.startLine, e3.startColumn, 98), u3;
          }(e2, n3, o3, i3, l3, u2, d2, g3);
        case 241771:
          return function(e3, n4, o4, r3, a4, i4, s4, l4) {
            if (r3 && (e3.destructible |= 256), 262144 & n4) {
              J(e3, 8192 | n4), 2097152 & n4 && t(e3, 32), a4 || t(e3, 26), 22 === e3.getToken() && t(e3, 124);
              let r4 = null, c4 = false;
              return 1 & e3.flags ? 8391476 === e3.getToken() && t(e3, 30, N[255 & e3.getToken()]) : (c4 = Q(e3, 8192 | n4, 8391476), (77824 & e3.getToken() || c4) && (r4 = Oe(e3, n4, o4, 1, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn))), e3.assignable = 2, ie(e3, n4, i4, s4, l4, { type: "YieldExpression", argument: r4, delegate: c4 });
            }
            return 256 & n4 && t(e3, 97, "yield"), xn(e3, n4, o4, i4, s4, l4);
          }(e2, n3, o3, l3, s3, u2, d2, g3);
        case 209005:
          return function(e3, n4, o4, r3, a4, i4, s4, l4, c4, u3) {
            const d3 = e3.getToken(), g4 = cn(e3, n4), { flags: k4 } = e3;
            if (!(1 & k4)) {
              if (86104 === e3.getToken()) return gn(e3, n4, o4, 1, r3, l4, c4, u3);
              if (me(n4, e3.getToken())) return a4 || t(e3, 0), 36864 & ~e3.getToken() || (e3.flags |= 256), Ln(e3, n4, o4, i4, l4, c4, u3);
            }
            return s4 || 67174411 !== e3.getToken() ? 10 === e3.getToken() ? (be(e3, n4, d3), s4 && t(e3, 51), 36864 & ~d3 || (e3.flags |= 256), Tn(e3, n4, o4, e3.tokenValue, g4, s4, i4, 0, l4, c4, u3)) : (e3.assignable = 1, g4) : In(e3, n4, o4, g4, i4, 1, 0, k4, l4, c4, u3);
          }(e2, n3, o3, l3, c3, s3, i3, u2, d2, g3);
      }
      const { tokenValue: k3 } = e2, p3 = e2.getToken(), f3 = cn(e2, 16384 | n3);
      return 10 === e2.getToken() ? (c3 || t(e2, 0), be(e2, n3, p3), 36864 & ~p3 || (e2.flags |= 256), Tn(e2, n3, o3, k3, f3, i3, s3, 0, u2, d2, g3)) : (!(4096 & n3) || 8388608 & n3 || 2097152 & n3 || "arguments" !== e2.tokenValue || t(e2, 130), 73 == (255 & p3) && (256 & n3 && t(e2, 113), 24 & a3 && t(e2, 100)), e2.assignable = 256 & n3 && !(537079808 & ~p3) ? 2 : 1, f3);
    }
    if (!(134217728 & ~e2.getToken())) return un(e2, n3);
    switch (e2.getToken()) {
      case 33619993:
      case 33619994:
        return function(e3, n4, o4, r3, a4, i4, s4, l4) {
          r3 && t(e3, 56), a4 || t(e3, 0);
          const c4 = e3.getToken();
          J(e3, 8192 | n4);
          const u3 = Xe(e3, n4, o4, 0, 0, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          return 2 & e3.assignable && t(e3, 55), e3.assignable = 2, ie(e3, n4, i4, s4, l4, { type: "UpdateExpression", argument: u3, operator: N[255 & c4], prefix: true });
        }(e2, n3, o3, i3, c3, u2, d2, g3);
      case 16863276:
      case 16842798:
      case 16842799:
      case 25233968:
      case 25233969:
      case 16863275:
      case 16863277:
        return function(e3, n4, o4, r3, a4, i4, s4, l4) {
          r3 || t(e3, 0);
          const c4 = e3.getToken();
          J(e3, 8192 | n4);
          const u3 = Xe(e3, n4, o4, 0, l4, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          var d3;
          return 8391735 === e3.getToken() && t(e3, 33), 256 & n4 && 16863276 === c4 && ("Identifier" === u3.type ? t(e3, 121) : (d3 = u3).property && "PrivateIdentifier" === d3.property.type && t(e3, 127)), e3.assignable = 2, ie(e3, n4, a4, i4, s4, { type: "UnaryExpression", operator: N[255 & c4], argument: u3, prefix: true });
        }(e2, n3, o3, c3, u2, d2, g3, l3);
      case 86104:
        return gn(e2, n3, o3, 0, l3, u2, d2, g3);
      case 2162700:
        return function(e3, n4, o4, r3, a4, i4, s4, l4) {
          const c4 = bn(e3, n4, void 0, o4, r3, a4, 0, 2, 0, i4, s4, l4);
          64 & e3.destructible && t(e3, 63);
          8 & e3.destructible && t(e3, 62);
          return c4;
        }(e2, n3, o3, s3 ? 0 : 1, l3, u2, d2, g3);
      case 69271571:
        return function(e3, n4, o4, r3, a4, i4, s4, l4) {
          const c4 = kn(e3, n4, void 0, o4, r3, a4, 0, 2, 0, i4, s4, l4);
          64 & e3.destructible && t(e3, 63);
          8 & e3.destructible && t(e3, 62);
          return c4;
        }(e2, n3, o3, s3 ? 0 : 1, l3, u2, d2, g3);
      case 67174411:
        return function(e3, n4, o4, r3, a4, i4, s4, l4, c4) {
          e3.flags = 128 ^ (128 | e3.flags);
          const { tokenIndex: u3, tokenLine: d3, tokenColumn: g4 } = e3;
          J(e3, 67117056 | n4);
          const k3 = 16 & n4 ? ue({ parent: void 0, type: 2 }, 1024) : void 0;
          if (n4 = 33554432 ^ (33554432 | n4), Q(e3, n4, 16)) return yn(e3, n4, k3, o4, [], r3, 0, s4, l4, c4);
          let p3, f3 = 0;
          e3.destructible &= -385;
          let m2 = [], b3 = 0, h2 = 0, x2 = 0;
          const { tokenIndex: T2, tokenLine: y3, tokenColumn: C2 } = e3;
          e3.assignable = 1;
          for (; 16 !== e3.getToken(); ) {
            const { tokenIndex: r4, tokenLine: s5, tokenColumn: l5 } = e3, c5 = e3.getToken();
            if (143360 & c5) k3 && ge(e3, n4, k3, e3.tokenValue, 1, 0), 537079808 & ~c5 ? 36864 & ~c5 || (x2 = 1) : h2 = 1, p3 = Ye(e3, n4, o4, a4, 0, 1, 1, 1, r4, s5, l5), 16 === e3.getToken() || 18 === e3.getToken() ? 2 & e3.assignable && (f3 |= 16, h2 = 1) : (1077936155 === e3.getToken() ? h2 = 1 : f3 |= 16, p3 = _e(e3, n4, o4, p3, 1, 0, r4, s5, l5), 16 !== e3.getToken() && 18 !== e3.getToken() && (p3 = je(e3, n4, o4, 1, 0, r4, s5, l5, p3)));
            else {
              if (2097152 & ~c5) {
                if (14 === c5) {
                  p3 = fn(e3, n4, k3, o4, 16, a4, i4, 0, 1, 0, r4, s5, l5), 16 & e3.destructible && t(e3, 74), h2 = 1, !b3 || 16 !== e3.getToken() && 18 !== e3.getToken() || m2.push(p3), f3 |= 8;
                  break;
                }
                if (f3 |= 16, p3 = Oe(e3, n4, o4, 1, 1, r4, s5, l5), !b3 || 16 !== e3.getToken() && 18 !== e3.getToken() || m2.push(p3), 18 === e3.getToken() && (b3 || (b3 = 1, m2 = [p3])), b3) {
                  for (; Q(e3, 8192 | n4, 18); ) m2.push(Oe(e3, n4, o4, 1, 1, e3.tokenIndex, e3.tokenLine, e3.tokenColumn));
                  e3.assignable = 2, p3 = ie(e3, n4, T2, y3, C2, { type: "SequenceExpression", expressions: m2 });
                }
                return ee(e3, n4, 16), e3.destructible = f3, p3;
              }
              p3 = 2162700 === c5 ? bn(e3, 67108864 | n4, k3, o4, 0, 1, 0, a4, i4, r4, s5, l5) : kn(e3, 67108864 | n4, k3, o4, 0, 1, 0, a4, i4, r4, s5, l5), f3 |= e3.destructible, h2 = 1, e3.assignable = 2, 16 !== e3.getToken() && 18 !== e3.getToken() && (8 & f3 && t(e3, 122), p3 = _e(e3, n4, o4, p3, 0, 0, r4, s5, l5), f3 |= 16, 16 !== e3.getToken() && 18 !== e3.getToken() && (p3 = je(e3, n4, o4, 0, 0, r4, s5, l5, p3)));
            }
            if (!b3 || 16 !== e3.getToken() && 18 !== e3.getToken() || m2.push(p3), !Q(e3, 8192 | n4, 18)) break;
            if (b3 || (b3 = 1, m2 = [p3]), 16 === e3.getToken()) {
              f3 |= 8;
              break;
            }
          }
          b3 && (e3.assignable = 2, p3 = ie(e3, n4, T2, y3, C2, { type: "SequenceExpression", expressions: m2 }));
          ee(e3, n4, 16), 16 & f3 && 8 & f3 && t(e3, 151);
          if (f3 |= 256 & e3.destructible ? 256 : 128 & e3.destructible ? 128 : 0, 10 === e3.getToken()) return 48 & f3 && t(e3, 49), 524800 & n4 && 128 & f3 && t(e3, 31), 262400 & n4 && 256 & f3 && t(e3, 32), h2 && (e3.flags |= 128), x2 && (e3.flags |= 256), yn(e3, n4, k3, o4, b3 ? m2 : [p3], r3, 0, s4, l4, c4);
          64 & f3 && t(e3, 63);
          8 & f3 && t(e3, 144);
          return e3.destructible = 256 ^ (256 | e3.destructible) | f3, 32 & n4 ? ie(e3, n4, u3, d3, g4, { type: "ParenthesizedExpression", expression: p3 }) : p3;
        }(e2, 16384 | n3, o3, s3, 1, 0, u2, d2, g3);
      case 86021:
      case 86022:
      case 86023:
        return function(e3, n4, t3, o4, r3) {
          const a4 = N[255 & e3.getToken()], i4 = 86023 === e3.getToken() ? null : "true" === a4;
          return J(e3, n4), e3.assignable = 2, ie(e3, n4, t3, o4, r3, 128 & n4 ? { type: "Literal", value: i4, raw: a4 } : { type: "Literal", value: i4 });
        }(e2, n3, u2, d2, g3);
      case 86111:
        return function(e3, n4) {
          const { tokenIndex: t3, tokenLine: o4, tokenColumn: r3 } = e3;
          return J(e3, n4), e3.assignable = 2, ie(e3, n4, t3, o4, r3, { type: "ThisExpression" });
        }(e2, n3);
      case 65540:
        return function(e3, n4, t3, o4, r3) {
          const { tokenRaw: a4, tokenRegExp: i4, tokenValue: s4 } = e3;
          return J(e3, n4), e3.assignable = 2, ie(e3, n4, t3, o4, r3, 128 & n4 ? { type: "Literal", value: s4, regex: i4, raw: a4 } : { type: "Literal", value: s4, regex: i4 });
        }(e2, n3, u2, d2, g3);
      case 132:
      case 86094:
        return function(e3, n4, o4, r3, a4, i4, s4) {
          let l4 = null, c4 = null;
          const u3 = En(e3, n4, o4);
          u3.length && (a4 = e3.tokenIndex, i4 = e3.tokenLine, s4 = e3.tokenColumn);
          n4 = 4194304 ^ (4194560 | n4), J(e3, n4), 4096 & e3.getToken() && 20565 !== e3.getToken() && (re(e3, n4, e3.getToken()) && t(e3, 118), 537079808 & ~e3.getToken() || t(e3, 119), l4 = cn(e3, n4));
          let d3 = n4;
          Q(e3, 8192 | n4, 20565) ? (c4 = Xe(e3, n4, o4, 0, r3, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn), d3 |= 131072) : d3 = 131072 ^ (131072 | d3);
          const g4 = An(e3, d3, n4, void 0, o4, 2, 0, r3);
          return e3.assignable = 2, ie(e3, n4, a4, i4, s4, { type: "ClassExpression", id: l4, superClass: c4, body: g4, ...1 & n4 ? { decorators: u3 } : null });
        }(e2, n3, o3, l3, u2, d2, g3);
      case 86109:
        return function(e3, n4, o4, r3, a4) {
          switch (J(e3, n4), e3.getToken()) {
            case 67108990:
              t(e3, 167);
            case 67174411:
              131072 & n4 || t(e3, 28), e3.assignable = 2;
              break;
            case 69271571:
            case 67108877:
              65536 & n4 || t(e3, 29), e3.assignable = 1;
              break;
            default:
              t(e3, 30, "super");
          }
          return ie(e3, n4, o4, r3, a4, { type: "Super" });
        }(e2, n3, u2, d2, g3);
      case 67174409:
        return on(e2, n3, u2, d2, g3);
      case 67174408:
        return rn(e2, n3, o3);
      case 86107:
        return function(e3, n4, o4, r3, a4, i4, s4) {
          const l4 = cn(e3, 8192 | n4), { tokenIndex: c4, tokenLine: u3, tokenColumn: d3 } = e3;
          if (Q(e3, n4, 67108877)) {
            if (16777216 & n4 && 209029 === e3.getToken()) return e3.assignable = 2, function(e4, n5, t3, o5, r4, a5) {
              const i5 = cn(e4, n5);
              return ie(e4, n5, o5, r4, a5, { type: "MetaProperty", meta: t3, property: i5 });
            }(e3, n4, l4, a4, i4, s4);
            t(e3, 94);
          }
          e3.assignable = 2, 16842752 & ~e3.getToken() || t(e3, 65, N[255 & e3.getToken()]);
          const g4 = Ye(e3, n4, o4, 2, 1, 0, r3, 1, c4, u3, d3);
          n4 = 33554432 ^ (33554432 | n4), 67108990 === e3.getToken() && t(e3, 168);
          const k3 = wn(e3, n4, o4, g4, r3, c4, u3, d3);
          return e3.assignable = 2, ie(e3, n4, a4, i4, s4, { type: "NewExpression", callee: k3, arguments: 67174411 === e3.getToken() ? ln(e3, n4, o4, r3) : [] });
        }(e2, n3, o3, l3, u2, d2, g3);
      case 134283388:
        return tn(e2, n3, u2, d2, g3);
      case 130:
        return Vn(e2, n3, o3, 0, u2, d2, g3);
      case 86106:
        return function(e3, n4, o4, r3, a4, i4, s4, l4) {
          let c4 = cn(e3, n4);
          if (67108877 === e3.getToken()) return Ze(e3, n4, c4, i4, s4, l4);
          r3 && t(e3, 142);
          return c4 = We(e3, n4, o4, a4, i4, s4, l4), e3.assignable = 2, _e(e3, n4, o4, c4, a4, 0, i4, s4, l4);
        }(e2, n3, o3, i3, l3, u2, d2, g3);
      case 8456256:
        if (8 & n3) return Pn(e2, n3, o3, 0, u2, d2, g3);
      default:
        if (me(n3, e2.getToken())) return xn(e2, n3, o3, u2, d2, g3);
        t(e2, 30, N[255 & e2.getToken()]);
    }
  }
  function Ze(e2, n3, o3, r3, a3, i3) {
    512 & n3 || t(e2, 169), J(e2, n3);
    const s3 = e2.getToken();
    return 209030 !== s3 && "meta" !== e2.tokenValue ? t(e2, 174) : -2147483648 & s3 && t(e2, 175), e2.assignable = 2, ie(e2, n3, r3, a3, i3, { type: "MetaProperty", meta: o3, property: cn(e2, n3) });
  }
  function We(e2, n3, o3, r3, a3, i3, s3) {
    ee(e2, 8192 | n3, 67174411), 14 === e2.getToken() && t(e2, 143);
    const l3 = { type: "ImportExpression", source: Oe(e2, n3, o3, 1, r3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) };
    if (1 & n3) {
      let t3 = null;
      if (18 === e2.getToken() && (ee(e2, n3, 18), 16 !== e2.getToken())) {
        t3 = Oe(e2, 33554432 ^ (33554432 | n3), o3, 1, r3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
      }
      l3.options = t3, Q(e2, n3, 18);
    }
    return ee(e2, n3, 16), ie(e2, n3, a3, i3, s3, l3);
  }
  function Ke(e2, n3, o3 = null) {
    if (!Q(e2, n3, 20579)) return [];
    ee(e2, n3, 2162700);
    const r3 = [], a3 = /* @__PURE__ */ new Set();
    for (; 1074790415 !== e2.getToken(); ) {
      const i3 = e2.tokenIndex, s3 = e2.tokenLine, l3 = e2.tokenColumn, c3 = en(e2, n3);
      ee(e2, n3, 21);
      const u2 = Qe(e2, n3), d2 = "Literal" === c3.type ? c3.value : c3.name;
      if ("type" === d2 && "json" === u2.value) {
        null === o3 || 1 === o3.length && ("ImportDefaultSpecifier" === o3[0].type || "ImportNamespaceSpecifier" === o3[0].type || "ImportSpecifier" === o3[0].type && "Identifier" === o3[0].imported.type && "default" === o3[0].imported.name || "ExportSpecifier" === o3[0].type && "Identifier" === o3[0].local.type && "default" === o3[0].local.name) || t(e2, 140);
      }
      a3.has(d2) && t(e2, 145, `${d2}`), a3.add(d2), r3.push(ie(e2, n3, i3, s3, l3, { type: "ImportAttribute", key: c3, value: u2 })), 1074790415 !== e2.getToken() && ee(e2, n3, 18);
    }
    return ee(e2, n3, 1074790415), r3;
  }
  function Qe(e2, n3) {
    if (134283267 === e2.getToken()) return un(e2, n3);
    t(e2, 30, N[255 & e2.getToken()]);
  }
  function en(e2, n3) {
    return 134283267 === e2.getToken() ? un(e2, n3) : 143360 & e2.getToken() ? cn(e2, n3) : void t(e2, 30, N[255 & e2.getToken()]);
  }
  function nn(e2, n3) {
    return 134283267 === e2.getToken() ? (function(e3, n4) {
      const o3 = n4.length;
      for (let r3 = 0; r3 < o3; r3++) {
        const a3 = n4.charCodeAt(r3);
        55296 == (64512 & a3) && (a3 > 56319 || ++r3 >= o3 || 56320 != (64512 & n4.charCodeAt(r3))) && t(e3, 171, JSON.stringify(n4.charAt(r3--)));
      }
    }(e2, e2.tokenValue), un(e2, n3)) : 143360 & e2.getToken() ? cn(e2, n3) : void t(e2, 30, N[255 & e2.getToken()]);
  }
  function tn(e2, n3, t3, o3, r3) {
    const { tokenRaw: a3, tokenValue: i3 } = e2;
    return J(e2, n3), e2.assignable = 2, ie(e2, n3, t3, o3, r3, 128 & n3 ? { type: "Literal", value: i3, bigint: a3.slice(0, -1), raw: a3 } : { type: "Literal", value: i3, bigint: a3.slice(0, -1) });
  }
  function on(e2, n3, t3, o3, r3) {
    e2.assignable = 2;
    const { tokenValue: a3, tokenRaw: i3, tokenIndex: s3, tokenLine: l3, tokenColumn: c3 } = e2;
    ee(e2, n3, 67174409);
    return ie(e2, n3, t3, o3, r3, { type: "TemplateLiteral", expressions: [], quasis: [an(e2, n3, a3, i3, s3, l3, c3, true)] });
  }
  function rn(e2, n3, o3) {
    n3 = 33554432 ^ (33554432 | n3);
    const { tokenValue: r3, tokenRaw: a3, tokenIndex: i3, tokenLine: s3, tokenColumn: l3 } = e2;
    ee(e2, -16385 & n3 | 8192, 67174408);
    const c3 = [an(e2, n3, r3, a3, i3, s3, l3, false)], u2 = [Fe(e2, -16385 & n3, o3, 0, 1, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)];
    for (1074790415 !== e2.getToken() && t(e2, 83); 67174409 !== e2.setToken(D(e2, n3), true); ) {
      const { tokenValue: r4, tokenRaw: a4, tokenIndex: i4, tokenLine: s4, tokenColumn: l4 } = e2;
      ee(e2, -16385 & n3 | 8192, 67174408), c3.push(an(e2, n3, r4, a4, i4, s4, l4, false)), u2.push(Fe(e2, n3, o3, 0, 1, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)), 1074790415 !== e2.getToken() && t(e2, 83);
    }
    {
      const { tokenValue: t3, tokenRaw: o4, tokenIndex: r4, tokenLine: a4, tokenColumn: i4 } = e2;
      ee(e2, n3, 67174409), c3.push(an(e2, n3, t3, o4, r4, a4, i4, true));
    }
    return ie(e2, n3, i3, s3, l3, { type: "TemplateLiteral", expressions: u2, quasis: c3 });
  }
  function an(e2, n3, t3, o3, r3, a3, i3, s3) {
    const l3 = ie(e2, n3, r3, a3, i3, { type: "TemplateElement", value: { cooked: t3, raw: o3 }, tail: s3 }), c3 = s3 ? 1 : 2;
    return 2 & n3 && (l3.start += 1, l3.range[0] += 1, l3.end -= c3, l3.range[1] -= c3), 4 & n3 && (l3.loc.start.column += 1, l3.loc.end.column -= c3), l3;
  }
  function sn(e2, n3, t3, o3, r3, a3) {
    ee(e2, 8192 | (n3 = 33554432 ^ (33554432 | n3)), 14);
    const i3 = Oe(e2, n3, t3, 1, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
    return e2.assignable = 1, ie(e2, n3, o3, r3, a3, { type: "SpreadElement", argument: i3 });
  }
  function ln(e2, n3, t3, o3) {
    J(e2, 8192 | n3);
    const r3 = [];
    if (16 === e2.getToken()) return J(e2, 16384 | n3), r3;
    for (; 16 !== e2.getToken() && (14 === e2.getToken() ? r3.push(sn(e2, n3, t3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)) : r3.push(Oe(e2, n3, t3, 1, o3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)), 18 === e2.getToken()) && (J(e2, 8192 | n3), 16 !== e2.getToken()); ) ;
    return ee(e2, 16384 | n3, 16), r3;
  }
  function cn(e2, n3) {
    const { tokenValue: t3, tokenIndex: o3, tokenLine: r3, tokenColumn: a3 } = e2, i3 = "await" === t3 && !(-2147483648 & e2.getToken());
    return J(e2, n3 | (i3 ? 8192 : 0)), ie(e2, n3, o3, r3, a3, { type: "Identifier", name: t3 });
  }
  function un(e2, n3) {
    const { tokenValue: t3, tokenRaw: o3, tokenIndex: r3, tokenLine: a3, tokenColumn: i3 } = e2;
    return 134283388 === e2.getToken() ? tn(e2, n3, r3, a3, i3) : (J(e2, n3), e2.assignable = 2, ie(e2, n3, r3, a3, i3, 128 & n3 ? { type: "Literal", value: t3, raw: o3 } : { type: "Literal", value: t3 }));
  }
  function dn(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2, d2) {
    J(e2, 8192 | n3);
    const g3 = i3 ? K(e2, n3, 8391476) : 0;
    let k3, p3 = null, f3 = o3 ? { parent: void 0, type: 2 } : void 0;
    if (67174411 === e2.getToken()) 1 & s3 || t(e2, 39, "Function");
    else {
      const r4 = !(4 & a3) || 2048 & n3 && 512 & n3 ? 64 | (l3 ? 1024 : 0) | (g3 ? 1024 : 0) : 4;
      oe(e2, n3, e2.getToken()), o3 && (4 & r4 ? ke(e2, n3, o3, e2.tokenValue, r4) : ge(e2, n3, o3, e2.tokenValue, r4, a3), f3 = ue(f3, 256), s3 && 2 & s3 && fe(e2, e2.tokenValue)), k3 = e2.getToken(), 143360 & e2.getToken() ? p3 = cn(e2, n3) : t(e2, 30, N[255 & e2.getToken()]);
    }
    const m2 = 7274496;
    n3 = (n3 | m2) ^ m2 | 16777216 | (l3 ? 524288 : 0) | (g3 ? 262144 : 0) | (g3 ? 0 : 67108864), o3 && (f3 = ue(f3, 512));
    const b3 = 268471296;
    return ie(e2, n3, c3, u2, d2, { type: "FunctionDeclaration", id: p3, params: vn(e2, -268435457 & n3 | 2097152, f3, r3, 0, 1), body: ze(e2, 9437184 | (n3 | b3) ^ b3, o3 ? ue(f3, 128) : f3, r3, 8, k3, f3?.scopeError), async: 1 === l3, generator: 1 === g3 });
  }
  function gn(e2, n3, t3, o3, r3, a3, i3, s3) {
    J(e2, 8192 | n3);
    const l3 = K(e2, n3, 8391476), c3 = (o3 ? 524288 : 0) | (l3 ? 262144 : 0);
    let u2, d2 = null, g3 = 16 & n3 ? { parent: void 0, type: 2 } : void 0;
    const k3 = 275709952;
    143360 & e2.getToken() && (oe(e2, (n3 | k3) ^ k3 | c3, e2.getToken()), g3 && (g3 = ue(g3, 256)), u2 = e2.getToken(), d2 = cn(e2, n3)), n3 = (n3 | k3) ^ k3 | 16777216 | c3 | (l3 ? 0 : 67108864), g3 && (g3 = ue(g3, 512));
    const p3 = vn(e2, -268435457 & n3 | 2097152, g3, t3, r3, 1), f3 = ze(e2, 9437184 | -33594369 & n3, g3 ? ue(g3, 128) : g3, t3, 0, u2, g3?.scopeError);
    return e2.assignable = 2, ie(e2, n3, a3, i3, s3, { type: "FunctionExpression", id: d2, params: p3, body: f3, async: 1 === o3, generator: 1 === l3 });
  }
  function kn(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2, d2, g3) {
    J(e2, 8192 | n3);
    const k3 = [];
    let p3 = 0;
    for (n3 = 33554432 ^ (33554432 | n3); 20 !== e2.getToken(); ) if (Q(e2, 8192 | n3, 18)) k3.push(null);
    else {
      let a4;
      const { tokenIndex: u3, tokenLine: d3, tokenColumn: g4, tokenValue: f4 } = e2, m2 = e2.getToken();
      if (143360 & m2) if (a4 = Ye(e2, n3, r3, l3, 0, 1, i3, 1, u3, d3, g4), 1077936155 === e2.getToken()) {
        2 & e2.assignable && t(e2, 26), J(e2, 8192 | n3), o3 && de(e2, n3, o3, f4, l3, c3);
        const k4 = Oe(e2, n3, r3, 1, i3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
        a4 = ie(e2, n3, u3, d3, g4, s3 ? { type: "AssignmentPattern", left: a4, right: k4 } : { type: "AssignmentExpression", operator: "=", left: a4, right: k4 }), p3 |= 256 & e2.destructible ? 256 : 128 & e2.destructible ? 128 : 0;
      } else 18 === e2.getToken() || 20 === e2.getToken() ? (2 & e2.assignable ? p3 |= 16 : o3 && de(e2, n3, o3, f4, l3, c3), p3 |= 256 & e2.destructible ? 256 : 128 & e2.destructible ? 128 : 0) : (p3 |= 1 & l3 ? 32 : 2 & l3 ? 0 : 16, a4 = _e(e2, n3, r3, a4, i3, 0, u3, d3, g4), 18 !== e2.getToken() && 20 !== e2.getToken() ? (1077936155 !== e2.getToken() && (p3 |= 16), a4 = je(e2, n3, r3, i3, s3, u3, d3, g4, a4)) : 1077936155 !== e2.getToken() && (p3 |= 2 & e2.assignable ? 16 : 32));
      else 2097152 & m2 ? (a4 = 2162700 === e2.getToken() ? bn(e2, n3, o3, r3, 0, i3, s3, l3, c3, u3, d3, g4) : kn(e2, n3, o3, r3, 0, i3, s3, l3, c3, u3, d3, g4), p3 |= e2.destructible, e2.assignable = 16 & e2.destructible ? 2 : 1, 18 === e2.getToken() || 20 === e2.getToken() ? 2 & e2.assignable && (p3 |= 16) : 8 & e2.destructible ? t(e2, 71) : (a4 = _e(e2, n3, r3, a4, i3, 0, u3, d3, g4), p3 = 2 & e2.assignable ? 16 : 0, 18 !== e2.getToken() && 20 !== e2.getToken() ? a4 = je(e2, n3, r3, i3, s3, u3, d3, g4, a4) : 1077936155 !== e2.getToken() && (p3 |= 2 & e2.assignable ? 16 : 32))) : 14 === m2 ? (a4 = fn(e2, n3, o3, r3, 20, l3, c3, 0, i3, s3, u3, d3, g4), p3 |= e2.destructible, 18 !== e2.getToken() && 20 !== e2.getToken() && t(e2, 30, N[255 & e2.getToken()])) : (a4 = Xe(e2, n3, r3, 1, 0, 1, u3, d3, g4), 18 !== e2.getToken() && 20 !== e2.getToken() ? (a4 = je(e2, n3, r3, i3, s3, u3, d3, g4, a4), 3 & l3 || 67174411 !== m2 || (p3 |= 16)) : 2 & e2.assignable ? p3 |= 16 : 67174411 === m2 && (p3 |= 1 & e2.assignable && 3 & l3 ? 32 : 16));
      if (k3.push(a4), !Q(e2, 8192 | n3, 18)) break;
      if (20 === e2.getToken()) break;
    }
    ee(e2, n3, 20);
    const f3 = ie(e2, n3, u2, d2, g3, { type: s3 ? "ArrayPattern" : "ArrayExpression", elements: k3 });
    return !a3 && 4194304 & e2.getToken() ? pn(e2, n3, r3, p3, i3, s3, u2, d2, g3, f3) : (e2.destructible = p3, f3);
  }
  function pn(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2) {
    1077936155 !== e2.getToken() && t(e2, 26), J(e2, 8192 | n3), 16 & r3 && t(e2, 26), i3 || ne(e2, u2);
    const { tokenIndex: d2, tokenLine: g3, tokenColumn: k3 } = e2, p3 = Oe(e2, n3, o3, 1, a3, d2, g3, k3);
    return e2.destructible = 72 ^ (72 | r3) | (128 & e2.destructible ? 128 : 0) | (256 & e2.destructible ? 256 : 0), ie(e2, n3, s3, l3, c3, i3 ? { type: "AssignmentPattern", left: u2, right: p3 } : { type: "AssignmentExpression", left: u2, operator: "=", right: p3 });
  }
  function fn(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2, d2, g3, k3) {
    J(e2, 8192 | n3);
    let p3 = null, f3 = 0;
    const { tokenValue: m2, tokenIndex: b3, tokenLine: h2, tokenColumn: x2 } = e2;
    let T2 = e2.getToken();
    if (143360 & T2) e2.assignable = 1, p3 = Ye(e2, n3, r3, i3, 0, 1, c3, 1, b3, h2, x2), T2 = e2.getToken(), p3 = _e(e2, n3, r3, p3, c3, 0, b3, h2, x2), 18 !== e2.getToken() && e2.getToken() !== a3 && (2 & e2.assignable && 1077936155 === e2.getToken() && t(e2, 71), f3 |= 16, p3 = je(e2, n3, r3, c3, u2, b3, h2, x2, p3)), 2 & e2.assignable ? f3 |= 16 : T2 === a3 || 18 === T2 ? o3 && de(e2, n3, o3, m2, i3, s3) : f3 |= 32, f3 |= 128 & e2.destructible ? 128 : 0;
    else if (T2 === a3) t(e2, 41);
    else {
      if (!(2097152 & T2)) {
        f3 |= 32, p3 = Xe(e2, n3, r3, 1, c3, 1, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
        const { tokenIndex: o4, tokenLine: i4, tokenColumn: s4 } = e2, l4 = e2.getToken();
        return 1077936155 === l4 ? (2 & e2.assignable && t(e2, 26), p3 = je(e2, n3, r3, c3, u2, o4, i4, s4, p3), f3 |= 16) : (18 === l4 ? f3 |= 16 : l4 !== a3 && (p3 = je(e2, n3, r3, c3, u2, o4, i4, s4, p3)), f3 |= 1 & e2.assignable ? 32 : 16), e2.destructible = f3, e2.getToken() !== a3 && 18 !== e2.getToken() && t(e2, 161), ie(e2, n3, d2, g3, k3, { type: u2 ? "RestElement" : "SpreadElement", argument: p3 });
      }
      p3 = 2162700 === e2.getToken() ? bn(e2, n3, o3, r3, 1, c3, u2, i3, s3, b3, h2, x2) : kn(e2, n3, o3, r3, 1, c3, u2, i3, s3, b3, h2, x2), T2 = e2.getToken(), 1077936155 !== T2 && T2 !== a3 && 18 !== T2 ? (8 & e2.destructible && t(e2, 71), p3 = _e(e2, n3, r3, p3, c3, 0, b3, h2, x2), f3 |= 2 & e2.assignable ? 16 : 0, 4194304 & ~e2.getToken() ? (8388608 & ~e2.getToken() || (p3 = Me(e2, n3, r3, 1, b3, h2, x2, 4, T2, p3)), Q(e2, 8192 | n3, 22) && (p3 = He(e2, n3, r3, p3, b3, h2, x2)), f3 |= 2 & e2.assignable ? 16 : 32) : (1077936155 !== e2.getToken() && (f3 |= 16), p3 = je(e2, n3, r3, c3, u2, b3, h2, x2, p3))) : f3 |= 1074790415 === a3 && 1077936155 !== T2 ? 16 : e2.destructible;
    }
    if (e2.getToken() !== a3) if (1 & i3 && (f3 |= l3 ? 16 : 32), Q(e2, 8192 | n3, 1077936155)) {
      16 & f3 && t(e2, 26), ne(e2, p3);
      const o4 = Oe(e2, n3, r3, 1, c3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
      p3 = ie(e2, n3, b3, h2, x2, u2 ? { type: "AssignmentPattern", left: p3, right: o4 } : { type: "AssignmentExpression", left: p3, operator: "=", right: o4 }), f3 = 16;
    } else f3 |= 16;
    return e2.destructible = f3, ie(e2, n3, d2, g3, k3, { type: u2 ? "RestElement" : "SpreadElement", argument: p3 });
  }
  function mn(e2, n3, r3, a3, i3, s3, l3, c3) {
    const u2 = 2883584 | (64 & a3 ? 0 : 4325376);
    let d2 = 16 & (n3 = 25231360 | ((n3 | u2) ^ u2 | (8 & a3 ? 262144 : 0) | (16 & a3 ? 524288 : 0) | (64 & a3 ? 4194304 : 0))) ? ue({ parent: void 0, type: 2 }, 512) : void 0;
    const g3 = function(e3, n4, r4, a4, i4, s4, l4) {
      ee(e3, n4, 67174411);
      const c4 = [];
      if (e3.flags = 128 ^ (128 | e3.flags), 16 === e3.getToken()) return 512 & i4 && t(e3, 37, "Setter", "one", ""), J(e3, n4), c4;
      256 & i4 && t(e3, 37, "Getter", "no", "s");
      512 & i4 && 14 === e3.getToken() && t(e3, 38);
      n4 = 33554432 ^ (33554432 | n4);
      let u3 = 0, d3 = 0;
      for (; 18 !== e3.getToken(); ) {
        let o3 = null;
        const { tokenIndex: g4, tokenLine: k3, tokenColumn: p3 } = e3;
        if (143360 & e3.getToken() ? (256 & n4 || (36864 & ~e3.getToken() || (e3.flags |= 256), 537079808 & ~e3.getToken() || (e3.flags |= 512)), o3 = Un(e3, n4, r4, 1 | i4, 0, g4, k3, p3)) : (2162700 === e3.getToken() ? o3 = bn(e3, n4, r4, a4, 1, l4, 1, s4, 0, g4, k3, p3) : 69271571 === e3.getToken() ? o3 = kn(e3, n4, r4, a4, 1, l4, 1, s4, 0, g4, k3, p3) : 14 === e3.getToken() && (o3 = fn(e3, n4, r4, a4, 16, s4, 0, 0, l4, 1, g4, k3, p3)), d3 = 1, 48 & e3.destructible && t(e3, 50)), 1077936155 === e3.getToken()) {
          J(e3, 8192 | n4), d3 = 1;
          o3 = ie(e3, n4, g4, k3, p3, { type: "AssignmentPattern", left: o3, right: Oe(e3, n4, a4, 1, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn) });
        }
        if (u3++, c4.push(o3), !Q(e3, n4, 18)) break;
        if (16 === e3.getToken()) break;
      }
      512 & i4 && 1 !== u3 && t(e3, 37, "Setter", "one", "");
      r4 && r4.scopeError && o(r4.scopeError);
      d3 && (e3.flags |= 128);
      return ee(e3, n4, 16), c4;
    }(e2, -268435457 & n3 | 2097152, d2, r3, a3, 1, i3);
    d2 && (d2 = ue(d2, 128));
    return ie(e2, n3, s3, l3, c3, { type: "FunctionExpression", params: g3, body: ze(e2, 9437184 | -301992961 & n3, d2, r3, 0, void 0, d2?.parent?.scopeError), async: (16 & a3) > 0, generator: (8 & a3) > 0, id: null });
  }
  function bn(e2, n3, o3, a3, i3, s3, l3, c3, u2, d2, g3, k3) {
    J(e2, n3);
    const p3 = [];
    let f3 = 0, m2 = 0;
    for (n3 = 33554432 ^ (33554432 | n3); 1074790415 !== e2.getToken(); ) {
      const { tokenValue: i4, tokenLine: d3, tokenColumn: g4, tokenIndex: k4 } = e2, b4 = e2.getToken();
      if (14 === b4) p3.push(fn(e2, n3, o3, a3, 1074790415, c3, u2, 0, s3, l3, k4, d3, g4));
      else {
        let h2, x2 = 0, T2 = null;
        if (143360 & e2.getToken() || -2147483528 === e2.getToken() || -2147483527 === e2.getToken()) if (-2147483527 === e2.getToken() && (f3 |= 16), T2 = cn(e2, n3), 18 === e2.getToken() || 1074790415 === e2.getToken() || 1077936155 === e2.getToken()) if (x2 |= 4, 256 & n3 && !(537079808 & ~b4) ? f3 |= 16 : te(e2, n3, c3, b4, 0), o3 && de(e2, n3, o3, i4, c3, u2), Q(e2, 8192 | n3, 1077936155)) {
          f3 |= 8;
          const t3 = Oe(e2, n3, a3, 1, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
          f3 |= 256 & e2.destructible ? 256 : 128 & e2.destructible ? 128 : 0, h2 = ie(e2, n3, k4, d3, g4, { type: "AssignmentPattern", left: 134217728 & n3 ? Object.assign({}, T2) : T2, right: t3 });
        } else f3 |= (209006 === b4 ? 128 : 0) | (-2147483528 === b4 ? 16 : 0), h2 = 134217728 & n3 ? Object.assign({}, T2) : T2;
        else if (Q(e2, 8192 | n3, 21)) {
          const { tokenIndex: r3, tokenLine: d4, tokenColumn: g5 } = e2;
          if ("__proto__" === i4 && m2++, 143360 & e2.getToken()) {
            const t3 = e2.getToken(), i5 = e2.tokenValue;
            h2 = Ye(e2, n3, a3, c3, 0, 1, s3, 1, r3, d4, g5);
            const k5 = e2.getToken();
            h2 = _e(e2, n3, a3, h2, s3, 0, r3, d4, g5), 18 === e2.getToken() || 1074790415 === e2.getToken() ? 1077936155 === k5 || 1074790415 === k5 || 18 === k5 ? (f3 |= 128 & e2.destructible ? 128 : 0, 2 & e2.assignable ? f3 |= 16 : !o3 || 143360 & ~t3 || de(e2, n3, o3, i5, c3, u2)) : f3 |= 1 & e2.assignable ? 32 : 16 : 4194304 & ~e2.getToken() ? (f3 |= 16, 8388608 & ~e2.getToken() || (h2 = Me(e2, n3, a3, 1, r3, d4, g5, 4, k5, h2)), Q(e2, 8192 | n3, 22) && (h2 = He(e2, n3, a3, h2, r3, d4, g5))) : (2 & e2.assignable ? f3 |= 16 : 1077936155 !== k5 ? f3 |= 32 : o3 && de(e2, n3, o3, i5, c3, u2), h2 = je(e2, n3, a3, s3, l3, r3, d4, g5, h2));
          } else 2097152 & ~e2.getToken() ? (h2 = Xe(e2, n3, a3, 1, s3, 1, r3, d4, g5), f3 |= 1 & e2.assignable ? 32 : 16, 18 === e2.getToken() || 1074790415 === e2.getToken() ? 2 & e2.assignable && (f3 |= 16) : (h2 = _e(e2, n3, a3, h2, s3, 0, r3, d4, g5), f3 = 2 & e2.assignable ? 16 : 0, 18 !== e2.getToken() && 1074790415 !== b4 && (1077936155 !== e2.getToken() && (f3 |= 16), h2 = je(e2, n3, a3, s3, l3, r3, d4, g5, h2)))) : (h2 = 69271571 === e2.getToken() ? kn(e2, n3, o3, a3, 0, s3, l3, c3, u2, r3, d4, g5) : bn(e2, n3, o3, a3, 0, s3, l3, c3, u2, r3, d4, g5), f3 = e2.destructible, e2.assignable = 16 & f3 ? 2 : 1, 18 === e2.getToken() || 1074790415 === e2.getToken() ? 2 & e2.assignable && (f3 |= 16) : 8 & e2.destructible ? t(e2, 71) : (h2 = _e(e2, n3, a3, h2, s3, 0, r3, d4, g5), f3 = 2 & e2.assignable ? 16 : 0, 4194304 & ~e2.getToken() ? (8388608 & ~e2.getToken() || (h2 = Me(e2, n3, a3, 1, r3, d4, g5, 4, b4, h2)), Q(e2, 8192 | n3, 22) && (h2 = He(e2, n3, a3, h2, r3, d4, g5)), f3 |= 2 & e2.assignable ? 16 : 32) : h2 = Je(e2, n3, a3, s3, l3, r3, d4, g5, h2)));
        } else 69271571 === e2.getToken() ? (f3 |= 16, 209005 === b4 && (x2 |= 16), x2 |= 2 | (12400 === b4 ? 256 : 12401 === b4 ? 512 : 1), T2 = hn(e2, n3, a3, s3), f3 |= e2.assignable, h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)) : 143360 & e2.getToken() ? (f3 |= 16, -2147483528 === b4 && t(e2, 95), 209005 === b4 ? (1 & e2.flags && t(e2, 132), x2 |= 17) : 12400 === b4 ? x2 |= 256 : 12401 === b4 ? x2 |= 512 : t(e2, 0), T2 = cn(e2, n3), h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)) : 67174411 === e2.getToken() ? (f3 |= 16, x2 |= 1, h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)) : 8391476 === e2.getToken() ? (f3 |= 16, 12400 === b4 ? t(e2, 42) : 12401 === b4 ? t(e2, 43) : 209005 !== b4 && t(e2, 30, N[52]), J(e2, n3), x2 |= 9 | (209005 === b4 ? 16 : 0), 143360 & e2.getToken() ? T2 = cn(e2, n3) : 134217728 & ~e2.getToken() ? 69271571 === e2.getToken() ? (x2 |= 2, T2 = hn(e2, n3, a3, s3), f3 |= e2.assignable) : t(e2, 30, N[255 & e2.getToken()]) : T2 = un(e2, n3), h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)) : 134217728 & ~e2.getToken() ? t(e2, 133) : (209005 === b4 && (x2 |= 16), x2 |= 12400 === b4 ? 256 : 12401 === b4 ? 512 : 1, f3 |= 16, T2 = un(e2, n3), h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn));
        else if (134217728 & ~e2.getToken()) if (69271571 === e2.getToken()) if (T2 = hn(e2, n3, a3, s3), f3 |= 256 & e2.destructible ? 256 : 0, x2 |= 2, 21 === e2.getToken()) {
          J(e2, 8192 | n3);
          const { tokenIndex: r3, tokenLine: i5, tokenColumn: d4, tokenValue: g5 } = e2, k5 = e2.getToken();
          if (143360 & e2.getToken()) {
            h2 = Ye(e2, n3, a3, c3, 0, 1, s3, 1, r3, i5, d4);
            const t3 = e2.getToken();
            h2 = _e(e2, n3, a3, h2, s3, 0, r3, i5, d4), 4194304 & ~e2.getToken() ? 18 === e2.getToken() || 1074790415 === e2.getToken() ? 1077936155 === t3 || 1074790415 === t3 || 18 === t3 ? 2 & e2.assignable ? f3 |= 16 : !o3 || 143360 & ~k5 || de(e2, n3, o3, g5, c3, u2) : f3 |= 1 & e2.assignable ? 32 : 16 : (f3 |= 16, h2 = je(e2, n3, a3, s3, l3, r3, i5, d4, h2)) : (f3 |= 2 & e2.assignable ? 16 : 1077936155 === t3 ? 0 : 32, h2 = Je(e2, n3, a3, s3, l3, r3, i5, d4, h2));
          } else 2097152 & ~e2.getToken() ? (h2 = Xe(e2, n3, a3, 1, 0, 1, r3, i5, d4), f3 |= 1 & e2.assignable ? 32 : 16, 18 === e2.getToken() || 1074790415 === e2.getToken() ? 2 & e2.assignable && (f3 |= 16) : (h2 = _e(e2, n3, a3, h2, s3, 0, r3, i5, d4), f3 = 1 & e2.assignable ? 0 : 16, 18 !== e2.getToken() && 1074790415 !== e2.getToken() && (1077936155 !== e2.getToken() && (f3 |= 16), h2 = je(e2, n3, a3, s3, l3, r3, i5, d4, h2)))) : (h2 = 69271571 === e2.getToken() ? kn(e2, n3, o3, a3, 0, s3, l3, c3, u2, r3, i5, d4) : bn(e2, n3, o3, a3, 0, s3, l3, c3, u2, r3, i5, d4), f3 = e2.destructible, e2.assignable = 16 & f3 ? 2 : 1, 18 === e2.getToken() || 1074790415 === e2.getToken() ? 2 & e2.assignable && (f3 |= 16) : 8 & f3 ? t(e2, 62) : (h2 = _e(e2, n3, a3, h2, s3, 0, r3, i5, d4), f3 = 2 & e2.assignable ? 16 | f3 : 0, 4194304 & ~e2.getToken() ? (8388608 & ~e2.getToken() || (h2 = Me(e2, n3, a3, 1, r3, i5, d4, 4, b4, h2)), Q(e2, 8192 | n3, 22) && (h2 = He(e2, n3, a3, h2, r3, i5, d4)), f3 |= 2 & e2.assignable ? 16 : 32) : (1077936155 !== e2.getToken() && (f3 |= 16), h2 = Je(e2, n3, a3, s3, l3, r3, i5, d4, h2))));
        } else 67174411 === e2.getToken() ? (x2 |= 1, h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, d3, g4), f3 = 16) : t(e2, 44);
        else if (8391476 === b4) if (ee(e2, 8192 | n3, 8391476), x2 |= 8, 143360 & e2.getToken()) {
          const t3 = e2.getToken();
          T2 = cn(e2, n3), x2 |= 1, 67174411 === e2.getToken() ? (f3 |= 16, h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)) : r(e2.tokenIndex, e2.tokenLine, e2.tokenColumn, e2.index, e2.line, e2.column, 209005 === t3 ? 46 : 12400 === t3 || 12401 === e2.getToken() ? 45 : 47, N[255 & t3]);
        } else 134217728 & ~e2.getToken() ? 69271571 === e2.getToken() ? (f3 |= 16, x2 |= 3, T2 = hn(e2, n3, a3, s3), h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn)) : t(e2, 126) : (f3 |= 16, T2 = un(e2, n3), x2 |= 1, h2 = mn(e2, n3, a3, x2, s3, k4, d3, g4));
        else t(e2, 30, N[255 & b4]);
        else if (T2 = un(e2, n3), 21 === e2.getToken()) {
          ee(e2, 8192 | n3, 21);
          const { tokenIndex: t3, tokenLine: r3, tokenColumn: d4 } = e2;
          if ("__proto__" === i4 && m2++, 143360 & e2.getToken()) {
            h2 = Ye(e2, n3, a3, c3, 0, 1, s3, 1, t3, r3, d4);
            const { tokenValue: i5 } = e2, g5 = e2.getToken();
            h2 = _e(e2, n3, a3, h2, s3, 0, t3, r3, d4), 18 === e2.getToken() || 1074790415 === e2.getToken() ? 1077936155 === g5 || 1074790415 === g5 || 18 === g5 ? 2 & e2.assignable ? f3 |= 16 : o3 && de(e2, n3, o3, i5, c3, u2) : f3 |= 1 & e2.assignable ? 32 : 16 : 1077936155 === e2.getToken() ? (2 & e2.assignable && (f3 |= 16), h2 = je(e2, n3, a3, s3, l3, t3, r3, d4, h2)) : (f3 |= 16, h2 = je(e2, n3, a3, s3, l3, t3, r3, d4, h2));
          } else 2097152 & ~e2.getToken() ? (h2 = Xe(e2, n3, a3, 1, 0, 1, t3, r3, d4), f3 |= 1 & e2.assignable ? 32 : 16, 18 === e2.getToken() || 1074790415 === e2.getToken() ? 2 & e2.assignable && (f3 |= 16) : (h2 = _e(e2, n3, a3, h2, s3, 0, t3, r3, d4), f3 = 1 & e2.assignable ? 0 : 16, 18 !== e2.getToken() && 1074790415 !== e2.getToken() && (1077936155 !== e2.getToken() && (f3 |= 16), h2 = je(e2, n3, a3, s3, l3, t3, r3, d4, h2)))) : (h2 = 69271571 === e2.getToken() ? kn(e2, n3, o3, a3, 0, s3, l3, c3, u2, t3, r3, d4) : bn(e2, n3, o3, a3, 0, s3, l3, c3, u2, t3, r3, d4), f3 = e2.destructible, e2.assignable = 16 & f3 ? 2 : 1, 18 === e2.getToken() || 1074790415 === e2.getToken() ? 2 & e2.assignable && (f3 |= 16) : 8 & ~e2.destructible && (h2 = _e(e2, n3, a3, h2, s3, 0, t3, r3, d4), f3 = 2 & e2.assignable ? 16 : 0, 4194304 & ~e2.getToken() ? (8388608 & ~e2.getToken() || (h2 = Me(e2, n3, a3, 1, t3, r3, d4, 4, b4, h2)), Q(e2, 8192 | n3, 22) && (h2 = He(e2, n3, a3, h2, t3, r3, d4)), f3 |= 2 & e2.assignable ? 16 : 32) : h2 = Je(e2, n3, a3, s3, l3, t3, r3, d4, h2)));
        } else 67174411 === e2.getToken() ? (x2 |= 1, h2 = mn(e2, n3, a3, x2, s3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn), f3 = 16 | e2.assignable) : t(e2, 134);
        f3 |= 128 & e2.destructible ? 128 : 0, e2.destructible = f3, p3.push(ie(e2, n3, k4, d3, g4, { type: "Property", key: T2, value: h2, kind: 768 & x2 ? 512 & x2 ? "set" : "get" : "init", computed: (2 & x2) > 0, method: (1 & x2) > 0, shorthand: (4 & x2) > 0 }));
      }
      if (f3 |= e2.destructible, 18 !== e2.getToken()) break;
      J(e2, n3);
    }
    ee(e2, n3, 1074790415), m2 > 1 && (f3 |= 64);
    const b3 = ie(e2, n3, d2, g3, k3, { type: l3 ? "ObjectPattern" : "ObjectExpression", properties: p3 });
    return !i3 && 4194304 & e2.getToken() ? pn(e2, n3, a3, f3, s3, l3, d2, g3, k3, b3) : (e2.destructible = f3, b3);
  }
  function hn(e2, n3, t3, o3) {
    J(e2, 8192 | n3);
    const r3 = Oe(e2, 33554432 ^ (33554432 | n3), t3, 1, o3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
    return ee(e2, n3, 20), r3;
  }
  function xn(e2, n3, t3, o3, r3, a3) {
    const { tokenValue: i3 } = e2;
    let s3 = 0, l3 = 0;
    537079808 & ~e2.getToken() ? 36864 & ~e2.getToken() || (l3 = 1) : s3 = 1;
    const c3 = cn(e2, n3);
    if (e2.assignable = 1, 10 === e2.getToken()) {
      let u2;
      return 16 & n3 && (u2 = le(e2, n3, i3)), s3 && (e2.flags |= 128), l3 && (e2.flags |= 256), Cn(e2, n3, u2, t3, [c3], 0, o3, r3, a3);
    }
    return c3;
  }
  function Tn(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2, d2) {
    s3 || t(e2, 57), i3 && t(e2, 51), e2.flags &= -129;
    return Cn(e2, n3, 16 & n3 ? le(e2, n3, r3) : void 0, o3, [a3], l3, c3, u2, d2);
  }
  function yn(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2) {
    i3 || t(e2, 57);
    for (let n4 = 0; n4 < a3.length; ++n4) ne(e2, a3[n4]);
    return Cn(e2, n3, o3, r3, a3, s3, l3, c3, u2);
  }
  function Cn(e2, n3, r3, a3, i3, s3, l3, c3, u2) {
    1 & e2.flags && t(e2, 48), ee(e2, 8192 | n3, 10);
    const d2 = 271319040;
    n3 = (n3 | d2) ^ d2 | (s3 ? 524288 : 0);
    const g3 = 2162700 !== e2.getToken();
    let k3;
    if (r3 && r3.scopeError && o(r3.scopeError), g3) e2.flags = 4928 ^ (4928 | e2.flags), k3 = Oe(e2, n3, a3, 1, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn);
    else {
      r3 && (r3 = ue(r3, 128));
      const o3 = 33557504;
      switch (k3 = ze(e2, (n3 | o3) ^ o3 | 1048576, r3, a3, 16, void 0, void 0), e2.getToken()) {
        case 69271571:
          1 & e2.flags || t(e2, 116);
          break;
        case 67108877:
        case 67174409:
        case 22:
          t(e2, 117);
        case 67174411:
          1 & e2.flags || t(e2, 116), e2.flags |= 1024;
      }
      8388608 & ~e2.getToken() || 1 & e2.flags || t(e2, 30, N[255 & e2.getToken()]), 33619968 & ~e2.getToken() || t(e2, 125);
    }
    return e2.assignable = 2, ie(e2, n3, l3, c3, u2, { type: "ArrowFunctionExpression", params: i3, body: k3, async: 1 === s3, expression: g3 });
  }
  function vn(e2, n3, r3, a3, i3, s3) {
    ee(e2, n3, 67174411), e2.flags = 128 ^ (128 | e2.flags);
    const l3 = [];
    if (Q(e2, n3, 16)) return l3;
    n3 = 33554432 ^ (33554432 | n3);
    let c3 = 0;
    for (; 18 !== e2.getToken(); ) {
      let o3;
      const { tokenIndex: u2, tokenLine: d2, tokenColumn: g3 } = e2, k3 = e2.getToken();
      if (143360 & k3 ? (256 & n3 || (36864 & ~k3 || (e2.flags |= 256), 537079808 & ~k3 || (e2.flags |= 512)), o3 = Un(e2, n3, r3, 1 | s3, 0, u2, d2, g3)) : (2162700 === k3 ? o3 = bn(e2, n3, r3, a3, 1, i3, 1, s3, 0, u2, d2, g3) : 69271571 === k3 ? o3 = kn(e2, n3, r3, a3, 1, i3, 1, s3, 0, u2, d2, g3) : 14 === k3 ? o3 = fn(e2, n3, r3, a3, 16, s3, 0, 0, i3, 1, u2, d2, g3) : t(e2, 30, N[255 & k3]), c3 = 1, 48 & e2.destructible && t(e2, 50)), 1077936155 === e2.getToken()) {
        J(e2, 8192 | n3), c3 = 1;
        o3 = ie(e2, n3, u2, d2, g3, { type: "AssignmentPattern", left: o3, right: Oe(e2, n3, a3, 1, i3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) });
      }
      if (l3.push(o3), !Q(e2, n3, 18)) break;
      if (16 === e2.getToken()) break;
    }
    return c3 && (e2.flags |= 128), r3 && (c3 || 256 & n3) && r3.scopeError && o(r3.scopeError), ee(e2, n3, 16), l3;
  }
  function wn(e2, n3, t3, o3, r3, a3, i3, s3) {
    const l3 = e2.getToken();
    if (67108864 & l3) {
      if (67108877 === l3) {
        J(e2, 67108864 | n3), e2.assignable = 1;
        return wn(e2, n3, t3, ie(e2, n3, a3, i3, s3, { type: "MemberExpression", object: o3, computed: false, property: $e(e2, n3, t3) }), 0, a3, i3, s3);
      }
      if (69271571 === l3) {
        J(e2, 8192 | n3);
        const { tokenIndex: l4, tokenLine: c3, tokenColumn: u2 } = e2, d2 = Fe(e2, n3, t3, r3, 1, l4, c3, u2);
        return ee(e2, n3, 20), e2.assignable = 1, wn(e2, n3, t3, ie(e2, n3, a3, i3, s3, { type: "MemberExpression", object: o3, computed: true, property: d2 }), 0, a3, i3, s3);
      }
      if (67174408 === l3 || 67174409 === l3) return e2.assignable = 2, wn(e2, n3, t3, ie(e2, n3, a3, i3, s3, { type: "TaggedTemplateExpression", tag: o3, quasi: 67174408 === e2.getToken() ? rn(e2, 16384 | n3, t3) : on(e2, 16384 | n3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) }), 0, a3, i3, s3);
    }
    return o3;
  }
  function Ln(e2, n3, o3, r3, a3, i3, s3) {
    return 209006 === e2.getToken() && t(e2, 31), 262400 & n3 && 241771 === e2.getToken() && t(e2, 32), be(e2, n3, e2.getToken()), 36864 & ~e2.getToken() || (e2.flags |= 256), Tn(e2, -268435457 & n3 | 524288, o3, e2.tokenValue, cn(e2, n3), 0, r3, 1, a3, i3, s3);
  }
  function In(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2, d2) {
    J(e2, 8192 | n3);
    const g3 = 16 & n3 ? ue({ parent: void 0, type: 2 }, 1024) : void 0;
    if (Q(e2, n3 = 33554432 ^ (33554432 | n3), 16)) return 10 === e2.getToken() ? (1 & l3 && t(e2, 48), yn(e2, n3, g3, o3, [], a3, 1, c3, u2, d2)) : ie(e2, n3, c3, u2, d2, { type: "CallExpression", callee: r3, arguments: [] });
    let k3 = 0, p3 = null, f3 = 0;
    e2.destructible = 384 ^ (384 | e2.destructible);
    const m2 = [];
    for (; 16 !== e2.getToken(); ) {
      const { tokenIndex: a4, tokenLine: l4, tokenColumn: b3 } = e2, h2 = e2.getToken();
      if (143360 & h2) g3 && ge(e2, n3, g3, e2.tokenValue, i3, 0), 537079808 & ~h2 ? 36864 & ~h2 || (e2.flags |= 256) : e2.flags |= 512, p3 = Ye(e2, n3, o3, i3, 0, 1, 1, 1, a4, l4, b3), 16 === e2.getToken() || 18 === e2.getToken() ? 2 & e2.assignable && (k3 |= 16, f3 = 1) : (1077936155 === e2.getToken() ? f3 = 1 : k3 |= 16, p3 = _e(e2, n3, o3, p3, 1, 0, a4, l4, b3), 16 !== e2.getToken() && 18 !== e2.getToken() && (p3 = je(e2, n3, o3, 1, 0, a4, l4, b3, p3)));
      else if (2097152 & h2) p3 = 2162700 === h2 ? bn(e2, n3, g3, o3, 0, 1, 0, i3, s3, a4, l4, b3) : kn(e2, n3, g3, o3, 0, 1, 0, i3, s3, a4, l4, b3), k3 |= e2.destructible, f3 = 1, 16 !== e2.getToken() && 18 !== e2.getToken() && (8 & k3 && t(e2, 122), p3 = _e(e2, n3, o3, p3, 0, 0, a4, l4, b3), k3 |= 16, 8388608 & ~e2.getToken() || (p3 = Me(e2, n3, o3, 1, c3, u2, d2, 4, h2, p3)), Q(e2, 8192 | n3, 22) && (p3 = He(e2, n3, o3, p3, c3, u2, d2)));
      else {
        if (14 !== h2) {
          for (p3 = Oe(e2, n3, o3, 1, 0, a4, l4, b3), k3 = e2.assignable, m2.push(p3); Q(e2, 8192 | n3, 18); ) m2.push(Oe(e2, n3, o3, 1, 0, a4, l4, b3));
          return k3 |= e2.assignable, ee(e2, n3, 16), e2.destructible = 16 | k3, e2.assignable = 2, ie(e2, n3, c3, u2, d2, { type: "CallExpression", callee: r3, arguments: m2 });
        }
        p3 = fn(e2, n3, g3, o3, 16, i3, s3, 1, 1, 0, a4, l4, b3), k3 |= (16 === e2.getToken() ? 0 : 16) | e2.destructible, f3 = 1;
      }
      if (m2.push(p3), !Q(e2, 8192 | n3, 18)) break;
    }
    return ee(e2, n3, 16), k3 |= 256 & e2.destructible ? 256 : 128 & e2.destructible ? 128 : 0, 10 === e2.getToken() ? (48 & k3 && t(e2, 27), (1 & e2.flags || 1 & l3) && t(e2, 48), 128 & k3 && t(e2, 31), 262400 & n3 && 256 & k3 && t(e2, 32), f3 && (e2.flags |= 128), yn(e2, 524288 | n3, g3, o3, m2, a3, 1, c3, u2, d2)) : (64 & k3 && t(e2, 63), 8 & k3 && t(e2, 62), e2.assignable = 2, ie(e2, n3, c3, u2, d2, { type: "CallExpression", callee: r3, arguments: m2 }));
  }
  function qn(e2, n3, o3, r3, a3, i3, s3, l3) {
    let c3 = En(e2, n3, r3);
    c3.length && (i3 = e2.tokenIndex, s3 = e2.tokenLine, l3 = e2.tokenColumn), e2.leadingDecorators.length && (e2.leadingDecorators.push(...c3), c3 = e2.leadingDecorators, e2.leadingDecorators = []), J(e2, n3 = 4194304 ^ (4194560 | n3));
    let u2 = null, d2 = null;
    const { tokenValue: g3 } = e2;
    4096 & e2.getToken() && 20565 !== e2.getToken() ? (re(e2, n3, e2.getToken()) && t(e2, 118), 537079808 & ~e2.getToken() || t(e2, 119), o3 && (ge(e2, n3, o3, g3, 32, 0), a3 && 2 & a3 && fe(e2, g3)), u2 = cn(e2, n3)) : 1 & a3 || t(e2, 39, "Class");
    let k3 = n3;
    Q(e2, 8192 | n3, 20565) ? (d2 = Xe(e2, n3, r3, 0, 0, 0, e2.tokenIndex, e2.tokenLine, e2.tokenColumn), k3 |= 131072) : k3 = 131072 ^ (131072 | k3);
    return ie(e2, n3, i3, s3, l3, { type: "ClassDeclaration", id: u2, superClass: d2, body: An(e2, k3, n3, o3, r3, 2, 8, 0), ...1 & n3 ? { decorators: c3 } : null });
  }
  function En(e2, n3, t3) {
    const o3 = [];
    if (1 & n3) for (; 132 === e2.getToken(); ) o3.push(Sn(e2, n3, t3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn));
    return o3;
  }
  function Sn(e2, n3, t3, o3, r3, a3) {
    J(e2, 8192 | n3);
    let i3 = Ye(e2, n3, t3, 2, 0, 1, 0, 1, o3, r3, a3);
    return i3 = _e(e2, n3, t3, i3, 0, 0, o3, r3, a3), ie(e2, n3, o3, r3, a3, { type: "Decorator", expression: i3 });
  }
  function An(e2, o3, r3, a3, i3, s3, l3, c3) {
    const { tokenIndex: u2, tokenLine: d2, tokenColumn: g3 } = e2, k3 = 16 & o3 ? { parent: i3, refs: /* @__PURE__ */ Object.create(null) } : void 0;
    ee(e2, 8192 | o3, 2162700);
    const p3 = 301989888;
    o3 = (o3 | p3) ^ p3;
    const f3 = 32 & e2.flags;
    e2.flags = 32 ^ (32 | e2.flags);
    const m2 = [];
    let b3;
    for (; 1074790415 !== e2.getToken(); ) {
      let n3 = 0;
      b3 = En(e2, o3, k3), n3 = b3.length, n3 > 0 && "constructor" === e2.tokenValue && t(e2, 109), 1074790415 === e2.getToken() && t(e2, 108), Q(e2, o3, 1074790417) ? n3 > 0 && t(e2, 120) : m2.push(Dn(e2, o3, a3, k3, r3, s3, b3, 0, c3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn));
    }
    return ee(e2, 8 & l3 ? 8192 | o3 : o3, 1074790415), k3 && function(e3) {
      for (const t3 in e3.refs) if (!pe(t3, e3)) {
        const { index: o4, line: r4, column: a4 } = e3.refs[t3][0];
        throw new n(o4, r4, a4, o4 + t3.length, r4, a4 + t3.length, 4, t3);
      }
    }(k3), e2.flags = -33 & e2.flags | f3, ie(e2, o3, u2, d2, g3, { type: "ClassBody", body: m2 });
  }
  function Dn(e2, n3, o3, r3, a3, i3, s3, l3, c3, u2, d2, g3) {
    let k3 = l3 ? 32 : 0, p3 = null;
    const { tokenIndex: f3, tokenLine: m2, tokenColumn: b3 } = e2, h2 = e2.getToken();
    if (176128 & h2 || -2147483528 === h2) switch (p3 = cn(e2, n3), h2) {
      case 36970:
        if (!l3 && 67174411 !== e2.getToken() && 1048576 & ~e2.getToken() && 1077936155 !== e2.getToken()) return Dn(e2, n3, o3, r3, a3, i3, s3, 1, c3, u2, d2, g3);
        break;
      case 209005:
        if (67174411 !== e2.getToken() && !(1 & e2.flags)) {
          if (!(1073741824 & ~e2.getToken())) return Rn(e2, n3, r3, p3, k3, s3, f3, m2, b3);
          k3 |= 16 | (K(e2, n3, 8391476) ? 8 : 0);
        }
        break;
      case 12400:
        if (67174411 !== e2.getToken()) {
          if (!(1073741824 & ~e2.getToken())) return Rn(e2, n3, r3, p3, k3, s3, f3, m2, b3);
          k3 |= 256;
        }
        break;
      case 12401:
        if (67174411 !== e2.getToken()) {
          if (!(1073741824 & ~e2.getToken())) return Rn(e2, n3, r3, p3, k3, s3, f3, m2, b3);
          k3 |= 512;
        }
        break;
      case 12402:
        if (67174411 !== e2.getToken() && !(1 & e2.flags)) {
          if (!(1073741824 & ~e2.getToken())) return Rn(e2, n3, r3, p3, k3, s3, f3, m2, b3);
          1 & n3 && (k3 |= 1024);
        }
    }
    else if (69271571 === h2) k3 |= 2, p3 = hn(e2, a3, r3, c3);
    else if (134217728 & ~h2) if (8391476 === h2) k3 |= 8, J(e2, n3);
    else if (130 === e2.getToken()) k3 |= 8192, p3 = Vn(e2, 4096 | n3, r3, 768, f3, m2, b3);
    else if (1073741824 & ~e2.getToken()) {
      if (l3 && 2162700 === h2) return function(e3, n4, t3, o4, r4, a4, i4) {
        t3 && (t3 = ue(t3, 2));
        const s4 = 1475584;
        n4 = 285802496 | (n4 | s4) ^ s4;
        const { body: l4 } = Ce(e3, n4, t3, o4, {}, r4, a4, i4);
        return ie(e3, n4, r4, a4, i4, { type: "StaticBlock", body: l4 });
      }(e2, 4096 | n3, o3, r3, f3, m2, b3);
      -2147483527 === h2 ? (p3 = cn(e2, n3), 67174411 !== e2.getToken() && t(e2, 30, N[255 & e2.getToken()])) : t(e2, 30, N[255 & e2.getToken()]);
    } else k3 |= 128;
    else p3 = un(e2, n3);
    if (1816 & k3 && (143360 & e2.getToken() || -2147483528 === e2.getToken() || -2147483527 === e2.getToken() ? p3 = cn(e2, n3) : 134217728 & ~e2.getToken() ? 69271571 === e2.getToken() ? (k3 |= 2, p3 = hn(e2, n3, r3, 0)) : 130 === e2.getToken() ? (k3 |= 8192, p3 = Vn(e2, n3, r3, k3, f3, m2, b3)) : t(e2, 135) : p3 = un(e2, n3)), 2 & k3 || ("constructor" === e2.tokenValue ? (1073741824 & ~e2.getToken() ? 32 & k3 || 67174411 !== e2.getToken() || (920 & k3 ? t(e2, 53, "accessor") : 131072 & n3 || (32 & e2.flags ? t(e2, 54) : e2.flags |= 32)) : t(e2, 129), k3 |= 64) : !(8192 & k3) && 32 & k3 && "prototype" === e2.tokenValue && t(e2, 52)), 1024 & k3 || 67174411 !== e2.getToken() && !(768 & k3)) return Rn(e2, n3, r3, p3, k3, s3, f3, m2, b3);
    return ie(e2, n3, u2, d2, g3, { type: "MethodDefinition", kind: !(32 & k3) && 64 & k3 ? "constructor" : 256 & k3 ? "get" : 512 & k3 ? "set" : "method", static: (32 & k3) > 0, computed: (2 & k3) > 0, key: p3, value: mn(e2, 4096 | n3, r3, k3, c3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn), ...1 & n3 ? { decorators: s3 } : null });
  }
  function Vn(e2, n3, o3, r3, a3, i3, s3) {
    J(e2, n3);
    const { tokenValue: l3 } = e2;
    return "constructor" === l3 && t(e2, 128), 16 & n3 && (o3 || t(e2, 4, l3), r3 ? function(e3, n4, o4, r4) {
      let a4 = 800 & r4;
      768 & a4 || (a4 |= 768);
      const i4 = n4["#" + o4];
      void 0 !== i4 && ((32 & i4) != (32 & a4) || i4 & a4 & 768) && t(e3, 146, o4), n4["#" + o4] = i4 ? i4 | a4 : a4;
    }(e2, o3, l3, r3) : function(e3, n4, t3) {
      n4.refs[t3] ??= [], n4.refs[t3].push({ index: e3.tokenIndex, line: e3.tokenLine, column: e3.tokenColumn });
    }(e2, o3, l3)), J(e2, n3), ie(e2, n3, a3, i3, s3, { type: "PrivateIdentifier", name: l3 });
  }
  function Rn(e2, n3, o3, r3, a3, i3, s3, l3, c3) {
    let u2 = null;
    if (8 & a3 && t(e2, 0), 1077936155 === e2.getToken()) {
      J(e2, 8192 | n3);
      const { tokenIndex: r4, tokenLine: i4, tokenColumn: s4 } = e2;
      537079927 === e2.getToken() && t(e2, 119);
      const l4 = 2883584 | (64 & a3 ? 0 : 4325376);
      u2 = Ye(e2, 4096 | (n3 = 16842752 | ((n3 | l4) ^ l4 | (8 & a3 ? 262144 : 0) | (16 & a3 ? 524288 : 0) | (64 & a3 ? 4194304 : 0))), o3, 2, 0, 1, 0, 1, r4, i4, s4), !(1073741824 & ~e2.getToken()) && 4194304 & ~e2.getToken() || (u2 = _e(e2, 4096 | n3, o3, u2, 0, 0, r4, i4, s4), u2 = je(e2, 4096 | n3, o3, 0, 0, r4, i4, s4, u2));
    }
    return Z(e2, n3), ie(e2, n3, s3, l3, c3, { type: 1024 & a3 ? "AccessorProperty" : "PropertyDefinition", key: r3, value: u2, static: (32 & a3) > 0, computed: (2 & a3) > 0, ...1 & n3 ? { decorators: i3 } : null });
  }
  function Nn(e2, n3, o3, r3, a3, i3, s3, l3, c3) {
    if (143360 & e2.getToken() || !(256 & n3) && -2147483527 === e2.getToken()) return Un(e2, n3, o3, a3, i3, s3, l3, c3);
    2097152 & ~e2.getToken() && t(e2, 30, N[255 & e2.getToken()]);
    const u2 = 69271571 === e2.getToken() ? kn(e2, n3, o3, r3, 1, 0, 1, a3, i3, s3, l3, c3) : bn(e2, n3, o3, r3, 1, 0, 1, a3, i3, s3, l3, c3);
    return 16 & e2.destructible && t(e2, 50), 32 & e2.destructible && t(e2, 50), u2;
  }
  function Un(e2, n3, o3, r3, a3, i3, s3, l3) {
    const { tokenValue: c3 } = e2, u2 = e2.getToken();
    return 256 & n3 && (537079808 & ~u2 ? 36864 & ~u2 && -2147483527 !== u2 || t(e2, 118) : t(e2, 119)), 20480 & ~u2 || t(e2, 102), 241771 === u2 && (262144 & n3 && t(e2, 32), 512 & n3 && t(e2, 111)), 73 == (255 & u2) && 24 & r3 && t(e2, 100), 209006 === u2 && (524288 & n3 && t(e2, 176), 512 & n3 && t(e2, 110)), J(e2, n3), o3 && de(e2, n3, o3, c3, r3, a3), ie(e2, n3, i3, s3, l3, { type: "Identifier", name: c3 });
  }
  function Pn(e2, n3, o3, r3, a3, i3, s3) {
    if (r3 || ee(e2, n3, 8456256), 8390721 === e2.getToken()) {
      const t3 = function(e3, n4, t4, o4, r4) {
        return $2(e3, n4), ie(e3, n4, t4, o4, r4, { type: "JSXOpeningFragment" });
      }(e2, n3, a3, i3, s3), [l4, c4] = function(e3, n4, t4, o4) {
        const r4 = [];
        for (; ; ) {
          const a4 = On(e3, n4, t4, o4, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          if ("JSXClosingFragment" === a4.type) return [r4, a4];
          r4.push(a4);
        }
      }(e2, n3, o3, r3);
      return ie(e2, n3, a3, i3, s3, { type: "JSXFragment", openingFragment: t3, children: l4, closingFragment: c4 });
    }
    8457014 === e2.getToken() && t(e2, 30, N[255 & e2.getToken()]);
    let l3 = null, c3 = [];
    const u2 = function(e3, n4, o4, r4, a4, i4, s4) {
      143360 & ~e3.getToken() && 4096 & ~e3.getToken() && t(e3, 0);
      const l4 = Fn(e3, n4, e3.tokenIndex, e3.tokenLine, e3.tokenColumn), c4 = function(e4, n5, t3) {
        const o5 = [];
        for (; 8457014 !== e4.getToken() && 8390721 !== e4.getToken() && 1048576 !== e4.getToken(); ) o5.push(Jn(e4, n5, t3, e4.tokenIndex, e4.tokenLine, e4.tokenColumn));
        return o5;
      }(e3, n4, o4), u3 = 8457014 === e3.getToken();
      u3 && ee(e3, n4, 8457014);
      8390721 !== e3.getToken() && t(e3, 25, N[65]);
      r4 || !u3 ? $2(e3, n4) : J(e3, n4);
      return ie(e3, n4, a4, i4, s4, { type: "JSXOpeningElement", name: l4, attributes: c4, selfClosing: u3 });
    }(e2, n3, o3, r3, a3, i3, s3);
    if (!u2.selfClosing) {
      [c3, l3] = function(e3, n4, t3, o4) {
        const r4 = [];
        for (; ; ) {
          const a5 = Bn(e3, n4, t3, o4, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
          if ("JSXClosingElement" === a5.type) return [r4, a5];
          r4.push(a5);
        }
      }(e2, n3, o3, r3);
      const a4 = se(l3.name);
      se(u2.name) !== a4 && t(e2, 155, a4);
    }
    return ie(e2, n3, a3, i3, s3, { type: "JSXElement", children: c3, openingElement: u2, closingElement: l3 });
  }
  function Bn(e2, n3, o3, r3, a3, i3, s3) {
    return 137 === e2.getToken() ? Gn(e2, n3, a3, i3, s3) : 2162700 === e2.getToken() ? Mn(e2, n3, o3, 1, 0, a3, i3, s3) : 8456256 === e2.getToken() ? (J(e2, n3), 8457014 === e2.getToken() ? function(e3, n4, o4, r4, a4, i4) {
      ee(e3, n4, 8457014);
      const s4 = Fn(e3, n4, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
      return 8390721 !== e3.getToken() && t(e3, 25, N[65]), o4 ? $2(e3, n4) : J(e3, n4), ie(e3, n4, r4, a4, i4, { type: "JSXClosingElement", name: s4 });
    }(e2, n3, r3, a3, i3, s3) : Pn(e2, n3, o3, 1, a3, i3, s3)) : void t(e2, 0);
  }
  function On(e2, n3, o3, r3, a3, i3, s3) {
    return 137 === e2.getToken() ? Gn(e2, n3, a3, i3, s3) : 2162700 === e2.getToken() ? Mn(e2, n3, o3, 1, 0, a3, i3, s3) : 8456256 === e2.getToken() ? (J(e2, n3), 8457014 === e2.getToken() ? function(e3, n4, o4, r4, a4, i4) {
      return ee(e3, n4, 8457014), 8390721 !== e3.getToken() && t(e3, 25, N[65]), o4 ? $2(e3, n4) : J(e3, n4), ie(e3, n4, r4, a4, i4, { type: "JSXClosingFragment" });
    }(e2, n3, r3, a3, i3, s3) : Pn(e2, n3, o3, 1, a3, i3, s3)) : void t(e2, 0);
  }
  function Gn(e2, n3, t3, o3, r3) {
    J(e2, n3);
    const a3 = { type: "JSXText", value: e2.tokenValue };
    return 128 & n3 && (a3.raw = e2.tokenRaw), ie(e2, n3, t3, o3, r3, a3);
  }
  function Fn(e2, n3, t3, o3, r3) {
    Y(e2);
    let a3 = zn(e2, n3, t3, o3, r3);
    if (21 === e2.getToken()) return Hn(e2, n3, a3, t3, o3, r3);
    for (; Q(e2, n3, 67108877); ) Y(e2), a3 = jn(e2, n3, a3, t3, o3, r3);
    return a3;
  }
  function jn(e2, n3, t3, o3, r3, a3) {
    return ie(e2, n3, o3, r3, a3, { type: "JSXMemberExpression", object: t3, property: zn(e2, n3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) });
  }
  function Jn(e2, n3, o3, r3, a3, i3) {
    if (2162700 === e2.getToken()) return function(e3, n4, t3, o4, r4, a4) {
      J(e3, n4), ee(e3, n4, 14);
      const i4 = Oe(e3, n4, t3, 1, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
      return ee(e3, n4, 1074790415), ie(e3, n4, o4, r4, a4, { type: "JSXSpreadAttribute", argument: i4 });
    }(e2, n3, o3, r3, a3, i3);
    Y(e2);
    let s3 = null, l3 = zn(e2, n3, r3, a3, i3);
    if (21 === e2.getToken() && (l3 = Hn(e2, n3, l3, r3, a3, i3)), 1077936155 === e2.getToken()) {
      const r4 = _(e2, n3), { tokenIndex: a4, tokenLine: i4, tokenColumn: l4 } = e2;
      switch (r4) {
        case 134283267:
          s3 = un(e2, n3);
          break;
        case 8456256:
          s3 = Pn(e2, n3, o3, 0, a4, i4, l4);
          break;
        case 2162700:
          s3 = Mn(e2, n3, o3, 0, 1, a4, i4, l4);
          break;
        default:
          t(e2, 154);
      }
    }
    return ie(e2, n3, r3, a3, i3, { type: "JSXAttribute", value: s3, name: l3 });
  }
  function Hn(e2, n3, t3, o3, r3, a3) {
    ee(e2, n3, 21);
    return ie(e2, n3, o3, r3, a3, { type: "JSXNamespacedName", namespace: t3, name: zn(e2, n3, e2.tokenIndex, e2.tokenLine, e2.tokenColumn) });
  }
  function Mn(e2, n3, o3, r3, a3, i3, s3, l3) {
    J(e2, 8192 | n3);
    const { tokenIndex: c3, tokenLine: u2, tokenColumn: d2 } = e2;
    if (14 === e2.getToken()) return function(e3, n4, t3, o4, r4, a4) {
      ee(e3, n4, 14);
      const i4 = Oe(e3, n4, t3, 1, 0, e3.tokenIndex, e3.tokenLine, e3.tokenColumn);
      return ee(e3, n4, 1074790415), ie(e3, n4, o4, r4, a4, { type: "JSXSpreadChild", expression: i4 });
    }(e2, n3, o3, i3, s3, l3);
    let g3 = null;
    return 1074790415 === e2.getToken() ? (a3 && t(e2, 157), g3 = function(e3, n4, t3, o4, r4) {
      return e3.startIndex = e3.tokenIndex, e3.startLine = e3.tokenLine, e3.startColumn = e3.tokenColumn, ie(e3, n4, t3, o4, r4, { type: "JSXEmptyExpression" });
    }(e2, n3, e2.startIndex, e2.startLine, e2.startColumn)) : g3 = Oe(e2, n3, o3, 1, 0, c3, u2, d2), 1074790415 !== e2.getToken() && t(e2, 25, N[15]), r3 ? $2(e2, n3) : J(e2, n3), ie(e2, n3, i3, s3, l3, { type: "JSXExpressionContainer", expression: g3 });
  }
  function zn(e2, n3, o3, r3, a3) {
    143360 & e2.getToken() || t(e2, 30, N[255 & e2.getToken()]);
    const { tokenValue: i3 } = e2;
    return J(e2, n3), ie(e2, n3, o3, r3, a3, { type: "JSXIdentifier", name: i3 });
  }
  var Xn = Object.freeze({ __proto__: null });
  function $n(e2, n3) {
    return he(e2, n3, 0);
  }

  // node_modules/astring/dist/astring.mjs
  var { stringify } = JSON;
  if (!String.prototype.repeat) {
    throw new Error(
      "String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation"
    );
  }
  if (!String.prototype.endsWith) {
    throw new Error(
      "String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation"
    );
  }
  var OPERATOR_PRECEDENCE = {
    "||": 2,
    "??": 3,
    "&&": 4,
    "|": 5,
    "^": 6,
    "&": 7,
    "==": 8,
    "!=": 8,
    "===": 8,
    "!==": 8,
    "<": 9,
    ">": 9,
    "<=": 9,
    ">=": 9,
    in: 9,
    instanceof: 9,
    "<<": 10,
    ">>": 10,
    ">>>": 10,
    "+": 11,
    "-": 11,
    "*": 12,
    "%": 12,
    "/": 12,
    "**": 13
  };
  var NEEDS_PARENTHESES = 17;
  var EXPRESSIONS_PRECEDENCE = {
    // Definitions
    ArrayExpression: 20,
    TaggedTemplateExpression: 20,
    ThisExpression: 20,
    Identifier: 20,
    PrivateIdentifier: 20,
    Literal: 18,
    TemplateLiteral: 20,
    Super: 20,
    SequenceExpression: 20,
    // Operations
    MemberExpression: 19,
    ChainExpression: 19,
    CallExpression: 19,
    NewExpression: 19,
    // Other definitions
    ArrowFunctionExpression: NEEDS_PARENTHESES,
    ClassExpression: NEEDS_PARENTHESES,
    FunctionExpression: NEEDS_PARENTHESES,
    ObjectExpression: NEEDS_PARENTHESES,
    // Other operations
    UpdateExpression: 16,
    UnaryExpression: 15,
    AwaitExpression: 15,
    BinaryExpression: 14,
    LogicalExpression: 13,
    ConditionalExpression: 4,
    AssignmentExpression: 3,
    YieldExpression: 2,
    RestElement: 1
  };
  function formatSequence(state, nodes) {
    const { generator } = state;
    state.write("(");
    if (nodes != null && nodes.length > 0) {
      generator[nodes[0].type](nodes[0], state);
      const { length } = nodes;
      for (let i3 = 1; i3 < length; i3++) {
        const param = nodes[i3];
        state.write(", ");
        generator[param.type](param, state);
      }
    }
    state.write(")");
  }
  function expressionNeedsParenthesis(state, node, parentNode, isRightHand) {
    const nodePrecedence = state.expressionsPrecedence[node.type];
    if (nodePrecedence === NEEDS_PARENTHESES) {
      return true;
    }
    const parentNodePrecedence = state.expressionsPrecedence[parentNode.type];
    if (nodePrecedence !== parentNodePrecedence) {
      return !isRightHand && nodePrecedence === 15 && parentNodePrecedence === 14 && parentNode.operator === "**" || nodePrecedence < parentNodePrecedence;
    }
    if (nodePrecedence !== 13 && nodePrecedence !== 14) {
      return false;
    }
    if (node.operator === "**" && parentNode.operator === "**") {
      return !isRightHand;
    }
    if (nodePrecedence === 13 && parentNodePrecedence === 13 && (node.operator === "??" || parentNode.operator === "??")) {
      return true;
    }
    if (isRightHand) {
      return OPERATOR_PRECEDENCE[node.operator] <= OPERATOR_PRECEDENCE[parentNode.operator];
    }
    return OPERATOR_PRECEDENCE[node.operator] < OPERATOR_PRECEDENCE[parentNode.operator];
  }
  function formatExpression(state, node, parentNode, isRightHand) {
    const { generator } = state;
    if (expressionNeedsParenthesis(state, node, parentNode, isRightHand)) {
      state.write("(");
      generator[node.type](node, state);
      state.write(")");
    } else {
      generator[node.type](node, state);
    }
  }
  function reindent(state, text2, indent, lineEnd) {
    const lines = text2.split("\n");
    const end = lines.length - 1;
    state.write(lines[0].trim());
    if (end > 0) {
      state.write(lineEnd);
      for (let i3 = 1; i3 < end; i3++) {
        state.write(indent + lines[i3].trim() + lineEnd);
      }
      state.write(indent + lines[end].trim());
    }
  }
  function formatComments(state, comments, indent, lineEnd) {
    const { length } = comments;
    for (let i3 = 0; i3 < length; i3++) {
      const comment = comments[i3];
      state.write(indent);
      if (comment.type[0] === "L") {
        state.write("// " + comment.value.trim() + "\n", comment);
      } else {
        state.write("/*");
        reindent(state, comment.value, indent, lineEnd);
        state.write("*/" + lineEnd);
      }
    }
  }
  function hasCallExpression(node) {
    let currentNode = node;
    while (currentNode != null) {
      const { type } = currentNode;
      if (type[0] === "C" && type[1] === "a") {
        return true;
      } else if (type[0] === "M" && type[1] === "e" && type[2] === "m") {
        currentNode = currentNode.object;
      } else {
        return false;
      }
    }
  }
  function formatVariableDeclaration(state, node) {
    const { generator } = state;
    const { declarations } = node;
    state.write(node.kind + " ");
    const { length } = declarations;
    if (length > 0) {
      generator.VariableDeclarator(declarations[0], state);
      for (let i3 = 1; i3 < length; i3++) {
        state.write(", ");
        generator.VariableDeclarator(declarations[i3], state);
      }
    }
  }
  var ForInStatement;
  var FunctionDeclaration;
  var RestElement;
  var BinaryExpression;
  var ArrayExpression;
  var BlockStatement;
  var GENERATOR = {
    /*
    Default generator.
    */
    Program(node, state) {
      const indent = state.indent.repeat(state.indentLevel);
      const { lineEnd, writeComments } = state;
      if (writeComments && node.comments != null) {
        formatComments(state, node.comments, indent, lineEnd);
      }
      const statements = node.body;
      const { length } = statements;
      for (let i3 = 0; i3 < length; i3++) {
        const statement = statements[i3];
        if (writeComments && statement.comments != null) {
          formatComments(state, statement.comments, indent, lineEnd);
        }
        state.write(indent);
        this[statement.type](statement, state);
        state.write(lineEnd);
      }
      if (writeComments && node.trailingComments != null) {
        formatComments(state, node.trailingComments, indent, lineEnd);
      }
    },
    BlockStatement: BlockStatement = function(node, state) {
      const indent = state.indent.repeat(state.indentLevel++);
      const { lineEnd, writeComments } = state;
      const statementIndent = indent + state.indent;
      state.write("{");
      const statements = node.body;
      if (statements != null && statements.length > 0) {
        state.write(lineEnd);
        if (writeComments && node.comments != null) {
          formatComments(state, node.comments, statementIndent, lineEnd);
        }
        const { length } = statements;
        for (let i3 = 0; i3 < length; i3++) {
          const statement = statements[i3];
          if (writeComments && statement.comments != null) {
            formatComments(state, statement.comments, statementIndent, lineEnd);
          }
          state.write(statementIndent);
          this[statement.type](statement, state);
          state.write(lineEnd);
        }
        state.write(indent);
      } else {
        if (writeComments && node.comments != null) {
          state.write(lineEnd);
          formatComments(state, node.comments, statementIndent, lineEnd);
          state.write(indent);
        }
      }
      if (writeComments && node.trailingComments != null) {
        formatComments(state, node.trailingComments, statementIndent, lineEnd);
      }
      state.write("}");
      state.indentLevel--;
    },
    ClassBody: BlockStatement,
    StaticBlock(node, state) {
      state.write("static ");
      this.BlockStatement(node, state);
    },
    EmptyStatement(node, state) {
      state.write(";");
    },
    ExpressionStatement(node, state) {
      const precedence = state.expressionsPrecedence[node.expression.type];
      if (precedence === NEEDS_PARENTHESES || precedence === 3 && node.expression.left.type[0] === "O") {
        state.write("(");
        this[node.expression.type](node.expression, state);
        state.write(")");
      } else {
        this[node.expression.type](node.expression, state);
      }
      state.write(";");
    },
    IfStatement(node, state) {
      state.write("if (");
      this[node.test.type](node.test, state);
      state.write(") ");
      this[node.consequent.type](node.consequent, state);
      if (node.alternate != null) {
        state.write(" else ");
        this[node.alternate.type](node.alternate, state);
      }
    },
    LabeledStatement(node, state) {
      this[node.label.type](node.label, state);
      state.write(": ");
      this[node.body.type](node.body, state);
    },
    BreakStatement(node, state) {
      state.write("break");
      if (node.label != null) {
        state.write(" ");
        this[node.label.type](node.label, state);
      }
      state.write(";");
    },
    ContinueStatement(node, state) {
      state.write("continue");
      if (node.label != null) {
        state.write(" ");
        this[node.label.type](node.label, state);
      }
      state.write(";");
    },
    WithStatement(node, state) {
      state.write("with (");
      this[node.object.type](node.object, state);
      state.write(") ");
      this[node.body.type](node.body, state);
    },
    SwitchStatement(node, state) {
      const indent = state.indent.repeat(state.indentLevel++);
      const { lineEnd, writeComments } = state;
      state.indentLevel++;
      const caseIndent = indent + state.indent;
      const statementIndent = caseIndent + state.indent;
      state.write("switch (");
      this[node.discriminant.type](node.discriminant, state);
      state.write(") {" + lineEnd);
      const { cases: occurences } = node;
      const { length: occurencesCount } = occurences;
      for (let i3 = 0; i3 < occurencesCount; i3++) {
        const occurence = occurences[i3];
        if (writeComments && occurence.comments != null) {
          formatComments(state, occurence.comments, caseIndent, lineEnd);
        }
        if (occurence.test) {
          state.write(caseIndent + "case ");
          this[occurence.test.type](occurence.test, state);
          state.write(":" + lineEnd);
        } else {
          state.write(caseIndent + "default:" + lineEnd);
        }
        const { consequent } = occurence;
        const { length: consequentCount } = consequent;
        for (let i4 = 0; i4 < consequentCount; i4++) {
          const statement = consequent[i4];
          if (writeComments && statement.comments != null) {
            formatComments(state, statement.comments, statementIndent, lineEnd);
          }
          state.write(statementIndent);
          this[statement.type](statement, state);
          state.write(lineEnd);
        }
      }
      state.indentLevel -= 2;
      state.write(indent + "}");
    },
    ReturnStatement(node, state) {
      state.write("return");
      if (node.argument) {
        state.write(" ");
        this[node.argument.type](node.argument, state);
      }
      state.write(";");
    },
    ThrowStatement(node, state) {
      state.write("throw ");
      this[node.argument.type](node.argument, state);
      state.write(";");
    },
    TryStatement(node, state) {
      state.write("try ");
      this[node.block.type](node.block, state);
      if (node.handler) {
        const { handler } = node;
        if (handler.param == null) {
          state.write(" catch ");
        } else {
          state.write(" catch (");
          this[handler.param.type](handler.param, state);
          state.write(") ");
        }
        this[handler.body.type](handler.body, state);
      }
      if (node.finalizer) {
        state.write(" finally ");
        this[node.finalizer.type](node.finalizer, state);
      }
    },
    WhileStatement(node, state) {
      state.write("while (");
      this[node.test.type](node.test, state);
      state.write(") ");
      this[node.body.type](node.body, state);
    },
    DoWhileStatement(node, state) {
      state.write("do ");
      this[node.body.type](node.body, state);
      state.write(" while (");
      this[node.test.type](node.test, state);
      state.write(");");
    },
    ForStatement(node, state) {
      state.write("for (");
      if (node.init != null) {
        const { init } = node;
        if (init.type[0] === "V") {
          formatVariableDeclaration(state, init);
        } else {
          this[init.type](init, state);
        }
      }
      state.write("; ");
      if (node.test) {
        this[node.test.type](node.test, state);
      }
      state.write("; ");
      if (node.update) {
        this[node.update.type](node.update, state);
      }
      state.write(") ");
      this[node.body.type](node.body, state);
    },
    ForInStatement: ForInStatement = function(node, state) {
      state.write(`for ${node.await ? "await " : ""}(`);
      const { left } = node;
      if (left.type[0] === "V") {
        formatVariableDeclaration(state, left);
      } else {
        this[left.type](left, state);
      }
      state.write(node.type[3] === "I" ? " in " : " of ");
      this[node.right.type](node.right, state);
      state.write(") ");
      this[node.body.type](node.body, state);
    },
    ForOfStatement: ForInStatement,
    DebuggerStatement(node, state) {
      state.write("debugger;", node);
    },
    FunctionDeclaration: FunctionDeclaration = function(node, state) {
      state.write(
        (node.async ? "async " : "") + (node.generator ? "function* " : "function ") + (node.id ? node.id.name : ""),
        node
      );
      formatSequence(state, node.params);
      state.write(" ");
      this[node.body.type](node.body, state);
    },
    FunctionExpression: FunctionDeclaration,
    VariableDeclaration(node, state) {
      formatVariableDeclaration(state, node);
      state.write(";");
    },
    VariableDeclarator(node, state) {
      this[node.id.type](node.id, state);
      if (node.init != null) {
        state.write(" = ");
        this[node.init.type](node.init, state);
      }
    },
    ClassDeclaration(node, state) {
      state.write("class " + (node.id ? `${node.id.name} ` : ""), node);
      if (node.superClass) {
        state.write("extends ");
        const { superClass } = node;
        const { type } = superClass;
        const precedence = state.expressionsPrecedence[type];
        if ((type[0] !== "C" || type[1] !== "l" || type[5] !== "E") && (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.ClassExpression)) {
          state.write("(");
          this[node.superClass.type](superClass, state);
          state.write(")");
        } else {
          this[superClass.type](superClass, state);
        }
        state.write(" ");
      }
      this.ClassBody(node.body, state);
    },
    ImportDeclaration(node, state) {
      state.write("import ");
      const { specifiers, attributes: attributes2 } = node;
      const { length } = specifiers;
      let i3 = 0;
      if (length > 0) {
        for (; i3 < length; ) {
          if (i3 > 0) {
            state.write(", ");
          }
          const specifier = specifiers[i3];
          const type = specifier.type[6];
          if (type === "D") {
            state.write(specifier.local.name, specifier);
            i3++;
          } else if (type === "N") {
            state.write("* as " + specifier.local.name, specifier);
            i3++;
          } else {
            break;
          }
        }
        if (i3 < length) {
          state.write("{");
          for (; ; ) {
            const specifier = specifiers[i3];
            const { name } = specifier.imported;
            state.write(name, specifier);
            if (name !== specifier.local.name) {
              state.write(" as " + specifier.local.name);
            }
            if (++i3 < length) {
              state.write(", ");
            } else {
              break;
            }
          }
          state.write("}");
        }
        state.write(" from ");
      }
      this.Literal(node.source, state);
      if (attributes2 && attributes2.length > 0) {
        state.write(" with { ");
        for (let i4 = 0; i4 < attributes2.length; i4++) {
          this.ImportAttribute(attributes2[i4], state);
          if (i4 < attributes2.length - 1) state.write(", ");
        }
        state.write(" }");
      }
      state.write(";");
    },
    ImportAttribute(node, state) {
      this.Identifier(node.key, state);
      state.write(": ");
      this.Literal(node.value, state);
    },
    ImportExpression(node, state) {
      state.write("import(");
      this[node.source.type](node.source, state);
      state.write(")");
    },
    ExportDefaultDeclaration(node, state) {
      state.write("export default ");
      this[node.declaration.type](node.declaration, state);
      if (state.expressionsPrecedence[node.declaration.type] != null && node.declaration.type[0] !== "F") {
        state.write(";");
      }
    },
    ExportNamedDeclaration(node, state) {
      state.write("export ");
      if (node.declaration) {
        this[node.declaration.type](node.declaration, state);
      } else {
        state.write("{");
        const { specifiers } = node, { length } = specifiers;
        if (length > 0) {
          for (let i3 = 0; ; ) {
            const specifier = specifiers[i3];
            const { name } = specifier.local;
            state.write(name, specifier);
            if (name !== specifier.exported.name) {
              state.write(" as " + specifier.exported.name);
            }
            if (++i3 < length) {
              state.write(", ");
            } else {
              break;
            }
          }
        }
        state.write("}");
        if (node.source) {
          state.write(" from ");
          this.Literal(node.source, state);
        }
        if (node.attributes && node.attributes.length > 0) {
          state.write(" with { ");
          for (let i3 = 0; i3 < node.attributes.length; i3++) {
            this.ImportAttribute(node.attributes[i3], state);
            if (i3 < node.attributes.length - 1) state.write(", ");
          }
          state.write(" }");
        }
        state.write(";");
      }
    },
    ExportAllDeclaration(node, state) {
      if (node.exported != null) {
        state.write("export * as " + node.exported.name + " from ");
      } else {
        state.write("export * from ");
      }
      this.Literal(node.source, state);
      if (node.attributes && node.attributes.length > 0) {
        state.write(" with { ");
        for (let i3 = 0; i3 < node.attributes.length; i3++) {
          this.ImportAttribute(node.attributes[i3], state);
          if (i3 < node.attributes.length - 1) state.write(", ");
        }
        state.write(" }");
      }
      state.write(";");
    },
    MethodDefinition(node, state) {
      if (node.static) {
        state.write("static ");
      }
      const kind = node.kind[0];
      if (kind === "g" || kind === "s") {
        state.write(node.kind + " ");
      }
      if (node.value.async) {
        state.write("async ");
      }
      if (node.value.generator) {
        state.write("*");
      }
      if (node.computed) {
        state.write("[");
        this[node.key.type](node.key, state);
        state.write("]");
      } else {
        this[node.key.type](node.key, state);
      }
      formatSequence(state, node.value.params);
      state.write(" ");
      this[node.value.body.type](node.value.body, state);
    },
    ClassExpression(node, state) {
      this.ClassDeclaration(node, state);
    },
    ArrowFunctionExpression(node, state) {
      state.write(node.async ? "async " : "", node);
      const { params } = node;
      if (params != null) {
        if (params.length === 1 && params[0].type[0] === "I") {
          state.write(params[0].name, params[0]);
        } else {
          formatSequence(state, node.params);
        }
      }
      state.write(" => ");
      if (node.body.type[0] === "O") {
        state.write("(");
        this.ObjectExpression(node.body, state);
        state.write(")");
      } else {
        this[node.body.type](node.body, state);
      }
    },
    ThisExpression(node, state) {
      state.write("this", node);
    },
    Super(node, state) {
      state.write("super", node);
    },
    RestElement: RestElement = function(node, state) {
      state.write("...");
      this[node.argument.type](node.argument, state);
    },
    SpreadElement: RestElement,
    YieldExpression(node, state) {
      state.write(node.delegate ? "yield*" : "yield");
      if (node.argument) {
        state.write(" ");
        this[node.argument.type](node.argument, state);
      }
    },
    AwaitExpression(node, state) {
      state.write("await ", node);
      formatExpression(state, node.argument, node);
    },
    TemplateLiteral(node, state) {
      const { quasis, expressions } = node;
      state.write("`");
      const { length } = expressions;
      for (let i3 = 0; i3 < length; i3++) {
        const expression = expressions[i3];
        const quasi2 = quasis[i3];
        state.write(quasi2.value.raw, quasi2);
        state.write("${");
        this[expression.type](expression, state);
        state.write("}");
      }
      const quasi = quasis[quasis.length - 1];
      state.write(quasi.value.raw, quasi);
      state.write("`");
    },
    TemplateElement(node, state) {
      state.write(node.value.raw, node);
    },
    TaggedTemplateExpression(node, state) {
      formatExpression(state, node.tag, node);
      this[node.quasi.type](node.quasi, state);
    },
    ArrayExpression: ArrayExpression = function(node, state) {
      state.write("[");
      if (node.elements.length > 0) {
        const { elements } = node, { length } = elements;
        for (let i3 = 0; ; ) {
          const element = elements[i3];
          if (element != null) {
            this[element.type](element, state);
          }
          if (++i3 < length) {
            state.write(", ");
          } else {
            if (element == null) {
              state.write(", ");
            }
            break;
          }
        }
      }
      state.write("]");
    },
    ArrayPattern: ArrayExpression,
    ObjectExpression(node, state) {
      const indent = state.indent.repeat(state.indentLevel++);
      const { lineEnd, writeComments } = state;
      const propertyIndent = indent + state.indent;
      state.write("{");
      if (node.properties.length > 0) {
        state.write(lineEnd);
        if (writeComments && node.comments != null) {
          formatComments(state, node.comments, propertyIndent, lineEnd);
        }
        const comma = "," + lineEnd;
        const { properties } = node, { length } = properties;
        for (let i3 = 0; ; ) {
          const property2 = properties[i3];
          if (writeComments && property2.comments != null) {
            formatComments(state, property2.comments, propertyIndent, lineEnd);
          }
          state.write(propertyIndent);
          this[property2.type](property2, state);
          if (++i3 < length) {
            state.write(comma);
          } else {
            break;
          }
        }
        state.write(lineEnd);
        if (writeComments && node.trailingComments != null) {
          formatComments(state, node.trailingComments, propertyIndent, lineEnd);
        }
        state.write(indent + "}");
      } else if (writeComments) {
        if (node.comments != null) {
          state.write(lineEnd);
          formatComments(state, node.comments, propertyIndent, lineEnd);
          if (node.trailingComments != null) {
            formatComments(state, node.trailingComments, propertyIndent, lineEnd);
          }
          state.write(indent + "}");
        } else if (node.trailingComments != null) {
          state.write(lineEnd);
          formatComments(state, node.trailingComments, propertyIndent, lineEnd);
          state.write(indent + "}");
        } else {
          state.write("}");
        }
      } else {
        state.write("}");
      }
      state.indentLevel--;
    },
    Property(node, state) {
      if (node.method || node.kind[0] !== "i") {
        this.MethodDefinition(node, state);
      } else {
        if (!node.shorthand) {
          if (node.computed) {
            state.write("[");
            this[node.key.type](node.key, state);
            state.write("]");
          } else {
            this[node.key.type](node.key, state);
          }
          state.write(": ");
        }
        this[node.value.type](node.value, state);
      }
    },
    PropertyDefinition(node, state) {
      if (node.static) {
        state.write("static ");
      }
      if (node.computed) {
        state.write("[");
      }
      this[node.key.type](node.key, state);
      if (node.computed) {
        state.write("]");
      }
      if (node.value == null) {
        if (node.key.type[0] !== "F") {
          state.write(";");
        }
        return;
      }
      state.write(" = ");
      this[node.value.type](node.value, state);
      state.write(";");
    },
    ObjectPattern(node, state) {
      state.write("{");
      if (node.properties.length > 0) {
        const { properties } = node, { length } = properties;
        for (let i3 = 0; ; ) {
          this[properties[i3].type](properties[i3], state);
          if (++i3 < length) {
            state.write(", ");
          } else {
            break;
          }
        }
      }
      state.write("}");
    },
    SequenceExpression(node, state) {
      formatSequence(state, node.expressions);
    },
    UnaryExpression(node, state) {
      if (node.prefix) {
        const {
          operator,
          argument,
          argument: { type }
        } = node;
        state.write(operator);
        const needsParentheses = expressionNeedsParenthesis(state, argument, node);
        if (!needsParentheses && (operator.length > 1 || type[0] === "U" && (type[1] === "n" || type[1] === "p") && argument.prefix && argument.operator[0] === operator && (operator === "+" || operator === "-"))) {
          state.write(" ");
        }
        if (needsParentheses) {
          state.write(operator.length > 1 ? " (" : "(");
          this[type](argument, state);
          state.write(")");
        } else {
          this[type](argument, state);
        }
      } else {
        this[node.argument.type](node.argument, state);
        state.write(node.operator);
      }
    },
    UpdateExpression(node, state) {
      if (node.prefix) {
        state.write(node.operator);
        this[node.argument.type](node.argument, state);
      } else {
        this[node.argument.type](node.argument, state);
        state.write(node.operator);
      }
    },
    AssignmentExpression(node, state) {
      this[node.left.type](node.left, state);
      state.write(" " + node.operator + " ");
      this[node.right.type](node.right, state);
    },
    AssignmentPattern(node, state) {
      this[node.left.type](node.left, state);
      state.write(" = ");
      this[node.right.type](node.right, state);
    },
    BinaryExpression: BinaryExpression = function(node, state) {
      const isIn = node.operator === "in";
      if (isIn) {
        state.write("(");
      }
      formatExpression(state, node.left, node, false);
      state.write(" " + node.operator + " ");
      formatExpression(state, node.right, node, true);
      if (isIn) {
        state.write(")");
      }
    },
    LogicalExpression: BinaryExpression,
    ConditionalExpression(node, state) {
      const { test } = node;
      const precedence = state.expressionsPrecedence[test.type];
      if (precedence === NEEDS_PARENTHESES || precedence <= state.expressionsPrecedence.ConditionalExpression) {
        state.write("(");
        this[test.type](test, state);
        state.write(")");
      } else {
        this[test.type](test, state);
      }
      state.write(" ? ");
      this[node.consequent.type](node.consequent, state);
      state.write(" : ");
      this[node.alternate.type](node.alternate, state);
    },
    NewExpression(node, state) {
      state.write("new ");
      const precedence = state.expressionsPrecedence[node.callee.type];
      if (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.CallExpression || hasCallExpression(node.callee)) {
        state.write("(");
        this[node.callee.type](node.callee, state);
        state.write(")");
      } else {
        this[node.callee.type](node.callee, state);
      }
      formatSequence(state, node["arguments"]);
    },
    CallExpression(node, state) {
      const precedence = state.expressionsPrecedence[node.callee.type];
      if (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.CallExpression) {
        state.write("(");
        this[node.callee.type](node.callee, state);
        state.write(")");
      } else {
        this[node.callee.type](node.callee, state);
      }
      if (node.optional) {
        state.write("?.");
      }
      formatSequence(state, node["arguments"]);
    },
    ChainExpression(node, state) {
      this[node.expression.type](node.expression, state);
    },
    MemberExpression(node, state) {
      const precedence = state.expressionsPrecedence[node.object.type];
      if (precedence === NEEDS_PARENTHESES || precedence < state.expressionsPrecedence.MemberExpression) {
        state.write("(");
        this[node.object.type](node.object, state);
        state.write(")");
      } else {
        this[node.object.type](node.object, state);
      }
      if (node.computed) {
        if (node.optional) {
          state.write("?.");
        }
        state.write("[");
        this[node.property.type](node.property, state);
        state.write("]");
      } else {
        if (node.optional) {
          state.write("?.");
        } else {
          state.write(".");
        }
        this[node.property.type](node.property, state);
      }
    },
    MetaProperty(node, state) {
      state.write(node.meta.name + "." + node.property.name, node);
    },
    Identifier(node, state) {
      state.write(node.name, node);
    },
    PrivateIdentifier(node, state) {
      state.write(`#${node.name}`, node);
    },
    Literal(node, state) {
      if (node.raw != null) {
        state.write(node.raw, node);
      } else if (node.regex != null) {
        this.RegExpLiteral(node, state);
      } else if (node.bigint != null) {
        state.write(node.bigint + "n", node);
      } else {
        state.write(stringify(node.value), node);
      }
    },
    RegExpLiteral(node, state) {
      const { regex } = node;
      state.write(`/${regex.pattern}/${regex.flags}`, node);
    }
  };
  var EMPTY_OBJECT = {};
  var State2 = class {
    constructor(options) {
      const setup = options == null ? EMPTY_OBJECT : options;
      this.output = "";
      if (setup.output != null) {
        this.output = setup.output;
        this.write = this.writeToStream;
      } else {
        this.output = "";
      }
      this.generator = setup.generator != null ? setup.generator : GENERATOR;
      this.expressionsPrecedence = setup.expressionsPrecedence != null ? setup.expressionsPrecedence : EXPRESSIONS_PRECEDENCE;
      this.indent = setup.indent != null ? setup.indent : "  ";
      this.lineEnd = setup.lineEnd != null ? setup.lineEnd : "\n";
      this.indentLevel = setup.startingIndentLevel != null ? setup.startingIndentLevel : 0;
      this.writeComments = setup.comments ? setup.comments : false;
      if (setup.sourceMap != null) {
        this.write = setup.output == null ? this.writeAndMap : this.writeToStreamAndMap;
        this.sourceMap = setup.sourceMap;
        this.line = 1;
        this.column = 0;
        this.lineEndSize = this.lineEnd.split("\n").length - 1;
        this.mapping = {
          original: null,
          // Uses the entire state to avoid generating ephemeral objects
          generated: this,
          name: void 0,
          source: setup.sourceMap.file || setup.sourceMap._file
        };
      }
    }
    write(code) {
      this.output += code;
    }
    writeToStream(code) {
      this.output.write(code);
    }
    writeAndMap(code, node) {
      this.output += code;
      this.map(code, node);
    }
    writeToStreamAndMap(code, node) {
      this.output.write(code);
      this.map(code, node);
    }
    map(code, node) {
      if (node != null) {
        const { type } = node;
        if (type[0] === "L" && type[2] === "n") {
          this.column = 0;
          this.line++;
          return;
        }
        if (node.loc != null) {
          const { mapping } = this;
          mapping.original = node.loc.start;
          mapping.name = node.name;
          this.sourceMap.addMapping(mapping);
        }
        if (type[0] === "T" && type[8] === "E" || type[0] === "L" && type[1] === "i" && typeof node.value === "string") {
          const { length: length2 } = code;
          let { column, line } = this;
          for (let i3 = 0; i3 < length2; i3++) {
            if (code[i3] === "\n") {
              column = 0;
              line++;
            } else {
              column++;
            }
          }
          this.column = column;
          this.line = line;
          return;
        }
      }
      const { length } = code;
      const { lineEnd } = this;
      if (length > 0) {
        if (this.lineEndSize > 0 && (lineEnd.length === 1 ? code[length - 1] === lineEnd : code.endsWith(lineEnd))) {
          this.line += this.lineEndSize;
          this.column = 0;
        } else {
          this.column += length;
        }
      }
    }
    toString() {
      return this.output;
    }
  };
  function generate(node, options) {
    const state = new State2(options);
    state.generator[node.type](node, state);
    return state.output;
  }

  // src/rewrite/js.js
  var import_events3 = __toESM(require_events(), 1);
  var JS = class extends import_events3.default {
    constructor() {
      super();
      this.parseOptions = {
        ranges: true,
        module: true,
        globalReturn: true
      };
      this.generationOptions = {
        format: {
          quotes: "double",
          escapeless: true,
          compact: true
        }
      };
      this.parse = $n;
      this.generate = generate;
    }
    rewrite(str, data = {}) {
      return this.recast(str, data, "rewrite");
    }
    source(str, data = {}) {
      return this.recast(str, data, "source");
    }
    recast(str, data = {}, type = "") {
      try {
        const output = [];
        const ast = this.parse(str, this.parseOptions);
        const meta = {
          data,
          changes: [],
          input: str,
          ast,
          get slice() {
            return slice;
          }
        };
        let slice = 0;
        this.iterate(ast, (node, parent = null) => {
          if (parent && parent.inTransformer) node.isTransformer = true;
          node.parent = parent;
          this.emit(node.type, node, meta, type);
        });
        meta.changes.sort((a3, b3) => a3.start - b3.start || a3.end - b3.end);
        for (const change of meta.changes) {
          if ("start" in change && typeof change.start === "number")
            output.push(str.slice(slice, change.start));
          if (change.node)
            output.push(
              typeof change.node === "string" ? change.node : generate(change.node, this.generationOptions)
            );
          if ("end" in change && typeof change.end === "number")
            slice = change.end;
        }
        output.push(str.slice(slice));
        return output.join("");
      } catch (e2) {
        return str;
      }
    }
    iterate(ast, handler) {
      if (typeof ast != "object" || !handler) return;
      walk(ast, null, handler);
      function walk(node, parent, handler2) {
        if (typeof node != "object" || !handler2) return;
        handler2(node, parent, handler2);
        for (const child in node) {
          if (child === "parent") continue;
          if (Array.isArray(node[child])) {
            node[child].forEach((entry) => {
              if (entry) walk(entry, node, handler2);
            });
          } else {
            if (node[child]) walk(node[child], node, handler2);
          }
        }
        if (typeof node.iterateEnd === "function") node.iterateEnd();
      }
    }
  };
  var js_default = JS;

  // src/rewrite/index.js
  var import_set_cookie_parser2 = __toESM(require_set_cookie(), 1);

  // src/rewrite/codecs.js
  var plain = {
    encode(str) {
      if (!str) return str;
      return encodeURIComponent(str);
    },
    decode(str) {
      if (!str) return str;
      return decodeURIComponent(str);
    }
  };
  var xor = {
    encode(str) {
      if (!str) return str;
      let result = "";
      let len = str.length;
      for (let i3 = 0; i3 < len; i3++) {
        const char = str[i3];
        result += i3 % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char;
      }
      return encodeURIComponent(result);
    },
    decode(str) {
      if (!str) return str;
      str = decodeURIComponent(str);
      let result = "";
      let len = str.length;
      for (let i3 = 0; i3 < len; i3++) {
        const char = str[i3];
        result += i3 % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char;
      }
      return result;
    }
  };
  var base64 = {
    encode(str) {
      if (!str) return str;
      str = str.toString();
      return btoa(encodeURIComponent(str));
    },
    decode(str) {
      if (!str) return str;
      str = str.toString();
      return decodeURIComponent(atob(str));
    }
  };

  // src/rewrite/cookie.js
  var import_set_cookie_parser = __toESM(require_set_cookie(), 1);
  function validateCookie(cookie, meta, js = false) {
    if (cookie.httpOnly && !!js) return false;
    if (cookie.domain.startsWith(".")) {
      if (!meta.url.hostname.endsWith(cookie.domain.slice(1))) return false;
      return true;
    }
    if (cookie.domain !== meta.url.hostname) return false;
    if (cookie.secure && meta.url.protocol === "http:") return false;
    if (!meta.url.pathname.startsWith(cookie.path)) return false;
    return true;
  }
  async function db(openDB2) {
    const db2 = await openDB2("__op", 1, {
      upgrade(db3) {
        const store = db3.createObjectStore("cookies", {
          keyPath: "id"
        });
        store.createIndex("path", "path");
      }
    });
    db2.transaction(["cookies"], "readwrite").store.index("path");
    return db2;
  }
  function serialize2(cookies = [], meta, js) {
    let str = "";
    for (const cookie of cookies) {
      if (!validateCookie(cookie, meta, js)) continue;
      if (str.length) str += "; ";
      str += cookie.name;
      str += "=";
      str += cookie.value;
    }
    return str;
  }
  async function getCookies(db2) {
    const now = /* @__PURE__ */ new Date();
    return (await db2.getAll("cookies")).filter((cookie) => {
      let expired = false;
      if (cookie.set) {
        if (cookie.maxAge) {
          expired = cookie.set.getTime() + cookie.maxAge * 1e3 < now;
        } else if (cookie.expires) {
          expired = new Date(cookie.expires.toLocaleString()) < now;
        }
      }
      if (expired) {
        db2.delete("cookies", cookie.id);
        return false;
      }
      return true;
    });
  }
  function setCookies(data, db2, meta) {
    if (!db2) return false;
    const cookies = (0, import_set_cookie_parser.default)(data, {
      decodeValues: false
    });
    for (const cookie of cookies) {
      if (!cookie.domain) cookie.domain = "." + meta.url.hostname;
      if (!cookie.path) cookie.path = "/";
      if (!cookie.domain.startsWith(".")) {
        cookie.domain = "." + cookie.domain;
      }
      db2.put("cookies", {
        ...cookie,
        id: `${cookie.domain}@${cookie.path}@${cookie.name}`,
        set: new Date(Date.now())
      });
    }
    return true;
  }

  // src/rewrite/rewrite.html.js
  function attributes(ctx, meta = ctx.meta) {
    const { html, js, attributePrefix } = ctx;
    const origPrefix = attributePrefix + "-attr-";
    html.on("attr", (attr, type) => {
      if (attr.node.tagName === "base" && attr.name === "href" && attr.options.document) {
        meta.base = new URL(attr.value, meta.url);
      }
      if (type === "rewrite" && isUrl(attr.name, attr.tagName)) {
        attr.node.setAttribute(origPrefix + attr.name, attr.value);
        attr.value = ctx.rewriteUrl(attr.value, meta);
      }
      if (type === "rewrite" && isSrcset(attr.name)) {
        attr.node.setAttribute(origPrefix + attr.name, attr.value);
        attr.value = html.wrapSrcset(attr.value, meta);
      }
      if (type === "rewrite" && isHtml(attr.name)) {
        attr.node.setAttribute(origPrefix + attr.name, attr.value);
        attr.value = html.rewrite(attr.value, {
          ...meta,
          document: true,
          injectHead: attr.options.injectHead || []
        });
      }
      if (type === "rewrite" && isStyle(attr.name)) {
        attr.node.setAttribute(origPrefix + attr.name, attr.value);
        attr.value = ctx.rewriteCSS(attr.value, {
          context: "declarationList"
        });
      }
      if (type === "rewrite" && isForbidden(attr.name)) {
        attr.name = origPrefix + attr.name;
      }
      if (type === "rewrite" && isEvent(attr.name)) {
        attr.node.setAttribute(origPrefix + attr.name, attr.value);
        attr.value = js.rewrite(attr.value, meta);
      }
      if (type === "source" && attr.name.startsWith(origPrefix)) {
        if (attr.node.hasAttribute(attr.name.slice(origPrefix.length)))
          attr.node.removeAttribute(attr.name.slice(origPrefix.length));
        attr.name = attr.name.slice(origPrefix.length);
      }
    });
  }
  function text(ctx) {
    const { html, js, css } = ctx;
    html.on("text", (text2, type) => {
      if (text2.element.tagName === "script") {
        text2.value = type === "rewrite" ? js.rewrite(text2.value) : js.source(text2.value);
      }
      if (text2.element.tagName === "style") {
        text2.value = type === "rewrite" ? css.rewrite(text2.value) : css.source(text2.value);
      }
    });
    return true;
  }
  function isUrl(name, tag) {
    return tag === "object" && name === "data" || [
      "src",
      "href",
      "ping",
      "movie",
      "action",
      "poster",
      "profile",
      "background"
    ].indexOf(name) > -1;
  }
  function isEvent(name) {
    return [
      "onafterprint",
      "onbeforeprint",
      "onbeforeunload",
      "onerror",
      "onhashchange",
      "onload",
      "onmessage",
      "onoffline",
      "ononline",
      "onpagehide",
      "onpopstate",
      "onstorage",
      "onunload",
      "onblur",
      "onchange",
      "oncontextmenu",
      "onfocus",
      "oninput",
      "oninvalid",
      "onreset",
      "onsearch",
      "onselect",
      "onsubmit",
      "onkeydown",
      "onkeypress",
      "onkeyup",
      "onclick",
      "ondblclick",
      "onmousedown",
      "onmousemove",
      "onmouseout",
      "onmouseover",
      "onmouseup",
      "onmousewheel",
      "onwheel",
      "ondrag",
      "ondragend",
      "ondragenter",
      "ondragleave",
      "ondragover",
      "ondragstart",
      "ondrop",
      "onscroll",
      "oncopy",
      "oncut",
      "onpaste",
      "onabort",
      "oncanplay",
      "oncanplaythrough",
      "oncuechange",
      "ondurationchange",
      "onemptied",
      "onended",
      "onerror",
      "onloadeddata",
      "onloadedmetadata",
      "onloadstart",
      "onpause",
      "onplay",
      "onplaying",
      "onprogress",
      "onratechange",
      "onseeked",
      "onseeking",
      "onstalled",
      "onsuspend",
      "ontimeupdate",
      "onvolumechange",
      "onwaiting"
    ].indexOf(name) > -1;
  }
  function injectHead(ctx) {
    const { html } = ctx;
    html.on("element", (element, type) => {
      if (type !== "rewrite") return false;
      if (element.tagName !== "head") return false;
      if (!("injectHead" in element.options)) return false;
      element.childNodes.unshift(...element.options.injectHead);
    });
  }
  function createJsInject(cookies = "", referrer = "") {
    return `self.__uv$cookies = ${JSON.stringify(cookies)};self.__uv$referrer = ${JSON.stringify(referrer)};`;
  }
  function createHtmlInject(handlerScript, bundleScript, clientScript, configScript, cookies, referrer) {
    return [
      {
        tagName: "script",
        nodeName: "script",
        childNodes: [
          {
            nodeName: "#text",
            value: createJsInject(cookies, referrer)
          }
        ],
        attrs: [
          {
            name: "__uv-script",
            value: "1",
            skip: true
          }
        ],
        skip: true
      },
      {
        tagName: "script",
        nodeName: "script",
        childNodes: [],
        attrs: [
          { name: "src", value: bundleScript, skip: true },
          {
            name: "__uv-script",
            value: "1",
            skip: true
          }
        ]
      },
      {
        tagName: "script",
        nodeName: "script",
        childNodes: [],
        attrs: [
          { name: "src", value: clientScript, skip: true },
          {
            name: "__uv-script",
            value: "1",
            skip: true
          }
        ]
      },
      {
        tagName: "script",
        nodeName: "script",
        childNodes: [],
        attrs: [
          { name: "src", value: configScript, skip: true },
          {
            name: "__uv-script",
            value: "1",
            skip: true
          }
        ]
      },
      {
        tagName: "script",
        nodeName: "script",
        childNodes: [],
        attrs: [
          { name: "src", value: handlerScript, skip: true },
          {
            name: "__uv-script",
            value: "1",
            skip: true
          }
        ]
      }
    ];
  }
  function isForbidden(name) {
    return ["http-equiv", "integrity", "sandbox", "nonce", "crossorigin"].indexOf(
      name
    ) > -1;
  }
  function isHtml(name) {
    return name === "srcdoc";
  }
  function isStyle(name) {
    return name === "style";
  }
  function isSrcset(name) {
    return name === "srcSet" || name === "srcset" || name === "imagesrcset";
  }

  // src/rewrite/rewrite.script.js
  function property(ctx) {
    const { js } = ctx;
    js.on("MemberExpression", (node, data, type) => {
      if (node.object.type === "Super") return false;
      if (type === "rewrite" && computedProperty(node)) {
        data.changes.push({
          node: "__uv.$wrap((",
          start: node.property.start,
          end: node.property.start
        });
        node.iterateEnd = function() {
          data.changes.push({
            node: "))",
            start: node.property.end,
            end: node.property.end
          });
        };
      }
      if (!node.computed && node.property.name === "location" && type === "rewrite" || node.property.name === "__uv$location" && type === "source") {
        data.changes.push({
          start: node.property.start,
          end: node.property.end,
          node: type === "rewrite" ? "__uv$setSource(__uv).__uv$location" : "location"
        });
      }
      if (!node.computed && node.property.name === "top" && type === "rewrite" || node.property.name === "__uv$top" && type === "source") {
        data.changes.push({
          start: node.property.start,
          end: node.property.end,
          node: type === "rewrite" ? "__uv$setSource(__uv).__uv$top" : "top"
        });
      }
      if (!node.computed && node.property.name === "parent" && type === "rewrite" || node.property.name === "__uv$parent" && type === "source") {
        data.changes.push({
          start: node.property.start,
          end: node.property.end,
          node: type === "rewrite" ? "__uv$setSource(__uv).__uv$parent" : "parent"
        });
      }
      if (!node.computed && node.property.name === "postMessage" && type === "rewrite") {
        data.changes.push({
          start: node.property.start,
          end: node.property.end,
          node: "__uv$setSource(__uv).postMessage"
        });
      }
      if (!node.computed && node.property.name === "eval" && type === "rewrite" || node.property.name === "__uv$eval" && type === "source") {
        data.changes.push({
          start: node.property.start,
          end: node.property.end,
          node: type === "rewrite" ? "__uv$setSource(__uv).__uv$eval" : "eval"
        });
      }
      if (!node.computed && node.property.name === "__uv$setSource" && type === "source" && node.parent.type === "CallExpression") {
        const { parent, property: property2 } = node;
        data.changes.push({
          start: property2.start - 1,
          end: parent.end
        });
        node.iterateEnd = function() {
          data.changes.push({
            start: property2.start,
            end: parent.end
          });
        };
      }
    });
  }
  function identifier(ctx) {
    const { js } = ctx;
    js.on("Identifier", (node, data, type) => {
      if (type !== "rewrite") return false;
      const { parent } = node;
      if (!["location", "eval", "parent", "top"].includes(node.name))
        return false;
      if (parent.type === "VariableDeclarator" && parent.id === node)
        return false;
      if ((parent.type === "AssignmentExpression" || parent.type === "AssignmentPattern") && parent.left === node)
        return false;
      if ((parent.type === "FunctionExpression" || parent.type === "FunctionDeclaration") && parent.id === node)
        return false;
      if (parent.type === "MemberExpression" && parent.property === node && !parent.computed)
        return false;
      if (node.name === "eval" && parent.type === "CallExpression" && parent.callee === node)
        return false;
      if (parent.type === "Property" && parent.key === node) return false;
      if (parent.type === "Property" && parent.value === node && parent.shorthand)
        return false;
      if (parent.type === "UpdateExpression" && (parent.operator === "++" || parent.operator === "--"))
        return false;
      if ((parent.type === "FunctionExpression" || parent.type === "FunctionDeclaration" || parent.type === "ArrowFunctionExpression") && parent.params.indexOf(node) !== -1)
        return false;
      if (parent.type === "MethodDefinition") return false;
      if (parent.type === "ClassDeclaration") return false;
      if (parent.type === "RestElement") return false;
      if (parent.type === "ExportSpecifier") return false;
      if (parent.type === "ImportSpecifier") return false;
      data.changes.push({
        start: node.start,
        end: node.end,
        node: "__uv.$get(" + node.name + ")"
      });
    });
  }
  function wrapEval(ctx) {
    const { js } = ctx;
    js.on("CallExpression", (node, data, type) => {
      if (type !== "rewrite") return false;
      if (!node.arguments.length) return false;
      if (node.callee.type !== "Identifier") return false;
      if (node.callee.name !== "eval") return false;
      const [script] = node.arguments;
      data.changes.push({
        node: "__uv.js.rewrite(",
        start: script.start,
        end: script.start
      });
      node.iterateEnd = function() {
        data.changes.push({
          node: ")",
          start: script.end,
          end: script.end
        });
      };
    });
  }
  function importDeclaration(ctx) {
    const { js } = ctx;
    js.on("Literal", (node, data, type) => {
      if (!((node.parent.type === "ImportDeclaration" || node.parent.type === "ExportAllDeclaration" || node.parent.type === "ExportNamedDeclaration") && node.parent.source === node))
        return false;
      data.changes.push({
        start: node.start + 1,
        end: node.end - 1,
        node: type === "rewrite" ? ctx.rewriteUrl(node.value) : ctx.sourceUrl(node.value)
      });
    });
  }
  function dynamicImport(ctx) {
    const { js } = ctx;
    js.on("ImportExpression", (node, data, type) => {
      if (type !== "rewrite") return false;
      data.changes.push({
        // pass script URL to dynamicImport
        // import() is always relative to script URL
        node: `__uv.rewriteImport(${JSON.stringify(ctx.meta.url)},`,
        start: node.source.start,
        end: node.source.start
      });
      node.iterateEnd = function() {
        data.changes.push({
          node: ")",
          start: node.source.end,
          end: node.source.end
        });
      };
    });
  }
  function importMeta(ctx) {
    const { js } = ctx;
    js.on("MemberExpression", (node, data, type) => {
      if (node.object.type == "MetaProperty" && node.property.type === "Identifier" && node.property.name === "url") {
        if (type === "rewrite") {
          data.changes.push({
            start: node.start,
            end: node.end,
            node: `__uv.sourceUrl(import.meta.url)`
          });
        } else if (type === "source") {
          data.changes.push({
            start: node.start,
            end: node.end,
            node: `import.meta.url`
          });
        }
      }
    });
  }
  function unwrap(ctx) {
    const { js } = ctx;
    js.on("CallExpression", (node, data, type) => {
      if (type !== "source") return false;
      if (!isWrapped(node.callee)) return false;
      switch (node.callee.property.name) {
        case "$wrap":
          {
            if (!node.arguments || node.parent.type !== "MemberExpression" || node.parent.property !== node)
              return false;
            const [property2] = node.arguments;
            data.changes.push({
              start: node.callee.start,
              end: property2.start
            });
            node.iterateEnd = function() {
              data.changes.push({
                start: node.end - 2,
                end: node.end
              });
            };
          }
          break;
        case "$get":
        case "rewriteUrl":
          {
            const [arg] = node.arguments;
            data.changes.push({
              start: node.callee.start,
              end: arg.start
            });
            node.iterateEnd = function() {
              data.changes.push({
                start: node.end - 1,
                end: node.end
              });
            };
          }
          break;
        case "rewrite":
          {
            const [script] = node.arguments;
            data.changes.push({
              start: node.callee.start,
              end: script.start
            });
            node.iterateEnd = function() {
              data.changes.push({
                start: node.end - 1,
                end: node.end
              });
            };
          }
          break;
      }
    });
  }
  function isWrapped(node) {
    if (node.type !== "MemberExpression") return false;
    if (node.property.name === "rewrite" && isWrapped(node.object)) return true;
    if (node.object.type !== "Identifier" || node.object.name !== "__uv")
      return false;
    if (!["js", "$get", "$wrap", "rewriteUrl"].includes(node.property.name))
      return false;
    return true;
  }
  function computedProperty(parent) {
    if (!parent.computed) return false;
    const { property: node } = parent;
    if (node.type === "Literal" && !["location", "top", "parent"]) return false;
    return true;
  }

  // node_modules/idb/build/index.js
  var instanceOfAny = (object, constructors) => constructors.some((c3) => object instanceof c3);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  var transactionDoneMap = /* @__PURE__ */ new WeakMap();
  var transformCache = /* @__PURE__ */ new WeakMap();
  var reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error);
    });
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx.removeEventListener("complete", complete);
        tx.removeEventListener("error", error);
        tx.removeEventListener("abort", error);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error = () => {
        reject(tx.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx.addEventListener("complete", complete);
      tx.addEventListener("error", error);
      tx.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx, done);
  }
  var idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap2(this), args);
        return wrap(this.request);
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap2(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap2 = (value) => reverseTransformCache.get(value);
  function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
      });
    }
    if (blocked) {
      request.addEventListener("blocked", (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion,
        event.newVersion,
        event
      ));
    }
    openPromise.then((db2) => {
      if (terminated)
        db2.addEventListener("close", () => terminated());
      if (blocking) {
        db2.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
      }
    }).catch(() => {
    });
    return openPromise;
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
      // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
      !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
    ) {
      return;
    }
    const method = async function(storeName, ...args) {
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx.done
      ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));
  var advanceMethodProps = ["continue", "continuePrimaryKey", "advance"];
  var methodMap = {};
  var advanceResults = /* @__PURE__ */ new WeakMap();
  var ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
  var cursorIteratorTraps = {
    get(target, prop) {
      if (!advanceMethodProps.includes(prop))
        return target[prop];
      let cachedFunc = methodMap[prop];
      if (!cachedFunc) {
        cachedFunc = methodMap[prop] = function(...args) {
          advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
        };
      }
      return cachedFunc;
    }
  };
  async function* iterate(...args) {
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
      cursor = await cursor.openCursor(...args);
    }
    if (!cursor)
      return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    reverseTransformCache.set(proxiedCursor, unwrap2(cursor));
    while (cursor) {
      yield proxiedCursor;
      cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
      advanceResults.delete(proxiedCursor);
    }
  }
  function isIteratorProp(target, prop) {
    return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === "iterate" && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get(target, prop, receiver) {
      if (isIteratorProp(target, prop))
        return iterate;
      return oldTraps.get(target, prop, receiver);
    },
    has(target, prop) {
      return isIteratorProp(target, prop) || oldTraps.has(target, prop);
    }
  }));

  // node_modules/@mercuryworkshop/bare-mux/dist/index.mjs
  var t2 = globalThis.fetch;
  var r2 = globalThis.SharedWorker;
  var a2 = globalThis.localStorage;
  var s2 = globalThis.navigator.serviceWorker;
  var o2 = MessagePort.prototype.postMessage;
  var n2 = { prototype: { send: WebSocket.prototype.send }, CLOSED: WebSocket.CLOSED, CLOSING: WebSocket.CLOSING, CONNECTING: WebSocket.CONNECTING, OPEN: WebSocket.OPEN };
  async function c2() {
    const e2 = (await self.clients.matchAll({ type: "window", includeUncontrolled: true })).map(async (e3) => {
      const t4 = await function(e4) {
        let t5 = new MessageChannel();
        return new Promise((r3) => {
          e4.postMessage({ type: "getPort", port: t5.port2 }, [t5.port2]), t5.port1.onmessage = (e5) => {
            r3(e5.data);
          };
        });
      }(e3);
      return await i2(t4), t4;
    }), t3 = Promise.race([Promise.any(e2), new Promise((e3, t4) => setTimeout(t4, 1e3, new TypeError("timeout")))]);
    try {
      return await t3;
    } catch (e3) {
      if (e3 instanceof AggregateError) throw console.error("bare-mux: failed to get a bare-mux SharedWorker MessagePort as all clients returned an invalid MessagePort."), new Error("All clients returned an invalid MessagePort.");
      return console.warn("bare-mux: failed to get a bare-mux SharedWorker MessagePort within 1s, retrying"), await c2();
    }
  }
  function i2(e2) {
    const t3 = new MessageChannel(), r3 = new Promise((e3, r4) => {
      t3.port1.onmessage = (t4) => {
        "pong" === t4.data.type && e3();
      }, setTimeout(r4, 1500);
    });
    return o2.call(e2, { message: { type: "ping" }, port: t3.port2 }, [t3.port2]), r3;
  }
  function l2(e2, t3) {
    const a3 = new r2(e2, "bare-mux-worker");
    return t3 && s2.addEventListener("message", (t4) => {
      if ("getPort" === t4.data.type && t4.data.port) {
        console.debug("bare-mux: recieved request for port from sw");
        const a4 = new r2(e2, "bare-mux-worker");
        o2.call(t4.data.port, a4.port, [a4.port]);
      }
    }), a3.port;
  }
  var p2 = class {
    constructor(e2) {
      this.channel = new BroadcastChannel("bare-mux"), e2 instanceof MessagePort || e2 instanceof Promise ? this.port = e2 : this.createChannel(e2, true);
    }
    createChannel(e2, t3) {
      if (self.clients) this.port = c2(), this.channel.onmessage = (e3) => {
        "refreshPort" === e3.data.type && (this.port = c2());
      };
      else if (e2 && SharedWorker) {
        if (!e2.startsWith("/") && !e2.includes("://")) throw new Error("Invalid URL. Must be absolute or start at the root.");
        this.port = l2(e2, t3), console.debug("bare-mux: setting localStorage bare-mux-path to", e2), a2["bare-mux-path"] = e2;
      } else {
        if (!SharedWorker) throw new Error("Unable to get a channel to the SharedWorker.");
        {
          const e3 = a2["bare-mux-path"];
          if (console.debug("bare-mux: got localStorage bare-mux-path:", e3), !e3) throw new Error("Unable to get bare-mux workerPath from localStorage.");
          this.port = l2(e3, t3);
        }
      }
    }
    async sendMessage(e2, t3) {
      this.port instanceof Promise && (this.port = await this.port);
      try {
        await i2(this.port);
      } catch {
        return console.warn("bare-mux: Failed to get a ping response from the worker within 1.5s. Assuming port is dead."), this.createChannel(), await this.sendMessage(e2, t3);
      }
      const r3 = new MessageChannel(), a3 = [r3.port2, ...t3 || []], s3 = new Promise((e3, t4) => {
        r3.port1.onmessage = (r4) => {
          const a4 = r4.data;
          "error" === a4.type ? t4(a4.error) : e3(a4);
        };
      });
      return o2.call(this.port, { message: e2, port: r3.port2 }, a3), await s3;
    }
  };
  var w2 = class extends EventTarget {
    constructor(e2, t3 = [], r3, a3) {
      super(), this.protocols = t3, this.readyState = n2.CONNECTING, this.url = e2.toString(), this.protocols = t3;
      const s3 = (e3) => {
        this.protocols = e3, this.readyState = n2.OPEN;
        const t4 = new Event("open");
        this.dispatchEvent(t4);
      }, o3 = async (e3) => {
        const t4 = new MessageEvent("message", { data: e3 });
        this.dispatchEvent(t4);
      }, c3 = (e3, t4) => {
        this.readyState = n2.CLOSED;
        const r4 = new CloseEvent("close", { code: e3, reason: t4 });
        this.dispatchEvent(r4);
      }, i3 = () => {
        this.readyState = n2.CLOSED;
        const e3 = new Event("error");
        this.dispatchEvent(e3);
      };
      this.channel = new MessageChannel(), this.channel.port1.onmessage = (e3) => {
        "open" === e3.data.type ? s3(e3.data.args[0]) : "message" === e3.data.type ? o3(e3.data.args[0]) : "close" === e3.data.type ? c3(e3.data.args[0], e3.data.args[1]) : "error" === e3.data.type && i3();
      }, r3.sendMessage({ type: "websocket", websocket: { url: e2.toString(), protocols: t3, requestHeaders: a3, channel: this.channel.port2 } }, [this.channel.port2]);
    }
    send(...e2) {
      if (this.readyState === n2.CONNECTING) throw new DOMException("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.");
      let t3 = e2[0];
      t3.buffer && (t3 = t3.buffer.slice(t3.byteOffset, t3.byteOffset + t3.byteLength)), o2.call(this.channel.port1, { type: "data", data: t3 }, t3 instanceof ArrayBuffer ? [t3] : []);
    }
    close(e2, t3) {
      o2.call(this.channel.port1, { type: "close", closeCode: e2, closeReason: t3 });
    }
  };
  function g2(e2) {
    for (let t3 = 0; t3 < e2.length; t3++) {
      const r3 = e2[t3];
      if (!"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~".includes(r3)) return false;
    }
    return true;
  }
  var f2 = ["ws:", "wss:"];
  var y2 = [101, 204, 205, 304];
  var b2 = [301, 302, 303, 307, 308];
  var k2 = class {
    constructor(e2) {
      this.worker = new p2(e2);
    }
    createWebSocket(e2, t3 = [], r3, a3) {
      try {
        e2 = new URL(e2);
      } catch (t4) {
        throw new DOMException(`Faiiled to construct 'WebSocket': The URL '${e2}' is invalid.`);
      }
      if (!f2.includes(e2.protocol)) throw new DOMException(`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${e2.protocol}' is not allowed.`);
      Array.isArray(t3) || (t3 = [t3]), t3 = t3.map(String);
      for (const e3 of t3) if (!g2(e3)) throw new DOMException(`Failed to construct 'WebSocket': The subprotocol '${e3}' is invalid.`);
      a3 = a3 || {};
      return new w2(e2, t3, this.worker, a3);
    }
    async fetch(e2, r3) {
      const a3 = new Request(e2, r3), s3 = r3?.headers || a3.headers, o3 = s3 instanceof Headers ? Object.fromEntries(s3) : s3, n3 = a3.body;
      let c3 = new URL(a3.url);
      if (c3.protocol.startsWith("blob:")) {
        const e3 = await t2(c3), r4 = new Response(e3.body, e3);
        return r4.rawHeaders = Object.fromEntries(e3.headers), r4;
      }
      for (let e3 = 0; ; e3++) {
        let t3 = (await this.worker.sendMessage({ type: "fetch", fetch: { remote: c3.toString(), method: a3.method, headers: o3, body: n3 || void 0 } }, n3 ? [n3] : [])).fetch, s4 = new Response(y2.includes(t3.status) ? void 0 : t3.body, { headers: new Headers(t3.headers), status: t3.status, statusText: t3.statusText });
        s4.rawHeaders = t3.headers, s4.rawResponse = t3, s4.finalURL = c3.toString();
        const i3 = r3?.redirect || a3.redirect;
        if (!b2.includes(s4.status)) return s4;
        switch (i3) {
          case "follow": {
            const t4 = s4.headers.get("location");
            if (20 > e3 && null !== t4) {
              c3 = new URL(t4, c3);
              continue;
            }
            throw new TypeError("Failed to fetch");
          }
          case "error":
            throw new TypeError("Failed to fetch");
          case "manual":
            return s4;
        }
      }
    }
  };
  console.debug("bare-mux: running v2.1.7 (build c56d286)");

  // src/rewrite/index.js
  var import_events4 = __toESM(require_events(), 1);
  var Ultraviolet = class _Ultraviolet {
    /**
     *
     * @param {UVConfig} [options]
     */
    constructor(options = {}) {
      this.prefix = options.prefix || "/service/";
      this.urlRegex = /^(#|about:|data:|mailto:)/;
      this.rewriteUrl = options.rewriteUrl || this.rewriteUrl;
      this.rewriteImport = options.rewriteImport || this.rewriteImport;
      this.sourceUrl = options.sourceUrl || this.sourceUrl;
      this.encodeUrl = options.encodeUrl || this.encodeUrl;
      this.decodeUrl = options.decodeUrl || this.decodeUrl;
      this.vanilla = "vanilla" in options ? options.vanilla : false;
      this.meta = options.meta || {};
      this.meta.base ||= void 0;
      this.meta.origin ||= "";
      this.bundleScript = options.bundle || "/uv.bundle.js";
      this.handlerScript = options.handler || "/uv.handler.js";
      this.clientScript = options.client || options.bundle && options.bundle.includes("uv.bundle.js") && options.bundle.replace("uv.bundle.js", "uv.client.js") || "/uv.client.js";
      this.configScript = options.config || "/uv.config.js";
      this.meta.url ||= this.meta.base || "";
      this.codec = _Ultraviolet.codec;
      this.html = new html_default(this);
      this.css = new css_default(this);
      this.js = new js_default(this);
      this.openDB = this.constructor.openDB;
      this.master = "__uv";
      this.dataPrefix = "__uv$";
      this.attributePrefix = "__uv";
      this.createHtmlInject = createHtmlInject;
      this.createJsInject = createJsInject;
      this.attrs = {
        isUrl,
        isForbidden,
        isHtml,
        isSrcset,
        isStyle
      };
      if (!this.vanilla) this.implementUVMiddleware();
      this.cookie = {
        validateCookie,
        db: () => {
          return db(this.constructor.openDB);
        },
        getCookies,
        setCookies,
        serialize: serialize2,
        setCookie: import_set_cookie_parser2.default
      };
    }
    /**
     *
     * @param {string} str Script being imported
     * @param {string} src Script that is importing
     * @param {*} meta
     */
    rewriteImport(str, src, meta = this.meta) {
      return this.rewriteUrl(str, {
        ...meta,
        base: src
      });
    }
    rewriteUrl(str, meta = this.meta) {
      str = new String(str).trim();
      if (!str || this.urlRegex.test(str)) return str;
      if (str.startsWith("javascript:")) {
        return "javascript:" + this.js.rewrite(str.slice("javascript:".length));
      }
      try {
        return meta.origin + this.prefix + this.encodeUrl(new URL(str, meta.base).href);
      } catch (e2) {
        return meta.origin + this.prefix + this.encodeUrl(str);
      }
    }
    sourceUrl(str, meta = this.meta) {
      if (!str || this.urlRegex.test(str)) return str;
      try {
        return new URL(
          this.decodeUrl(str.slice(this.prefix.length + meta.origin.length)),
          meta.base
        ).href;
      } catch (e2) {
        return this.decodeUrl(str.slice(this.prefix.length + meta.origin.length));
      }
    }
    encodeUrl(str) {
      return encodeURIComponent(str);
    }
    decodeUrl(str) {
      return decodeURIComponent(str);
    }
    implementUVMiddleware() {
      attributes(this);
      text(this);
      injectHead(this);
      importDeclaration(this);
      dynamicImport(this);
      importMeta(this);
      property(this);
      wrapEval(this);
      identifier(this);
      unwrap(this);
    }
    get rewriteHtml() {
      return this.html.rewrite.bind(this.html);
    }
    get sourceHtml() {
      return this.html.source.bind(this.html);
    }
    get rewriteCSS() {
      return this.css.rewrite.bind(this.css);
    }
    get sourceCSS() {
      return this.css.source.bind(this.css);
    }
    get rewriteJS() {
      return this.js.rewrite.bind(this.js);
    }
    get sourceJS() {
      return this.js.source.bind(this.js);
    }
    static codec = { xor, base64, plain };
    static setCookie = import_set_cookie_parser2.default;
    static openDB = openDB;
    static BareClient = k2;
    static EventEmitter = import_events4.default;
  };
  var rewrite_default = Ultraviolet;
  if (typeof self === "object") self.Ultraviolet = Ultraviolet;
})();
//# sourceMappingURL=uv.bundle.js.map
