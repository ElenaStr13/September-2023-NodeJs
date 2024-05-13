"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsTemplateConstant = void 0;
const sms_type_enum_1 = require("../enums/sms-type.enum");
exports.smsTemplateConstant = {
    [sms_type_enum_1.SmsTypeEnum.WELCOME]: (name) => `Hey ${name}! Welcome to our app`,
    [sms_type_enum_1.SmsTypeEnum.DELETE_ACCOUNT]: (name) => `Hey ${name}! Your account was deleted`,
};
