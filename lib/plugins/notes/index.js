"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const builtin_intent_note_create_note_1 = require("./builtin.intent.note.create_note");
let plugin = new bot_core_1.BotBuilder.Library('notes');
plugin.dialog('builtin.intent.note.create_note', builtin_intent_note_create_note_1.default);
exports.default = plugin;
//# sourceMappingURL=index.js.map