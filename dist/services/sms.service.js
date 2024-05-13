"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsService = void 0;
const twilio_1 = require("twilio");
const config_1 = require("../configs/config");
class SmsService {
    client;
    constructor(client = new twilio_1.Twilio(config_1.config.TWILIO_ACCOUNT_SID, config_1.config.TWILIO_AUTH_TOKEN)) {
        this.client = client;
    }
    async sendSms(phone, message) {
        try {
            await this.client.messages.create({
                to: phone,
                body: message,
                messagingServiceSid: config_1.config.TWILIO_SERVICE_SID,
            });
        }
        catch (error) {
            console.error("Error sms: ", error);
        }
    }
}
exports.smsService = new SmsService();
