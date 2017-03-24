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
    let productInfo = session.gettext(`product.info.${entityName}`);
    let productImg = session.gettext(`product.image.${entityName}`);
    let attachment = {
        contentType: 'image/png',
        contentUrl: productImg
    };
    let meesage = new bot_core_1.BotBuilder.Message(session)
        .text(productInfo)
        .attachments([attachment]);
    session.endDialog(meesage);
}
//# sourceMappingURL=laura.intent.product.info.js.map