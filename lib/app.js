"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const bot_core_1 = require("@telefonica/bot-core");
let bot = new bot_core_1.Bot({
    modelMapSet: [
        { 'es-es': process.env.LUIS_MODEL__LAURA__ES_ES }
    ],
    plugins: [
        path.join(__dirname, 'plugins', 'notes'),
        path.join(__dirname, 'plugins', 'bot-plugin-greeting')
    ],
    localizerSettings: {
        botLocalePath: path.join(__dirname, '..', 'locale'),
        defaultLocale: process.env.BOT_DEFAULT_LOCALE || 'es-es'
    }
});
let startup = new bot_core_1.Startup();
if (process.env.NODE_ENV === 'development') {
    let runner = new bot_core_1.BotConsoleRunner({
        bot
    });
    startup.use(runner);
}
else {
    let runner = new bot_core_1.BotServerRunner({
        bot,
        port: parseInt(process.env.PORT, 10) || 8080,
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    });
    startup.use(runner);
}
startup.bootstrap('laura-bot');
//# sourceMappingURL=app.js.map