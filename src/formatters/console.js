/*global module, require, console */
module.exports = function consoleResultFormatter() {
	'use strict';
	var DaSpec = require('daspec-core'),
		countingResultFormatter = new DaSpec.CountingResultFormatter(),
		symbol = function (counts) {
			if (counts.error || counts.failed) {
				return '-';
			}
			if (counts.skipped) {
				return '!';
			}
			if (counts.passed) {
				return '+';
			}
			return '?';
		},
		formatCounts = function (counts) {
			return symbol(counts) + '\t' + counts.executed + '\t' + counts.passed + '\t' + counts.failed + '\t' + counts.error + '\t' + counts.skipped;
		},
		writeCounts = function (exampleName, counts) {
			console.log(formatCounts(counts) + '\t' + exampleName);
		},
		headerPrinted = false,
		printHeader = function () {
			console.log('STATUS\tEXEC\tPASS\tFAIL\tERR\tSKIP');
			console.log('-----------------------------------------------------------');
			headerPrinted = true;
		};
	countingResultFormatter.addEventListener('exampleFinished',  function (name, counts) {
		if (!headerPrinted) {
			printHeader();
		}
		writeCounts(name, counts);
	});
	countingResultFormatter.addEventListener('closed', function (counts) {
		console.log('-----------------------------------------------------------');
		console.log(formatCounts(counts), '\tTOTAL');
	});
	return countingResultFormatter;
};
