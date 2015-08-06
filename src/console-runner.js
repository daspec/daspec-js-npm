/*global module, require */

var glob = require('glob'),
	outputPath = require('./output-path'),
	DaSpec = require('daspec-core'),
	vm = require('vm'),
	fs = require('fs'),
	fsOptions = {encoding: 'utf8'}; /* TODO config encoding? */
module.exports = function ConsoleRunner(config) {
	'use strict';
	var self = this,
		outputDir = config['output-dir'],
		checkConfig = function () {
			if (!outputDir) {
				throw new Error('Output directory is not defined');
			}
			if (!config.specs || config.specs.length === 0) {
				throw new Error('No specs defined for this run.');
			}
			if (!config.steps || config.steps.length === 0) {
				throw new Error('No steps defined for this run.');
			}
		},
		checkFiles = function (files) {
			if (files.steps.length === 0) {
				throw new Error('No step files match the list provided:', config.steps);
			}
			if (files.specs.length === 0) {
				throw new Error('No spec files match the list provided:', config.specs);
			}
		},
		toScript = function (sourcePath) {
			var source = fs.readFileSync(sourcePath, fsOptions);
			return new vm.Script(source, { filename: sourcePath });
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
			};

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
			var runner = new DaSpec.Runner(defineSteps),
				source = fs.readFileSync(specFile, fsOptions),
				result = runner.example(source);
			fs.writeFileSync(outputPath(specFile), result, fsOptions);
		});
	};
};
