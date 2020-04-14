"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.OAuthToken = void 0;

var _simpleOauth = _interopRequireDefault(require("simple-oauth2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OAuthToken {
  constructor(options) {
    this.serviceBaseUrl = options.serviceBaseUrl || 'https://identity.tllms.com';
    this.oauth2 = _simpleOauth.default.create(options.oauth2);
    this.tokenConfig = {
      scope: options.scope
    };
  }

  get baseUrl() {
    return this.serviceBaseUrl;
  }

  async token() {
    if (this._token == null) {
      const result = await this.oauth2.clientCredentials.getToken(this.tokenConfig);
      this._token = this.oauth2.accessToken.create(result);
    } else if (this._token != null && this.token.expired()) {
      this._token = await this._token.refresh(this.tokenConfig);
    }

    return this._token.token;
  }

}

exports.OAuthToken = OAuthToken;

function _default(options) {
  new OAuthToken(options);
}