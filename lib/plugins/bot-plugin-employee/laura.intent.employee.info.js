"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
exports.default = [
    dialog
];
function dialog(session, args, next) {
    console.log(args);
    let employeeEntity = bot_core_1.BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.employee');
    let entityName = employeeEntity ? employeeEntity.entity : '';
    console.log(`Employee: ${entityName}`);
    let choices = ['choices.employee.email', 'choices.employee.call'];
    let confirmKeyboard = new bot_core_1.BotBuilderExt.Keyboard(session).buttons(choices.map(choice => bot_core_1.BotBuilder.CardAction.imBack(session, session.gettext(choice), choice)));
    let photo = {
        contentType: 'image/png',
        contentUrl: 'https://the-pastry-box-project.net/assets/basiks/front/icons/github.png'
    };
    let message = new bot_core_1.BotBuilder.Message(session)
        .text(entityName)
        .attachments([photo])
        .addAttachment(confirmKeyboard)
        .sourceEvent({
        directline: {
            componentType: 'confirm'
        }
    });
    let options = {
        yesNoChoices: choices
    };
    return bot_core_1.BotBuilderExt.Prompts.confirm(session, message, options);
}
//# sourceMappingURL=laura.intent.employee.info.js.map