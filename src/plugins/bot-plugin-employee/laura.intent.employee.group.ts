import { BotBuilder, BotBuilderExt } from '@telefonica/bot-core';

import http = require('http');

export default [
    dialog
];

function dialog(session: BotBuilder.Session, args: any, next: Function) {

  let groupEntity: BotBuilder.IEntity = BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.group');
  let entityName = groupEntity ? groupEntity.entity : '';

  console.log(entityName);
  http.get(`http://gsb.devel.e-paths.com/role/${entityName}`, (res) => {
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
        let employees: Employee[] = JSON.parse(rawData);
        console.log(employees);

        let choicesKeyboard = new BotBuilderExt.Keyboard(session).buttons(
          employees.map(employee =>
            BotBuilder.CardAction.imBack(
              session,
              employee.fullname,
              employee.fullname)
              .image(employee.pic || 'https://the-pastry-box-project.net/assets/basiks/front/icons/github.png'))
          );

        let message = new BotBuilder.Message(session)
          .text(`Estos son los ${entityName} que hay en CDO`)
          .addAttachment(choicesKeyboard);

        return BotBuilderExt.Prompts.confirm(session, message);
      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    session.endDialog(e.message);
  });
}

export class Employee {
  totalTeam: number;
  numOfChildren: number;
  fullname: string;
  pic: string;
  title: string;
  phone: string;
  email: string;
  location: string;
}
