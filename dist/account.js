"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wreck = _interopRequireDefault(require("@hapi/wreck"));

var _oauth_token = require("./oauth_token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Account =
/*#__PURE__*/
function () {
  function Account(options) {
    _classCallCheck(this, Account);

    if (options instanceof _oauth_token.OAuthToken) {
      this.tokenProvider = options;
    } else {
      this.tokenProvider = new _oauth_token.OAuthToken(options);
    }

    this.serviceBaseUrl = this.tokenProvider.baseUrl;
  }

  _createClass(Account, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        var reqUrl, token, _ref, payload;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                reqUrl = new URL("".concat(this.serviceBaseUrl, "/api/accounts/").concat(id));
                _context.next = 3;
                return this.token;

              case 3:
                token = _context.sent;
                _context.next = 6;
                return _wreck["default"].get(reqUrl.href, {
                  json: true,
                  headers: {
                    'Authorization': "Bearer ".concat(token.access_token)
                  }
                });

              case 6:
                _ref = _context.sent;
                payload = _ref.payload;
                return _context.abrupt("return", payload);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(identityId, body) {
        var reqUrl, token, _ref2, payload;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                reqUrl = new URL("".concat(this.serviceBaseUrl, "/api/identities/").concat(identityId, "/accounts"));
                _context2.next = 3;
                return this.accessToken();

              case 3:
                token = _context2.sent;
                _context2.next = 6;
                return _wreck["default"].post(reqUrl.href, {
                  json: true,
                  headers: {
                    'Authorization': "Bearer ".concat(token.access_token)
                  },
                  payload: body
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

      function add(_x2, _x3) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "token",
    get: function get() {
      return this.tokenProvider.token();
    }
  }]);

  return Account;
}();

var _default = Account;
exports["default"] = _default;