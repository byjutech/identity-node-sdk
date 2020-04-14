"use strict";

var _identity = _interopRequireDefault(require("./identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = {
  identity: function identity(credentials) {
    return new _identity["default"](credentials);
  }
};