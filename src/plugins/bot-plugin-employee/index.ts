import { BotBuilder } from '@telefonica/bot-core';

import info from './laura.intent.employee.info';
import group from './laura.intent.employee.group';
import boss from './laura.intent.employee.boss';

const plugin = new BotBuilder.Library('employee');

plugin.dialog('laura.intent.employee.info', info);
plugin.dialog('laura.intent.employee.group', group);
plugin.dialog('laura.intent.employee.boss', boss);

export default plugin;
