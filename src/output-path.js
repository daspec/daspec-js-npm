/*global require, module*/
var path = require('path');
module.exports = function outputPath(filePath, outputDir) {
	'use strict';
	if (!filePath || filePath.length === 0) {
		throw new Error('Path not defined');
	}
	if (!outputDir || outputDir.length === 0) {
		throw new Error('Output dir not defined');
	}
	var normal = path.normalize(filePath),
		relative = normal;
	if (normal.indexOf(path.sep) >= 0) {
		relative = normal.substring(normal.indexOf(path.sep) + 1);
	}
	return path.join(outputDir, relative);
};
