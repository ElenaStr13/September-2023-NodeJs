"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyOldVisitors = void 0;
const cron_1 = require("cron");
const time_helper_1 = require("../helpers/time.helper");
const user_repository_1 = require("../repositories/user.repository");
const send_grid_service_1 = require("../services/send-grid.service");
const email_type_enum_1 = require("../enums/email-type.enum");
const config_1 = require("../configs/config");
const handler = async () => {
    try {
        console.log("[START CRON] Notify old visitors");
        const date = time_helper_1.TimeHelper.subtractByParams(2, "day");
        const users = await user_repository_1.userRepository.findWithOutActivityAfter(date);
        await Promise.all(users.map(async (user) => {
            return await send_grid_service_1.sendGridService.sendByType(user.email, email_type_enum_1.EmailTypeEnum.OLD_VISITOR, { frontUrl: config_1.config.FRONT_URL, name: user.name });
        }));
    }
    catch (error) {
        console.error("notifyOldVisitors: ", error);
    }
    finally {
        console.log("[END CRON] Notify old visitors");
    }
};
exports.notifyOldVisitors = new cron_1.CronJob("* * * 4 * *", handler);
