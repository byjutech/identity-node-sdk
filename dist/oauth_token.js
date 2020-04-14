"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.OAuthToken = void 0;

var _simpleOauth = _interopRequireDefault(require("simple-oauth2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OAuthToken =
/*#__PURE__*/
function () {
  function OAuthToken(options) {
    _classCallCheck(this, OAuthToken);

    this.serviceBaseUrl = options.serviceBaseUrl || 'https://identity.tllms.com';
    this.oauth2 = _simpleOauth["default"].create(options.oauth2);
    this.tokenConfig = {
      scope: options.scope
    };
  }

  _createClass(OAuthToken, [{
    key: "token",
    value: function () {
      var _token = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._token == null)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return this.oauth2.clientCredentials.getToken(this.tokenConfig);

              case 3:
                result = _context.sent;
                this._token = this.oauth2.accessToken.create(result);
                _context.next = 11;
                break;

              case 7:
                if (!(this._token != null && this.token.expired())) {
                  _context.next = 11;
                  break;
                }

                _context.next = 10;
                return this._token.refresh(this.tokenConfig);

              case 10:
                this._token = _context.sent;

              case 11:
                return _context.abrupt("return", this._token.token);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function token() {
        return _token.apply(this, arguments);
      }

      return token;
    }()
  }, {
    key: "baseUrl",
    get: function get() {
      return this.serviceBaseUrl;
    }
  }]);

  return OAuthToken;
}();

exports.OAuthToken = OAuthToken;

function _default(options) {
  new OAuthToken(options);
}