/*global module, require, console */
module.exports = function consoleResultFormatter(runner) {
	'use strict';
	var DaSpec = require('daspec-core'),
		countingResultListener = new DaSpec.CountingResultListener(runner),
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
	runner.addEventListener('specEnded',  function (name) {
		if (!headerPrinted) {
			printHeader();
		}
		writeCounts(name, countingResultListener.current);
	});
	runner.addEventListener('finished', function () {
		console.log('-----------------------------------------------------------');
		console.log(formatCounts(countingResultListener.total), '\tTOTAL');
	});
};
