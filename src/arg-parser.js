/*global module */
module.exports = function argParser(arrayToParse) {
	'use strict';
	var result = {},
		currentKey,
		appendNext = function (element) {
			if (/^--/.test(element)) {
				currentKey = element.substring(2);

			} else {
				if (currentKey) {
					if (!result[currentKey]) {
						result[currentKey] = [];
					}
					result[currentKey].push(element);
				}
			}
		};
	arrayToParse.forEach(appendNext);
	return result;
};
