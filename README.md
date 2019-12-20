### text-shaver

A customizable module for trimming text using characters/words/sentences limits and adding trailing characters.

## Getting Started

### Installing

```
npm install --save text-shaver
```

### Usage

```
const { textShaver } = require('textShaver');

// or

import { textShaver } from 'text-shaver';
```

```
textShaver(text, options);
```

**text**  
String

**options:**
* mode (String)  
characters (default), words, sentences
* preserveWords (Bool)  
in characters mode, prevent words from splitting
* limit (Number)  
characters, words or sentences limit
* suffix (String)  
trailing characters



### Examples

```
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nec ipsum in dictum."

const shortText = textShaver(text, {mode: 'words', limit: 3, suffix: '(..)'}); // 'Lorem ipsum dolor(...)'
```



## Authors

* KG32

## License

This project is licensed under the MIT License.
