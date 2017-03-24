import { BotBuilder } from '@telefonica/bot-core';

import info from './laura.intent.product.info';

const plugin = new BotBuilder.Library('product');

plugin.dialog('laura.intent.product.info', info);

export default plugin;
