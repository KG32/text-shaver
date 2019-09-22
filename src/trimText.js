const modes = ['chars', 'words', 'sentences'];
const defaultOptions = {
  mode: modes[0],
  preserveWords: false,
  limit: 10,
  suffix: '(..)'
};

export default function trimText(text, options) {
  let opts = {};
  const errs = [];
  if(options && typeof options === 'object' && Object.prototype.toString.call(options) === '[object Object]') {
    for(let key in options) {
      const val = options[key];
      switch(key) {
        case 'mode':
          if(modes.indexOf(val)>=0) {
            opts['mode'] = val;
          } else {
            errs.push({msg: 'Unknown mode'});
          }
          break;
        case 'preserveWords':
          if(typeof val === 'boolean') {
            opts['preserveWords'] = val;
          } else {
            errs.push({msg: 'Unknown preserveWords'});
          }
          break;
        case 'limit':
          if(typeof val === 'number') {
            if(val > 0) {
              opts['limit'] = val;
            } else {
              errs.push('Limit must be greater than 0');
            }
          } else {
            errs.push({msg: 'Unknown limit'})
          }
          break;
        case 'suffix':
          if(typeof val === 'string') {
            opts['suffix'] = val;
          } else {
            errs.push('Unknown suffix type');
          }
          break;
        default:
          errs.push({msg: 'Unknown option key'});
      }
    }
  } else {
    opts = defaultOptions;
  }
  const optsKeys = Object.keys(opts);
  for(let key in defaultOptions) {
    if(!opts.hasOwnProperty(key)) {
      opts[key] = defaultOptions[key];
    }
  }

  let baseText = '';
  let trim = false;
  const textLength = text.length;

  switch(opts.mode) {
    case 'chars':
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
      let sentencesCount = sentencesArr.length;
      if(sentencesCount > opts.limit) {
        sentencesArr.length = opts.limit;
      }
      baseText = sentencesArr.join('.');
      break;
    default:
      errs.push({msg: 'Unknown mode.'});
  }

  for(let i=0; i<errs.length; i++) {
    console.warn(errs[i]);
  }

  return baseText.length < textLength ?`${baseText}${opts.suffix}` : baseText;
}
