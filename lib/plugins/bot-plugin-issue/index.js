"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const laura_intent_issue_create_1 = require("./laura.intent.issue.create");
const plugin = new bot_core_1.BotBuilder.Library('product');
plugin.dialog('laura.intent.issue.create', laura_intent_issue_create_1.default);
exports.default = plugin;
//# sourceMappingURL=index.js.map