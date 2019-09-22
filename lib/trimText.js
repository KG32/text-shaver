'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = trimText;
var modes = ['chars', 'words', 'sentences'];
var optionsKeys = ['mode', 'preserveWords', 'limit', 'suffix'];
var defaultOptions = {
  mode: modes[0],
  preserveWords: false,
  limit: 10,
  suffix: '(..)'
};

function trimText(text, options) {
  var opts = {};
  var errs = [];
  if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && Object.prototype.toString.call(options) === '[object Object]') {
    for (var key in options) {
      var val = options[key];
      switch (key) {
        case 'mode':
          if (modes.indexOf(val) >= 0) {
            opts['mode'] = val;
          } else {
            errs.push({ msg: 'Unknown mode' });
          }
          break;
        case 'preserveWords':
          if (typeof val === 'boolean') {
            opts['preserveWords'] = val;
          } else {
            errs.push({ msg: 'Unknown preserveWords' });
          }
          break;
        case 'limit':
          if (typeof val === 'number') {
            if (val > 0) {
              opts['limit'] = val;
            } else {
              errs.push('Limit must be greater than 0');
            }
          } else {
            errs.push({ msg: 'Unknown limit' });
          }
          break;
        case 'suffix':
          if (typeof val === 'string') {
            opts['suffix'] = val;
          } else {
            errs.push('Unknown suffix type');
          }
          break;
        default:
          errs.push({ msg: 'Unknown option key' });
      }
    }
  } else {
    opts = defaultOptions;
  }
  var optsKeys = Object.keys(opts);
  for (var _key in defaultOptions) {
    if (!opts.hasOwnProperty(_key)) {
      opts[_key] = defaultOptions[_key];
    }
  }

  var baseText = '';
  var trim = false;
  var textLength = text.length;

  switch (opts.mode) {
    case 'chars':
      if (!opts.preserveWords) {
        baseText = text.substring(0, opts.limit);
      } else {
        var cText = text.substring(0, opts.limit);
        var sIndex = textLength;
        while (sIndex >= 0) {
          var cChar = cText.charAt(sIndex - 1);
          if (cChar === ' ' || cChar === '.') {
            baseText = cText.substring(0, sIndex);
            break;
          }
          sIndex--;
        }
      }
      break;
    case 'words':
      var wordsArr = text.split(' ');
      var wordsCount = wordsArr.length;
      if (wordsCount > opts.limit) {
        wordsArr.length = opts.limit;
      }
      baseText = wordsArr.join(' ');
      break;
    case 'sentences':
      var sentencesArr = text.split('.');
      var sentencesCount = sentencesArr.length;
      if (sentencesCount > opts.limit) {
        sentencesArr.length = opts.limit;
      }
      baseText = sentencesArr.join('.');
      break;
    default:
      errs.push({ msg: 'Unknown mode.' });
  }

  for (var i = 0; i < errs.length; i++) {
    console.warn(errs[i]);
  }

  return baseText.length < textLength ? '' + baseText + opts.suffix : baseText;
}