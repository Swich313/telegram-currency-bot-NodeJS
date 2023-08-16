const {Telegraf} = require("telegraf");
const axios = require("axios");
const cc = require("currency-codes");

require("dotenv").config();

const token = process.env.HTTP_API_TOKEN;
console.log({token})

const bot = new Telegraf(token);

bot.start((ctx) => {
    return ctx.reply('Welcome to Mono Currency Bot!');
});

bot.hears(/^[A-Z]+$/i, async (ctx) => {
    const clientCurrencyCode = ctx.message.text;
    const currency = cc.code(clientCurrencyCode);
    console.log(currency);
    //check for existing currency
    if(!currency){
        return ctx.reply('Invalid Currency Code! (For example enter: USD)');
    }
    try {
        const currencyObj = await axios.get('https://api.monobank.ua/bank/currency');
        return ctx.reply(currencyObj.data[0]);
    } catch (error) {
        return ctx.reply(error);
    }
});



bot.startPolling();
