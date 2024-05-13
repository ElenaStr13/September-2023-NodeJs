"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldTokens = void 0;
const cron_1 = require("cron");
const time_helper_1 = require("../helpers/time.helper");
const token_repository_1 = require("../repositories/token.repository");
const handler = async () => {
    try {
        console.log("[START CRON] Remove old tokens");
        await token_repository_1.tokenRepository.deleteByParams({
            createdAt: { $lte: time_helper_1.TimeHelper.subtractByParams(9, "days") },
        });
    }
    catch (error) {
        console.error("removeOldTokens: ", error);
    }
    finally {
        console.log("[END CRON] Remove old tokens");
    }
};
exports.removeOldTokens = new cron_1.CronJob("0 0 4 * * *", handler);
