"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wreck = _interopRequireDefault(require("@hapi/wreck"));

var _account = _interopRequireDefault(require("./account"));

var _oauth_token = require("./oauth_token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Identity {
  constructor(options) {
    this.tokenProvider = new _oauth_token.OAuthToken(options);
    this.serviceBaseUrl = this.tokenProvider.baseUrl;
    this.accounts = new _account.default(this.tokenProvider);
  }

  get token() {
    return this.tokenProvider.token();
  }

  async find(query) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`);
    reqUrl.searchParams.append("phone", query);
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

  async get(id) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${id}`);
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

  async create(body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`);
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

  async update(id, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${id}`);
    const token = await this.token;
    const {
      payload
    } = await _wreck.default.put(reqUrl.href, {
      json: true,
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      },
      payload: body
    });
    return payload;
  }

}

var _default = Identity;
exports.default = _default;