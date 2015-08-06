/*global require, process, console, __dirname */
var path = require('path'),
	argParser = require('../src/arg-parser'),
	fs = require('fs'),
	defaultConfigFile = 'daspec.json',
	ConsoleRunner = require('../src/console-runner');
(function () {
	'use strict';
	var parsedArgs,
		config,
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
		};
	if (process.argv.indexOf('--help') > 0) {
		fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
		return;
	}
	parsedArgs = argParser(process.argv.slice(1));
	config = loadConfigFile(defaultConfigFile, true);
	if (parsedArgs.config) {
		merge(config, loadConfigFile(parsedArgs.config[0]));
	}
	merge(config, parsedArgs);
	if (Array.isArray(config['output-dir'])) {
		config['output-dir'] = config['output-dir'][0];
	}
	try {
		new ConsoleRunner(config).run();
	} catch (e) {
		console.error(e.stack || e);
		process.exit(1);
	}
})();
