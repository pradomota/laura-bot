"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const laura_intent_product_info_1 = require("./laura.intent.product.info");
const plugin = new bot_core_1.BotBuilder.Library('product');
plugin.dialog('laura.intent.product.info', laura_intent_product_info_1.default);
exports.default = plugin;
//# sourceMappingURL=index.js.map