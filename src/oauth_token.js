
import oauth2 from 'simple-oauth2'

export class OAuthToken {
  constructor(options) {
    this.serviceBaseUrl = options.serviceBaseUrl || 'https://identity.tllms.com'
    this.oauth2 = oauth2.create(options.oauth2)
    this.tokenConfig = { scope: options.scope }
  }

  get baseUrl() {
    return this.serviceBaseUrl
  }

  async token() {
    if (this._token == null) {
      const result = await this.oauth2.clientCredentials.getToken(this.tokenConfig)
      this._token = this.oauth2.accessToken.create(result)
    } else if (this._token != null && this.token.expired()) {
      this._token = await this._token.refresh(this.tokenConfig)
    }
    
    return this._token.token
  }
}


export default function (options) {
  new OAuthToken(options)
}
