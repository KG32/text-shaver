"use strict";

var _shaveText = require("./shaveText");

var _shaveText2 = _interopRequireDefault(_shaveText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.textShaver = function (text, options) {
  return (0, _shaveText2.default)(text, options);
};