import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstant = {
    [EmailTypeEnum.WELCOME]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
    [EmailTypeEnum.RESET_PASSWORD]: {
        templateId: "d-18c381a837104b13b6652f7f537a06b1",
    },
    [EmailTypeEnum.DELETE_ACCOUNT]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
    [EmailTypeEnum.LOGOUT]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
};