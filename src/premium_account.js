import request from '@hapi/wreck'
import { OAuthToken } from './oauth_token'

class PremiumAccount {
  constructor(options) {
    if (options instanceof OAuthToken) {
      this.tokenProvider = options
    } else {
      this.tokenProvider = new OAuthToken(options)
    }

    this.serviceBaseUrl = this.tokenProvider.baseUrl
  }

  get token() {
    return this.tokenProvider.token()
  }

  async get(id) {
    const reqUrl = new URL(`${this.serviceBaseUrl}/api/premiumaccounts/${id}`)

    const token = await this.token
    const { payload } = await request.get(reqUrl.href, {
      json: true,
      headers: { 'Authorization': `Bearer ${token.access_token}` },
    })

    return payload
  }

}

export default PremiumAccount