/*global module, console, require */

var glob = require('glob'),
	outputPath = require('./output-path');
module.exports = function ConsoleRunner(config) {
	'use strict';
	var self = this,
		outputDir = config['output-dir'];
	self.run = function () {
		if (!outputDir) {
			throw new Error('Output directory is not defined');
		}
		var files = { specs: [], steps: [], sources: []};
		if (!config.specs || config.specs.length === 0) {
			throw new Error('No specs defined for this run.');
		}
		if (!config.steps || config.steps.length === 0) {
			throw new Error('No steps defined for this run.');
		}
		Object.keys(files).forEach(function (key) {
			if (config[key]) {
				config[key].forEach(function (pattern) {
					files[key] = files[key].concat(glob.sync(pattern));
				});
			}
		});
		if (files.steps.length === 0) {
			throw new Error('No step files match the list provided:', config.steps);
		}
		if (files.specs.length === 0) {
			throw new Error('No spec files match the list provided:', config.specs);
		}
		files.specs.forEach(function (file) {
			console.log(file, '=>', outputPath(file, outputDir));
		});
	};
};
