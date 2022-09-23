import request from '@hapi/wreck'
import Account from './account'
import PremiumAccount from './premium_account'
import { OAuthToken } from './oauth_token';
import Auth from './auth'

class Identity {
  constructor(options) {
    this.tokenProvider = new OAuthToken(options)
    this.serviceBaseUrl = this.tokenProvider.baseUrl

    this.accounts = new Account(this.tokenProvider)
    this.premiumAccounts = new PremiumAccount(this.tokenProvider)
    this.auth = new Auth(this.tokenProvider)
  }

  get token() {
    return this.tokenProvider.token()
  }

  async find(query, orgFormattedName) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`)
    if (orgFormattedName && orgFormattedName.toLowerCase() === "tangible_play") {
      reqUrl.searchParams.append("email", query)
    } else {
      reqUrl.searchParams.append("phone", query)
    }

    const token = await this.token
    const { payload } = await request.get(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
    })

    return payload
  }

  async get(id) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${id}`)

    const token = await this.token
    const { payload } = await request.get(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
    })

    return payload
  }

  async create(body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`)

    const token = await this.token
    const { payload } = await request.post(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload
  }

  async update(id, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${id}`)

    const token = await this.token
    const { payload } = await request.put(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload
  }

  async patch(id, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${id}`)

    const token = await this.token
    const { payload } = await request.patch(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload
  }

  async patchPtoF(body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/resource`);
    const token = await this.token;
    const { payload } = await request.patch(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload;
  }

  async initiateLink(identity_id, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${identity_id}/link/initiate`);
    const token = await this.token;
    const { payload } = await request.post(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload;
  }

  async verifyLink(identity_id, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${identity_id}/link/verify`);
    const token = await this.token;
    const { payload } = await request.post(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload;
  }
}

export default Identity