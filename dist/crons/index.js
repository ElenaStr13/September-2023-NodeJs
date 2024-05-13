"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCronJobs = void 0;
const remove_old_tokens_cron_1 = require("./remove-old-tokens.cron");
const test_cron_1 = require("./test.cron");
const runCronJobs = () => {
    test_cron_1.testCron.start();
    remove_old_tokens_cron_1.removeOldTokens.start();
};
exports.runCronJobs = runCronJobs;
