/*global require, defineStep, expect */
var database = require('./database');
defineStep(/The (\w+) is (\w+)/, function (key, val) {
	'use strict';
	expect(database[key]).toEqual(val);
});
