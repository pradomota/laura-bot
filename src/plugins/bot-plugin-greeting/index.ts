import { BotBuilder } from '@telefonica/bot-core';

import hello from './laura.intent.seed.hello';
import goodbye from './laura.intent.seed.goodbye';

const plugin = new BotBuilder.Library('seed');

plugin.dialog('laura.intent.seed.hello', hello);
plugin.dialog('laura.intent.seed.goodbye', goodbye);

export default plugin;
