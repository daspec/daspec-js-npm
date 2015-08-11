/*global module, console */
module.exports = function consoleResultFormatter(runner) {
	'use strict';
	var symbol = function (counts) {
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
		divider = function () {
			console.log('-----------------------------------------------------------');
		},
		headerPrinted = false,
		printHeader = function () {
			console.log('STATUS\tEXEC\tPASS\tFAIL\tERR\tSKIP');
			divider();
			headerPrinted = true;
		};
	runner.addEventListener('specEnded',  function (name, counts) {
		if (!headerPrinted) {
			printHeader();
		}
		writeCounts(name, counts);
	});
	runner.addEventListener('suiteEnded', function (counts) {
		divider();
		writeCounts('TOTAL', counts);
	});
};
