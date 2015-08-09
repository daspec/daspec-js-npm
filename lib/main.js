#!/usr/bin/env node

/*global require, process, console, __dirname */
var path = require('path'),
	argParser = require('../src/arg-parser'),
	fs = require('fs'),
	defaultConfigFile = 'daspec.json',
	ConsoleRunner = require('../src/console-runner');
(function () {
	'use strict';
	var parsedArgs,
		config = require('./factory-config.json'),
		loadConfigFile = function (fileName, ignoreMissing) {
			try {
				return require(path.join(process.cwd(), fileName));
			} catch (e) {
				if (ignoreMissing && e.code === 'MODULE_NOT_FOUND') {
					return {};
				} else {
					console.error('Problem reading config file ' + fileName, e);
					process.exit(1);
				}
			}
		},
		merge = function (o1, o2) {
			Object.keys(o2).forEach(function (key) {
				o1[key] = o2[key];
			});
		},
		runner,
		result;
	if (process.argv.indexOf('--help') > 0) {
		fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
		return;
	}
	parsedArgs = argParser(process.argv.slice(1));
	merge(config, loadConfigFile(defaultConfigFile, true));
	if (parsedArgs.config) {
		merge(config, loadConfigFile(parsedArgs.config[0]));
	}
	merge(config, parsedArgs);
	if (Array.isArray(config['output-dir'])) {
		config['output-dir'] = config['output-dir'][0];
	}
	try {
		runner = new ConsoleRunner(config);
		result = runner.run();
		if (!result) {
			process.exit(1);
		}
	} catch (e) {
		console.error(e.stack || e);
		process.exit(1);
	}
})();
