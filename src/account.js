import request from '@hapi/wreck'
import { OAuthToken } from './oauth_token'

class Account {
    constructor(options) {
        if (options instanceof OAuthToken) {
            this.tokenProvider = options;
        } else {
            this.tokenProvider = new OAuthToken(options);
        }

        this.serviceBaseUrl = this.tokenProvider.baseUrl;
    }

    get token() {
        return this.tokenProvider.token();
    }

    async get(id) {
        const reqUrl = new URL(`${this.serviceBaseUrl}/api/accounts/${id}?identity_info=true`);

        const token = await this.token;
        const { payload } = await request.get(reqUrl.href, {
            json: true,
            headers: { Authorization: `Bearer ${token.access_token}` },
        });

        return payload;
    }

    async add(identityId, body) {
        const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${identityId}/accounts`);

        const token = await this.token;
        const { payload } = await request.post(reqUrl.href, {
            json: true,
            headers: { Authorization: `Bearer ${token.access_token}` },
            payload: body,
        });

        return payload;
    }

    async patch(id, body) {
        const reqUrl = new URL(`${this.serviceBaseUrl}/api/accounts/${id}`);

        const token = await this.token;
        const { payload } = await request.patch(reqUrl.href, {
            json: true,
            headers: { Authorization: `Bearer ${token.access_token}` },
            payload: body,
        });

        return payload;
    }

    async attach(id, body) {
        const reqUrl = new URL(`${this.serviceBaseUrl}/api/accounts/${id}/profiles`);

        const token = await this.token;
        const { payload } = await request.post(reqUrl.href, {
            json: true,
            headers: { Authorization: `Bearer ${token.access_token}` },
            payload: body,
        });

        return payload;
    }
}

export default Account