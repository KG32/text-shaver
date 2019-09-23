'use strict';
import { describe, it } from 'mocha';
import { textShaver } from '../lib/index.js';
const assert = require('assert');
const modes = ['characters', 'words', 'sentences'];


describe('Strings', function() {
  it('should shorten strings by chars', function() {
    const text = 'abcdefghijklmnopqrstuvwxyz';
    const options = {mode: 'characters', limit: 10, suffix: '(...)'};
    const res = textShaver(text, options);
    assert(res, 'string');
    assert.strictEqual(res.length, options.limit + options.suffix.length);
  });
  it('should shorten by words', function() {
    const text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis';
    const res = textShaver(text, {mode: 'words', limit: 3, suffix: '(...)'});
    assert.strictEqual(res, 'At vero eos(...)');
  });
  it('should shorten by sentences', function() {
    const text = "Nam libero tempore. Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus. Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    const target = "Nam libero tempore. Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.(...)";
    const res = textShaver(text, {mode: 'sentences', limit: 2});
    assert.strictEqual(res, target);
  });
});

describe('Pitfalls', function() {
  it('should return empty if no input for all modes', function() {
    const text = '';
    for(let i=0; i<modes.length; i++) {
      const res = textShaver(text, {mode: modes[i], limit: 3});
      assert.strictEqual(res, '');
    }
  });
  // it('should deal with irrational options for all modes', function() {
  //   for(let i=0; i<modes.length; i++) {
  //
  //   }
  // });
});
