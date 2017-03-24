import { BotBuilder } from '@telefonica/bot-core';

import issue from './laura.intent.issue.create';

const plugin = new BotBuilder.Library('product');

plugin.dialog('laura.intent.issue.create', issue);

export default plugin;
