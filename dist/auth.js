"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.default = void 0;

var _wreck = _interopRequireDefault(require("@hapi/wreck"));

var _oauth_token = require("./oauth_token");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

class Auth {
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

    async sendOtp(phone) {
        const reqUrl = new URL(`${this.serviceBaseUrl}/api/request_otp?phone=${phone}`);
        const token = await this.token;
        const { payload } = await _wreck.default.get(reqUrl.href, {
            json: true,
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });
        return payload;
    }
}

var _default = Auth;
exports.default = _default;
