"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
exports.default = [
    dialog
];
function dialog(session, args, next) {
    console.log(args);
    let productEntity = bot_core_1.BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.product');
    let entityName = productEntity ? productEntity.entity.replace(' ', '-') : '';
    console.log(`Product: ${entityName}`);
    let productInfo = session.gettext(`product.info.${entityName}`);
    let productImg = session.gettext(`product.image.${entityName}`);
    let attachment = {
        contentType: 'image/png',
        contentUrl: productImg
    };
    let suggestions = new bot_core_1.BotBuilderExt.Keyboard(session).buttons([
        bot_core_1.BotBuilder.CardAction.imBack(session, session.gettext('suggestion.products.head.value', productEntity.entity), 'suggestion.products.head.title')
    ]).toAttachment();
    let meesage = new bot_core_1.BotBuilder.Message(session)
        .text(productInfo)
        .attachments([attachment])
        .sourceEvent({
        directline: {
            suggestions: suggestions,
            image: 'https://static.os-eu-mad-1.instantservers.telefonica.com/images/info.png'
        }
    });
    session.endDialog(meesage);
}
//# sourceMappingURL=laura.intent.employee.info.js.map