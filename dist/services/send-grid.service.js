"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGridService = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = require("../configs/config");
const email_template_constant_1 = require("../constants/email-template.constant");
class SendGridService {
    constructor() {
        mail_1.default.setApiKey(config_1.config.SENDGRID_API_KEY);
    }
    async sendByType(to, type, dynamicTemplateData) {
        try {
            const templateId = email_template_constant_1.emailTemplateConstant[type].templateId;
            await this.send({
                from: config_1.config.SENDGRID_FROM_EMAIL,
                to,
                templateId,
                dynamicTemplateData,
            });
        }
        catch (error) {
            console.error("Error email: ", error);
        }
    }
    async send(email) {
        try {
            await mail_1.default.send(email);
        }
        catch (error) {
            console.error("Error email: ", error);
        }
    }
}
exports.sendGridService = new SendGridService();
