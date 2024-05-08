"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplateConstant = void 0;
const email_type_enum_1 = require("../enums/email-type.enum");
exports.emailTemplateConstant = {
    [email_type_enum_1.EmailTypeEnum.WELCOME]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
    [email_type_enum_1.EmailTypeEnum.RESET_PASSWORD]: {
        templateId: "d-e19c821885b34afb98b9f4739514cd90",
    },
    [email_type_enum_1.EmailTypeEnum.DELETE_ACCOUNT]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
    [email_type_enum_1.EmailTypeEnum.LOGOUT]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
};
