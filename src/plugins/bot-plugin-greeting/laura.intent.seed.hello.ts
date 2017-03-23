import { BotBuilder } from '@telefonica/bot-core';

export default [
    dialog
];

function dialog(session: BotBuilder.Session, args: any, next: Function) {
    session.endDialog('seed.hello');
}
