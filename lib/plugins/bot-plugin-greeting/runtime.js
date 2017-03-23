"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_core_1 = require("@telefonica/bot-core");
const bot = new bot_core_1.Bot({
    plugins: [__dirname],
    modelMapSet: [
        { 'es-es': process.env.LUIS_MODEL__LAURA__ES_ES }
    ]
});
const runner = new bot_core_1.BotConsoleRunner({ bot });
runner.start()
    .then(() => bot_core_1.logger.info('Bot Ready. Waiting for your input'))
    .catch(err => console.error(err));
//# sourceMappingURL=runtime.js.map