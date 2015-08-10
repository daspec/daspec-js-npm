/*global module, require */

var glob = require('glob'),
	DaSpec = require('daspec-core'),
	vm = require('vm'),
	fs = require('fs');
module.exports = function ConsoleRunner(config) {
	'use strict';
	var self = this,
		outputDir = config['output-dir'],
		fsOptions = {encoding: (config.encoding || 'utf8')},
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
			runner = new DaSpec.Runner(defineSteps),
			countingResultListener = new DaSpec.CountingResultListener(runner),
			addFormatters = function () {
				config.formatters.forEach(function (module) {
					require(module)(runner, config);
				});
			},

			globFiles = function () {
				Object.keys(files).forEach(function (key) {
					if (config[key]) {
						config[key].forEach(function (pattern) {
							files[key] = files[key].concat(glob.sync(pattern));
						});
					}
				});
			};

		checkConfig();
		globFiles();
		checkFiles(files);

		sourceScripts =	files.sources.map(toScript);
		stepScripts = files.steps.map(toScript);

		addFormatters();

		files.specs.forEach(function (specFile) {
			var	source;
			source = fs.readFileSync(specFile, fsOptions);
			runner.execute(source, specFile);
		});

		runner.dispatchEvent('finished');

		if (countingResultListener.total.failed || countingResultListener.total.error) {
			return false;
		}
		return true;
	};
};
