"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const laura_intent_employee_info_1 = require("./laura.intent.employee.info");
const plugin = new bot_core_1.BotBuilder.Library('employee');
plugin.dialog('laura.intent.employee.info', laura_intent_employee_info_1.default);
exports.default = plugin;
//# sourceMappingURL=index.js.map