/*global module, require */
module.exports = function createFileSavingResultFormatter(config) {
	'use strict';
	var DaSpec = require('daspec-core'),
		outputPath = require('../src/output-path'),
		fs = require('fs'),
		mkdirp = require('mkdirp'),
		path = require('path'),
		fsOptions = {encoding: (config.encoding || 'utf8')},
		outputDir = config['output-dir'],
		markdownResultFormatter = new DaSpec.MarkdownResultFormatter(),
		oldExampleFinished = markdownResultFormatter.exampleFinished,
		writeResults = function (specFile) {
			var outputFile = outputPath(specFile, outputDir);
			mkdirp.sync(path.dirname(outputFile));
			fs.writeFileSync(outputFile, markdownResultFormatter.formattedResults(), fsOptions);
		};
	markdownResultFormatter.exampleFinished = function (file) {
		oldExampleFinished.apply(markdownResultFormatter, arguments);
		writeResults(file);
	};
	return markdownResultFormatter;
};
