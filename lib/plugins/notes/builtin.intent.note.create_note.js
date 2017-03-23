"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
exports.default = [
    createStep,
    confirmCreation
];
function createStep(session, args, next) {
    let entityNote = bot_core_1.BotBuilder.EntityRecognizer.findEntity(args.entities, 'builtin.note.note_text');
    if (entityNote) {
        session.dialogData.note = entityNote.entity;
        let message = session.gettext('note.confirm_note', session.dialogData.note);
        bot_core_1.BotBuilder.Prompts.confirm(session, message);
    }
    else {
        session.endDialog('I have not found any notes');
    }
}
function confirmCreation(session, result, next) {
    if (result.response === true) {
        session.endDialog('note.create_note');
    }
    else {
        session.endDialog('note.cancel_note');
    }
}
//# sourceMappingURL=builtin.intent.note.create_note.js.map