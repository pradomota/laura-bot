"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const laura_intent_seed_hello_1 = require("./laura.intent.seed.hello");
const laura_intent_seed_goodbye_1 = require("./laura.intent.seed.goodbye");
const plugin = new bot_core_1.BotBuilder.Library('seed');
plugin.dialog('laura.intent.seed.hello', laura_intent_seed_hello_1.default);
plugin.dialog('laura.intent.seed.goodbye', laura_intent_seed_goodbye_1.default);
exports.default = plugin;
//# sourceMappingURL=index.js.map