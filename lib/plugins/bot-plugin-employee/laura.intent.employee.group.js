"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const http = require("http");
exports.default = [
    dialog
];
function dialog(session, args, next) {
    let groupEntity = bot_core_1.BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.group');
    let entityName = groupEntity ? groupEntity.entity : '';
    console.log(entityName);
    http.get(`http://gsb.devel.e-paths.com/role/${entityName}`, (res) => {
        const statusCode = res.statusCode;
        const contentType = res.headers['content-type'];
        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
        }
        else if (!/^application\/json/.test(contentType)) {
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
                let employees = JSON.parse(rawData);
                console.log(employees);
                let choicesKeyboard = new bot_core_1.BotBuilderExt.Keyboard(session).buttons(employees.map(employee => bot_core_1.BotBuilder.CardAction.imBack(session, `${employee.fullname}`, `${employee.fullname}`)
                    .image(employee.pic)));
                let message = new bot_core_1.BotBuilder.Message(session)
                    .text(`Estos son los ${entityName} que hay en CDO`)
                    .addAttachment(choicesKeyboard);
                return bot_core_1.BotBuilderExt.Prompts.confirm(session, message);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
        session.endDialog(e.message);
    });
}
class Employee {
}
exports.Employee = Employee;
//# sourceMappingURL=laura.intent.employee.group.js.map