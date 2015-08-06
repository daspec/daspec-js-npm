/*global describe, expect, it, require*/

describe('outputPath', function () {
	'use strict';
	var underTest = require('../src/output-path');
	it('replaces the first dir in the path with the output dir', function () {
		expect(underTest('spec/test.md', 'output')).toEqual('output/test.md');
	});
	it('strips out the relative beginning', function () {
		expect(underTest('../spec/test.md', 'output')).toEqual('output/spec/test.md');
	});
	it('normalizes the paths before stripping', function () {
		expect(underTest('../spec/../text/test.md', 'output')).toEqual('output/text/test.md');
	});
	it('deals with absolute paths', function () {
		expect(underTest('/text/test.md', 'output')).toEqual('output/text/test.md');
	});
	it('prepends the output dir when no folder in path', function () {
		expect(underTest('test.md', 'output')).toEqual('output/test.md');
	});
	it('survives ./', function () {
		expect(underTest('./test.md', 'output')).toEqual('output/test.md');
	});
	it('throws exception when the paths is not defined', function () {
		expect(function () {
			expect(underTest('', 'output'));
		}).toThrowError('Path not defined');
		expect(function () {
			expect(underTest(false, 'output'));
		}).toThrowError('Path not defined');
		expect(function () {
			expect(underTest(undefined, 'output'));
		}).toThrowError('Path not defined');
	});
	it('throws exception when output dir is not defined', function () {
		expect(function () {
			expect(underTest('spec.md', ''));
		}).toThrowError('Output dir not defined');
		expect(function () {
			expect(underTest('spec.md', false));
		}).toThrowError('Output dir not defined');
		expect(function () {
			expect(underTest('spec.md', undefined));
		}).toThrowError('Output dir not defined');
	});
});
