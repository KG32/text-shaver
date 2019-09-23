'use strict';

var _mocha = require('mocha');

var _index = require('../lib/index.js');

var assert = require('assert');
var modes = ['characters', 'words', 'sentences'];

(0, _mocha.describe)('Strings', function () {
  (0, _mocha.it)('should shorten strings by chars', function () {
    var text = 'abcdefghijklmnopqrstuvwxyz';
    var options = { mode: 'characters', limit: 10, suffix: '(...)' };
    var res = (0, _index.textShaver)(text, options);
    assert(res, 'string');
    assert.strictEqual(res.length, options.limit + options.suffix.length);
  });
  (0, _mocha.it)('should shorten by words', function () {
    var text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis';
    var res = (0, _index.textShaver)(text, { mode: 'words', limit: 3, suffix: '(...)' });
    assert.strictEqual(res, 'At vero eos(...)');
  });
  (0, _mocha.it)('should shorten by sentences', function () {
    var text = "Nam libero tempore. Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus. Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";
    var target = "Nam libero tempore. Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.(...)";
    var res = (0, _index.textShaver)(text, { mode: 'sentences', limit: 2 });
    assert.strictEqual(res, target);
  });
});

(0, _mocha.describe)('Pitfalls', function () {
  (0, _mocha.it)('should return empty if no input for all modes', function () {
    var text = '';
    for (var i = 0; i < modes.length; i++) {
      var res = (0, _index.textShaver)(text, { mode: modes[i], limit: 3 });
      assert.strictEqual(res, '');
    }
  });
  // it('should deal with irrational options for all modes', function() {
  //   for(let i=0; i<modes.length; i++) {
  //
  //   }
  // });
});