"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTypeEnum = void 0;
var EmailTypeEnum;
(function (EmailTypeEnum) {
    EmailTypeEnum["WELCOME"] = "welcome";
    EmailTypeEnum["RESET_PASSWORD"] = "resetPassword";
    EmailTypeEnum["DELETE_ACCOUNT"] = "deleteAccount";
    EmailTypeEnum["LOGOUT"] = "logout";
    EmailTypeEnum["OLD_VISITOR"] = "oldVisitor";
})(EmailTypeEnum || (exports.EmailTypeEnum = EmailTypeEnum = {}));
