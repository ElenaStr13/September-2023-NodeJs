"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCron = void 0;
const cron_1 = require("cron");
const handler = async () => {
    console.log("Test cron");
};
exports.testCron = new cron_1.CronJob("* * 4 * *", handler);
