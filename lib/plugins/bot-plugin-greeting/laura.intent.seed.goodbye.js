"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    dialog
];
function dialog(session, args, next) {
    session.endDialog(session.gettext('seed.goodbye'));
}
//# sourceMappingURL=laura.intent.seed.goodbye.js.map