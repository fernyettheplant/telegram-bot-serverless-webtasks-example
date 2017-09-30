'use strict';

module.exports = async (context, cb) => {
    const TelegramBot = require('node-telegram-bot-api');
    const axios = require('axios');

    const token = "427518409:AAFeF2tg71RG_MiNRxB4eBNMms56iTGp-pM";
    const bot = new TelegramBot(token);
    const tellDadJokesUrl = 'https://icanhazdadjoke.com/';

    const chatId = context.body.message.chat.id;
    const message = context.body.message.text;

    if (message.match(/\/start/)) {
        const out = bot.sendMessage(chatId, 'Welcome to Dad Jokes Bot for Telegram!');
        return cb(null, out);
    }

    if (message.match(/\/tellmeajoke/)) {
        try {
            const response = await axios.get(tellDadJokesUrl, { headers: { "Accept": "text/plain" } });            
        } catch (error) {
            const out = bot.sendMessage(chatId, "Sorry son, an error has occurred!");
            return cb(null, out);
        }

        const joke = response.data
        const out = bot.sendMessage(chatId, joke);
        return cb(null, out);
    }

    const out = bot.sendMessage(chatId, 'Sorry, I didn\'t understand');
    return cb(null, out);
};
