/*global module, console */
module.exports = function consoleResultFormatter(runner, config) {
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
		colors = {
			red: 1,
			green: 2,
			yellow: 3,
			grey: 7
		},
		paint = function (text, color) {
			if (colors[color]) {
				return '\x1b[3' + colors[color] + 'm' + text + '\x1b[0m';
			} else {
				return text;
			}
		},
		color = function (counts) {
			if (config['no-color']) {
				return false;
			}
			if (counts.error || counts.failed) {
				return 'red';
			}
			if (counts.skipped) {
				return 'yellow';
			}
			if (counts.passed) {
				return 'green';
			}
			return 'grey';
		},
		formatCounts = function (counts) {
			return symbol(counts) + '\t' + counts.executed + '\t' + counts.passed + '\t' + counts.failed + '\t' + counts.error + '\t' + counts.skipped;
		},
		writeCounts = function (exampleName, counts) {
			console.log(paint(formatCounts(counts) + '\t' + exampleName, color(counts)));
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
