import { BotBuilder, BotBuilderExt, logger } from '@telefonica/bot-core';


export default [
    describeIssue,
    confirmIssue,
    showIssueSummary
];

function describeIssue(session: BotBuilder.Session, args: any, next: Function) {
    BotBuilderExt.Context.set(session, 'Topic', 'Issue');

    return BotBuilder.Prompts.text(session, 'issues.create.question');
}

function confirmIssue(session: BotBuilder.Session, result: BotBuilder.IDialogResult<string>, next: Function) {
    if (result.resumed === BotBuilder.ResumeReason.completed && result.response) {
        session.dialogData.issueText = result.response;

        session.send('issues.create.confirm.main');

        let yesNoChoices = ['issues.create.accept', 'issues.create.cancel'];
        let confirmKeyboard = new BotBuilderExt.Keyboard(session).buttons(
            yesNoChoices.map(choice =>
                BotBuilder.CardAction.imBack(
                    session,
                    session.gettext(choice),
                    choice
                ))
        );

        let message = new BotBuilder.Message(session)
            .text(result.response)
            .addAttachment(confirmKeyboard)
            .sourceEvent({
                directline: {
                    componentType: 'confirm',
                    image: 'https://staticresources.os-eu-mad-1.instantservers.telefonica.com/yot/ic_issue.png'
                }
            });

        let options: BotBuilderExt.IPromptConfirmOptions = {
            yesNoChoices: yesNoChoices
        };
        return BotBuilderExt.Prompts.confirm(session, message, options);
    } else {
        session.endDialog('core.cancel');
    }
}

function showIssueSummary(session: BotBuilder.Session, result: BotBuilderExt.IPromptConfirmResult, next: any) {
    if (result.resumed === BotBuilder.ResumeReason.completed && result.response) {
        let context: Context = {
            userId: session.userData.msisdn
        };

        issueService.createIssue(context, session.dialogData.issueText)
            .then((data) => {
                session.send(session.gettext('issues.create.newissue.main', data.issue_id));
                session.endDialog('issues.create.newissue.detail');
            })
            .catch((err: Error) => {
                logger.error(err, 'Request to FPA failed');
                session.send('issues.create.failed');
                var result = {
                    resumed: BotBuilder.ResumeReason.notCompleted,
                    error: err
                };
                session.endDialogWithResult(result);
            });
    } else if (result.resumed === BotBuilder.ResumeReason.canceled && result.intent) {
        session.replaceDialog(result.intent, {entities: result.entities, intent: result.intent});
    } else {
        session.endDialog('core.cancel');
    }
}
