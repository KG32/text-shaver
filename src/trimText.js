const modes = ['chars', 'words', 'sentences'];
const optionsKeys = ['mode', 'preserveWords', 'limit', 'suffix'];
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

        default:
          errs.push({msg: 'Unknown option key'});
      }
    }
  } else {
    opts = defaultOptions;
  }

  let baseText = '';

}
