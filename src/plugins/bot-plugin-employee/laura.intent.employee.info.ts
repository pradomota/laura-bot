import { BotBuilder, BotBuilderExt } from '@telefonica/bot-core';

export default [
    dialog
];

function dialog(session: BotBuilder.Session, args: any, next: Function) {
    console.log(args);

    let employeeEntity: BotBuilder.IEntity = BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.employee');
    let entityName = employeeEntity ? employeeEntity.entity : '';
    console.log(`Employee: ${entityName}`);

    let choices = ['choices.employee.email', 'choices.employee.call'];
    let confirmKeyboard = new BotBuilderExt.Keyboard(session).buttons(
      choices.map(choice => BotBuilder.CardAction.imBack(session, session.gettext(choice), choice))
    );

    let photo: BotBuilder.IAttachment = {
      contentType: 'image/png',
      contentUrl: 'https://the-pastry-box-project.net/assets/basiks/front/icons/github.png'
    };

    let message = new BotBuilder.Message(session)
      .text(entityName)
      .attachments([photo])
      .addAttachment(confirmKeyboard)
      .sourceEvent({
        directline: {
          componentType: 'confirm'
        }
      });

    let options: BotBuilderExt.IPromptConfirmOptions = {
      yesNoChoices: choices
    };
    return BotBuilderExt.Prompts.confirm(session, message, options);
}
