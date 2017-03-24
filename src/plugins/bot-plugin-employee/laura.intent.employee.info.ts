import { BotBuilder, BotBuilderExt } from '@telefonica/bot-core';

import http = require('http');

export default [
    dialog
];

function dialog(session: BotBuilder.Session, args: any, next: Function) {

  let employeeEntity: BotBuilder.IEntity = BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.employee');
  let entityName = employeeEntity ? employeeEntity.entity : '';

  http.get(`http://gsb.devel.e-paths.com/person/${entityName}`, (res) => {
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];
    let error;

    if (statusCode !== 200) {
      error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
    }

    if (error) {
      console.log(error.message);
      res.resume();
      session.endDialog(error.message);
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        let employee = JSON.parse(rawData);
        console.log(employee);

        let photo: BotBuilder.IAttachment = {
          contentType: 'image/png',
          contentUrl: employee.pick || 'https://the-pastry-box-project.net/assets/basiks/front/icons/github.png'
        };

        let choices = ['choices.employee.email', 'choices.employee.call'];
        let confirmKeyboard = new BotBuilderExt.Keyboard(session).buttons(
          choices.map(choice => BotBuilder.CardAction.imBack(session, session.gettext(choice), choice))
        );

        let info = `${employee.fullname.replace(/\b\w/g, function(l: any) {return l.toUpperCase() }) || ''}\n${employee.title || ''}\n${employee.location || ''}\n\n${employee.email || ''}\n${employee.phone || ''}`;
        let message = new BotBuilder.Message(session)
          .text(info)
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
      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    session.endDialog(e.message);
  });
}
