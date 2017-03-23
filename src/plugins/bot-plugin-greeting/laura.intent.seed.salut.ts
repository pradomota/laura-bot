import { BotBuilder } from '@telefonica/bot-core';

export default [
    dialog
];

function dialog(session: BotBuilder.Session, args: any, next: Function) {
    let text = session.gettext('seed.salut');
    let meesage = new BotBuilder.Message(session).text(text);
    session.endDialog(meesage);
}
