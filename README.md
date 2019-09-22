# trim-text

A customizable module for trimming text using characters/words/sentences limits and adding trailing characters.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

```
npm install --save trim-text
```

### Usage

```
const trimText = require('trim-text');

// or

import { trimText } from 'trim-text';
```

```
trimText(text, options);
```

**text**
String

**options:**
* mode (String)  
chars (default), words, sentences
* preserveWords (Bool)
in chars mode, prevent words from splitting
* limit (Number)
chars, words or sentences limit
* suffix (String)
trailing characters



### Examples

```
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nec ipsum in dictum."

const trimmedText = trimText(text, {mode: 'words', limit: 3, suffix: '(..)'}); // 'Lorem ipsum dolor'
```



## Authors

* KG32

## License

This project is licensed under the MIT License.
