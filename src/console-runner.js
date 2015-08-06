/*global module, require, console */

var glob = require('glob'),
	outputPath = require('./output-path'),
	DaSpec = require('daspec-core'),
	vm = require('vm'),
	fs = require('fs'),
	mkdirp = require('mkdirp'),
	path = require('path'),
	fsOptions = {encoding: 'utf8'}; /* TODO config encoding? */
module.exports = function ConsoleRunner(config) {
	'use strict';
	var self = this,
		outputDir = config['output-dir'],
		checkConfig = function () {
			if (!outputDir) {
				throw 'Output directory is not defined -- re-run with --help to see config arguments';
			}
			if (!config.specs || config.specs.length === 0) {
				throw 'No specs defined for this run -- re-run with --help to see config arguments';
			}
			if (!config.steps || config.steps.length === 0) {
				throw 'No steps defined for this run  -- re-run with --help to see config arguments';
			}
		},
		checkFiles = function (files) {
			if (files.steps.length === 0) {
				throw 'No step files match the list provided:' + config.steps;
			}
			if (files.specs.length === 0) {
				throw 'No spec files match the list provided:' + config.specs;
			}
		},
		toScript = function (sourcePath) {
			var source = fs.readFileSync(sourcePath, fsOptions);
			return new vm.Script(source, sourcePath);
		};
	self.run = function () {
		var files = { specs: [], steps: [], sources: []},
			sourceScripts,
			stepScripts,
			defineSteps = function (specContext) {
				var nodeContext = vm.createContext(specContext);
				sourceScripts.concat(stepScripts).forEach(function (script) {
					script.runInContext(nodeContext);
				});
			},
			runner = new DaSpec.Runner(defineSteps);
		checkConfig();
		Object.keys(files).forEach(function (key) {
			if (config[key]) {
				config[key].forEach(function (pattern) {
					files[key] = files[key].concat(glob.sync(pattern));
				});
			}
		});
		checkFiles(files);
		sourceScripts =	files.sources.map(toScript);
		stepScripts = files.steps.map(toScript);

		files.specs.forEach(function (specFile) {
			console.log('running', specFile);
			var	source,
				result,
				outputFile = outputPath(specFile, outputDir);
			source = fs.readFileSync(specFile, fsOptions);
			result = runner.example(source);
			console.log('... done, writing', outputFile);
			mkdirp.sync(path.dirname(outputFile));
			fs.writeFileSync(outputFile, result, fsOptions);
		});
	};
};
