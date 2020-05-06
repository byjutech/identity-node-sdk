"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wreck = _interopRequireDefault(require("@hapi/wreck"));

var _oauth_token = require("./oauth_token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Account {
  constructor(options) {
    if (options instanceof _oauth_token.OAuthToken) {
      this.tokenProvider = options;
    } else {
      this.tokenProvider = new _oauth_token.OAuthToken(options);
    }

    this.serviceBaseUrl = this.tokenProvider.baseUrl;
  }

  get token() {
    return this.tokenProvider.token();
  }

  async get(id) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/accounts/${id}`);
    const token = await this.token;
    const {
      payload
    } = await _wreck.default.get(reqUrl.href, {
      json: true,
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      }
    });
    return payload;
  }

  async add(identityId, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${identityId}/accounts`);
    const token = await this.token;
    const {
      payload
    } = await _wreck.default.post(reqUrl.href, {
      json: true,
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      },
      payload: body
    });
    return payload;
  }

}

var _default = Account;
exports.default = _default;