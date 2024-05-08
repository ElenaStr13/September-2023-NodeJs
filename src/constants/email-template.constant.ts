import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstant = {
    [EmailTypeEnum.WELCOME]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
    [EmailTypeEnum.RESET_PASSWORD]: {
        templateId: "d-e19c821885b34afb98b9f4739514cd90",
    },
    [EmailTypeEnum.DELETE_ACCOUNT]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
    [EmailTypeEnum.LOGOUT]: {
        templateId: "d-ff9c4d120ab74f8988fb707674de3fef",
    },
};