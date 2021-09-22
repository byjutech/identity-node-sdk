import request from '@hapi/wreck'
import Account from './account'
import PremiumAccount from './premium_account'
import {OAuthToken} from './oauth_token';

class Identity {
  constructor(options) {
    this.tokenProvider = new OAuthToken(options)
    this.serviceBaseUrl = this.tokenProvider.baseUrl

    this.accounts = new Account(this.tokenProvider)
    this.premiumAccounts = new PremiumAccount(this.tokenProvider)
  }

  get token() {
    return this.tokenProvider.token()
  }

  async find(query) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`)
    reqUrl.searchParams.append("phone", query)

    const token = await this.token
    const {payload} = await request.get(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
    })

    return payload
  }

  async get(id) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${id}`)

    const token = await this.token
    const {payload} = await request.get(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
    })

    return payload
  }

  async create(body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`)
    
    const token = await this.token
    const {payload} = await request.post(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload
  }

  async update(id, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${id}`)

    const token = await this.token
    const {payload} = await request.put(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
      payload: body
    })

    return payload
  }
}

export default Identity