/*global describe, require, it, expect */
describe('argParser', function () {
	'use strict';
	var underTest = require('../src/arg-parser');
	it('converts a list of strings prefixed with a --string into an array stored as a property named after the leading arg', function () {
		var result = underTest(['--spec', 'first', 'second']);
		expect(result).toEqual({'spec': ['first', 'second']});
	});
	it('works with multiple -- args', function () {
		var result = underTest(['--spec', 'first', 'second', '--test', 'third']);
		expect(result).toEqual({'spec': ['first', 'second'], 'test': ['third']});
	});
	it('ignores everything before the first --', function () {
		var result = underTest(['first', 'first', '--spec', 'second', 'third']);
		expect(result).toEqual({'spec': ['second', 'third']});
	});
	it('skips empty -- groups', function () {
		var result = underTest(['--test', '--spec', 'second', 'third']);
		expect(result).toEqual({'spec': ['second', 'third']});
	});
	it('returns empty object for empty arrays', function () {
		var result = underTest([]);
		expect(result).toEqual({});
	});
	it('treats -- only at the start of a string as a group name', function () {
		var result = underTest(['--test', 'my--spec', 'second', 'third']);
		expect(result).toEqual({'test': ['my--spec', 'second', 'third']});
	});
});
