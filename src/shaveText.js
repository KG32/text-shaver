"use strict";

const modes = ['characters', 'words', 'sentences'];
const defaultOptions = {
  mode: modes[0],
  preserveWords: false,
  limit: 10,
  suffix: '(..)'
};

export default function shaveText(text, options) {
  if(text === '') return text;
  if(typeof text !== 'string') {
    return '';
  }

  let opts = {};
  if(options && typeof options === 'object' && Object.prototype.toString.call(options) === '[object Object]') {
    for(let key in options) {
      const val = options[key];
      switch(key) {
        case 'mode':
          if(modes.indexOf(val)>=0) {
            opts['mode'] = val;
          }
          break;
        case 'preserveWords':
          if(typeof val === 'boolean') {
            opts['preserveWords'] = val;
          }
          break;
        case 'limit':
          if(typeof val === 'number') {
            if(val > 0) {
              opts['limit'] = val;
            }
          }
          break;
        case 'suffix':
          if(typeof val === 'string') {
            opts['suffix'] = val;
          }
          break;
        default:
      }
    }
  } else {
    opts = defaultOptions;
  }
  for(let key in defaultOptions) {
    if(!opts.hasOwnProperty(key)) {
      opts[key] = defaultOptions[key];
    }
  }

  let baseText = '';
  const textLength = text.length;

  switch(opts.mode) {
    case 'characters':
      if(!opts.preserveWords) {
        baseText = text.substring(0, opts.limit);
      } else {
        let cText = text.substring(0, opts.limit);
        let sIndex = textLength;
        while(sIndex>=0) {
          const cChar = cText.charAt(sIndex-1);
          if(cChar === ' ' || cChar === '.') {
            baseText = cText.substring(0, sIndex);
            break;
          }
          sIndex--;
        }
      }
      break;
    case 'words':
      let wordsArr = text.split(' ');
      let wordsCount = wordsArr.length;
      if(wordsCount > opts.limit) {
        wordsArr.length = opts.limit;
      }
      baseText = wordsArr.join(' ');
      break;
    case 'sentences':
      let sentencesArr = text.split('.');
      const sentencesCount = sentencesArr.length;
      if(sentencesCount > opts.limit) {
        sentencesArr.length = opts.limit;
      }
      baseText = sentencesArr.join('.');
      if(sentencesCount>1) {
        baseText = baseText + '.';
      }
      break;
    default:
  }

  return baseText.length < textLength ?`${baseText}${opts.suffix}` : baseText;
}
