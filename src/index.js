
import Identity from './identity'

module.exports = {
  identity:  function (credentials) {
    return new Identity(credentials)
  }
}