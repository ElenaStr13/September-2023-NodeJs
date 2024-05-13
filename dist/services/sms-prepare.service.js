"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsPrepareService = void 0;
const sms_template_constant_1 = require("../constants/sms-template.constant");
const sms_type_enum_1 = require("../enums/sms-type.enum");
const sms_service_1 = require("./sms.service");
class SmsPrepareService {
    async register(phone, data) {
        const message = sms_template_constant_1.smsTemplateConstant[sms_type_enum_1.SmsTypeEnum.WELCOME](data.name);
        await sms_service_1.smsService.sendSms(phone, message);
    }
    async deleteAccount(phone, data) {
        const message = sms_template_constant_1.smsTemplateConstant[sms_type_enum_1.SmsTypeEnum.DELETE_ACCOUNT](data.name);
        await sms_service_1.smsService.sendSms(phone, message);
    }
}
exports.smsPrepareService = new SmsPrepareService();
