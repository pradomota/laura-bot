import { BotBuilder, BotBuilderExt } from '@telefonica/bot-core';

export default [
    dialog
];

function dialog(session: BotBuilder.Session, args: any, next: Function) {
    console.log(args);

    let productEntity: BotBuilder.IEntity = BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.product');
    let entityName = productEntity ? productEntity.entity.replace(' ', '-') : '';
    console.log(`Product: ${entityName}`);

    let productInfo = session.gettext(`product.info.${entityName}`);
    let productImg = session.gettext(`product.image.${entityName}`);

    let attachment: BotBuilder.IAttachment = {
      contentType: 'image/png',
      contentUrl: productImg
    };

    let suggestions = new BotBuilderExt.Keyboard(session).buttons([
      BotBuilder.CardAction.imBack(session, session.gettext('suggestion.products.head.value', productEntity.entity),
        'suggestion.products.head.title')
    ]).toAttachment();

    let meesage = new BotBuilder.Message(session)
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
