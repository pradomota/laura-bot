"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const http = require("http");
exports.default = [
    describeIssue,
    confirmIssue,
    showIssueSummary
];
function describeIssue(session, args, next) {
    bot_core_1.BotBuilderExt.Context.set(session, 'Topic', 'Issue');
    return bot_core_1.BotBuilder.Prompts.text(session, 'issues.create.question');
}
function confirmIssue(session, result, next) {
    if (result.resumed === bot_core_1.BotBuilder.ResumeReason.completed && result.response) {
        session.dialogData.issueText = result.response;
        session.send('issues.create.confirm.main');
        let yesNoChoices = ['issues.create.accept', 'issues.create.cancel'];
        let confirmKeyboard = new bot_core_1.BotBuilderExt.Keyboard(session).buttons(yesNoChoices.map(choice => bot_core_1.BotBuilder.CardAction.imBack(session, session.gettext(choice), choice)));
        let message = new bot_core_1.BotBuilder.Message(session)
            .text(result.response)
            .addAttachment(confirmKeyboard)
            .sourceEvent({
            directline: {
                componentType: 'confirm'
            }
        });
        let options = {
            yesNoChoices: yesNoChoices
        };
        return bot_core_1.BotBuilderExt.Prompts.confirm(session, message, options);
    }
    else {
        session.endDialog('core.cancel');
    }
}
function showIssueSummary(session, result, next) {
    if (result.resumed === bot_core_1.BotBuilder.ResumeReason.completed && result.response) {
        http.get(`http://gsb.devel.e-paths.com/issue/${encodeURIComponent(session.dialogData.issueText)}`, (res) => {
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
                    session.endDialog('issues.create.newissue.detail');
                }
                catch (e) {
                    console.log(e.message);
                }
            });
        }).on('error', (e) => {
            session.send('issues.create.failed');
            var result = {
                resumed: bot_core_1.BotBuilder.ResumeReason.notCompleted,
                error: e
            };
            session.endDialogWithResult(result);
        });
    }
}
//# sourceMappingURL=laura.intent.issue.create.js.map