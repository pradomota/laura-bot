"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
exports.default = [
    dialog
];
function dialog(session, args, next) {
    let text = session.gettext('seed.salut');
    let meesage = new bot_core_1.BotBuilder.Message(session).text(text);
    session.endDialog(meesage);
}
//# sourceMappingURL=laura.intent.seed.salut.js.map