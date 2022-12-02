"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restoreBackup = restoreBackup;
var _child_process = require("child_process");
var _config = require("../../config");
/* eslint-disable */

var DB_NAME = _config.config.app.db_name;
var ARCHIVE_PATH = "".concat(DB_NAME, ".gzip");

// Handle restore database
function restoreBackup() {
  var child = (0, _child_process.spawn)('mongorestore', ["--uri=".concat(_config.config.mongodbUrl), "--archive=".concat(ARCHIVE_PATH), '--gzip']);
  child.stdout.on('data', function (data) {
    _config.logger.info("stdout: ".concat(data));
  });
  child.stderr.on('data', function (data) {
    _config.logger.info("stderr: ".concat(Buffer.from(data).toString()));
  });
  child.on('error', function (error) {
    _config.logger.error(error);
  });
  child.on('exit', function (code, signal) {
    if (code) _config.logger.info("Process exit with code: ".concat(code));else if (signal) _config.logger.info("Process killed with signal: ".concat(signal));else _config.logger.info('Restore is successfully ✅');
  });
}