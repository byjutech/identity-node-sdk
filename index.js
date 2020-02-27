import oauth2 from 'simple-oauth2'
import request from '@hapi/wreck'

class Identity {
  constructor(options) {
    this.serviceBaseUrl = options.serviceBaseUrl || 'https://identity.tllms.com'
    this.oauth2 = oauth2.create(options.oauth2);
    this.tokenConfig = { scope: options.scope };
    this.token = null
  }

  get credentials() {
    return this.credentials
  }

  async find(query) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`)
    reqUrl.searchParams.append("phone", query)

    const token = await this.accessToken()
    const {payload} = await request.get(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}`}
    })

    return payload
  }

  async create(body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities`)
    
    const token = await this.accessToken()
    const {payload} = await request.post(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}`},
      payload: body
    })

    return payload
  }

  async addAccount(identityId, body) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/identities/${identityId}/accounts`)
    
    const token = await this.accessToken()
    const {payload} = await request.post(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}`},
      payload: body
    })

    return payload
  }

  async accessToken() {
    if (this.token == null) {
      const result = await this.oauth2.clientCredentials.getToken(this.tokenConfig)

      this.token = this.oauth2.accessToken.create(result)
    } else if (this.token != null && this.token.expired()) {
      this.token = await this.token.refresh(this.tokenConfig)
    }
    
    return this.token.token
  }
}

module.exports = {
  identity:  function (credentials) {
    return new Identity(credentials)
  }
}