import { BotBuilder } from '@telefonica/bot-core';

import info from './laura.intent.employee.info';

const plugin = new BotBuilder.Library('employee');

plugin.dialog('laura.intent.employee.info', info);

export default plugin;
