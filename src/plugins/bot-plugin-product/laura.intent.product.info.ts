import { BotBuilder } from '@telefonica/bot-core';

export default [
    dialog
];

function dialog(session: BotBuilder.Session, args: any, next: Function) {
    console.log(args);

    let productEntity: BotBuilder.IEntity = BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.product');
    let entityName = productEntity ? productEntity.entity.replace(' ', '-') : '';

    let productInfo = session.gettext(`product.info.${entityName}`);
    let productImg = session.gettext(`product.image.${entityName}`);

    let attachment: BotBuilder.IAttachment = {
      contentType: 'image/png',
      contentUrl: productImg
    };

    let meesage = new BotBuilder.Message(session)
      .text(productInfo)
      .attachments([attachment]);
    session.endDialog(meesage);
}
