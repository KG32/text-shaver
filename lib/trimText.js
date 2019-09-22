'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trimText;
var modes = ['chars', 'words', 'sentences'];
var defaultOptions = {
  mode: modes[0],
  limit: 10,
  suffix: '(..)'
};

function trimText(text, options) {}