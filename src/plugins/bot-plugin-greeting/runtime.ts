import { Bot, BotConsoleRunner, logger } from '@telefonica/bot-core';

const bot = new Bot({
    plugins: [ __dirname ],
    modelMapSet: [
        { 'es-es': process.env.LUIS_MODEL__LAURA__ES_ES }
    ]
});

const runner = new BotConsoleRunner({ bot });

runner.start()
    .then(() => logger.info('Bot Ready. Waiting for your input'))
    .catch(err => console.error(err));
