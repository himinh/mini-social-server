"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleJob = void 0;
var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
var _backupMongoDB = require("./backupMongoDB");
/**
 * Time schedule job
 * second (0-59)
 * minute (0-59)
 * hour (0-23)
 * date (1-31)
 * month (0-11)
 * year
 * dayOfWeek (0-6) Starting with Sunday
 */

var scheduleJob = function scheduleJob() {
  //  Every day at 23:18, run the job.
  _nodeSchedule["default"].scheduleJob({
    hour: 23,
    minute: 18
  }, function () {
    return (0, _backupMongoDB.backupMongoDB)();
  });
};
exports.scheduleJob = scheduleJob;