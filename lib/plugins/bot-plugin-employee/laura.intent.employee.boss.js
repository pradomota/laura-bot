"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const http = require("http");
exports.default = [
    dialog
];
function dialog(session, args, next) {
    let employeeEntity = bot_core_1.BotBuilder.EntityRecognizer.findEntity(args.entities, 'laura.employee');
    if (!employeeEntity) {
        session.endDialog(session.gettext('employee.boss.mega-boss'));
        return;
    }
    http.get(`http://gsb.devel.e-paths.com/boss/${encodeURIComponent(entityName)}`, (res) => {
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
                let employee = JSON.parse(rawData);
                console.log(employee);
                let photo = {
                    contentType: 'image/png',
                    contentUrl: employee.pic
                };
                let choices = ['choices.employee.email', 'choices.employee.call'];
                let confirmKeyboard = new bot_core_1.BotBuilderExt.Keyboard(session).buttons(choices.map(choice => bot_core_1.BotBuilder.CardAction.imBack(session, session.gettext(choice), choice)));
                let info = `${employee.fullname.replace(/\b\w/g, function (l) { return l.toUpperCase(); }) || ''}\n${employee.title || ''}\n${employee.location || ''}\n${employee.email || ''}\n${employee.phone || ''}`;
                let suggestions = new bot_core_1.BotBuilderExt.Keyboard(session).buttons([card(session, 'suggestion.employee.boss', employee.fullname.replace(/\b\w/g, function (l) { return l.toUpperCase(); }))]).toAttachment();
                let message = new bot_core_1.BotBuilder.Message(session)
                    .text(info)
                    .addAttachment(confirmKeyboard)
                    .sourceEvent({
                    directline: {
                        componentType: 'confirm',
                        image: employee.pic,
                        suggestions: suggestions
                    }
                });
                let options = {
                    yesNoChoices: choices
                };
                session.send(session.gettext('employee.boss.moto'));
                session.endDialog(message, options);
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
function card(session, msgidPrefix, name) {
    return bot_core_1.BotBuilder.CardAction.imBack(session, session.gettext(msgidPrefix + '.value', name), session.gettext(msgidPrefix + '.title'));
}
//# sourceMappingURL=laura.intent.employee.boss.js.map