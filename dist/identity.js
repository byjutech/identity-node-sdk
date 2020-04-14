"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wreck = _interopRequireDefault(require("@hapi/wreck"));

var _account = _interopRequireDefault(require("./account"));

var _oauth_token = require("./oauth_token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Identity =
/*#__PURE__*/
function () {
  function Identity(options) {
    _classCallCheck(this, Identity);

    this.tokenProvider = new _oauth_token.OAuthToken(options);
    this.serviceBaseUrl = this.tokenProvider.baseUrl;
    this.accounts = new _account["default"](this.tokenProvider);
  }

  _createClass(Identity, [{
    key: "find",
    value: function () {
      var _find = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(query) {
        var reqUrl, token, _ref, payload;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                reqUrl = new URL("".concat(this.serviceBaseUrl, "/api/identities"));
                reqUrl.searchParams.append("phone", query);
                _context.next = 4;
                return this.token;

              case 4:
                token = _context.sent;
                _context.next = 7;
                return _wreck["default"].get(reqUrl.href, {
                  json: true,
                  headers: {
                    'Authorization': "Bearer ".concat(token.access_token)
                  }
                });

              case 7:
                _ref = _context.sent;
                payload = _ref.payload;
                return _context.abrupt("return", payload);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var reqUrl, token, _ref2, payload;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                reqUrl = new URL("".concat(this.serviceBaseUrl, "/api/identities/").concat(id));
                _context2.next = 3;
                return this.token;

              case 3:
                token = _context2.sent;
                _context2.next = 6;
                return _wreck["default"].get(reqUrl.href, {
                  json: true,
                  headers: {
                    'Authorization': "Bearer ".concat(token.access_token)
                  }
                });

              case 6:
                _ref2 = _context2.sent;
                payload = _ref2.payload;
                return _context2.abrupt("return", payload);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(body) {
        var reqUrl, token, _ref3, payload;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                reqUrl = new URL("".concat(this.serviceBaseUrl, "/api/identities"));
                _context3.next = 3;
                return this.token;

              case 3:
                token = _context3.sent;
                _context3.next = 6;
                return _wreck["default"].post(reqUrl.href, {
                  json: true,
                  headers: {
                    'Authorization': "Bearer ".concat(token.access_token)
                  },
                  payload: body
                });

              case 6:
                _ref3 = _context3.sent;
                payload = _ref3.payload;
                return _context3.abrupt("return", payload);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function create(_x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id, body) {
        var reqUrl, token, _ref4, payload;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                reqUrl = new URL("".concat(this.serviceBaseUrl, "/api/identities/").concat(id));
                _context4.next = 3;
                return this.token;

              case 3:
                token = _context4.sent;
                _context4.next = 6;
                return _wreck["default"].put(reqUrl.href, {
                  json: true,
                  headers: {
                    'Authorization': "Bearer ".concat(token.access_token)
                  },
                  payload: body
                });

              case 6:
                _ref4 = _context4.sent;
                payload = _ref4.payload;
                return _context4.abrupt("return", payload);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x4, _x5) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "token",
    get: function get() {
      return this.tokenProvider.token();
    }
  }]);

  return Identity;
}();

var _default = Identity;
exports["default"] = _default;