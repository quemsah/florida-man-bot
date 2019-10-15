const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require("telegraf/markup");
const NewsAPI = require('newsapi');
const NEWS_API_KEY = "dd51a11704a2425fbc80e0971fab26e7";
const TG_KEY = '794825320:AAHYm4zGhBcvlAnqwX-oQ9lJwxKiOlX2Bl0';
const newsapi = new NewsAPI(NEWS_API_KEY);
const bot = new Telegraf(TG_KEY)
const channel = '@florida_man';

bot.hears('Hi', ctx => {
    return ctx.reply('Hello, my Lord! Type "/start" to get started');
});

bot.help(ctx => {
    ctx.telegram.sendMessage(channel, `${ctx.from.first_name} asked for help`);
    ctx.reply('No one can help you.');
    ctx.reply('And you don\'t need anyone\'s help.');
    ctx.reply('But you can try to send me a sticker!');
});

bot.on('sticker', ctx => {
    ctx.telegram.sendMessage(channel, `${ctx.from.first_name} sent a sticker`);
    ctx.reply('I believe that\'s called a sticker.');
});

bot.start(ctx => {
    ctx.telegram.sendMessage(channel, `${ctx.from.first_name} started the conversation`);
    ctx.reply(
        `How can I help you, ${ctx.from.first_name}?`,
        Extra.markup(Markup.inlineKeyboard([
            Markup.callbackButton('Oh Florida Man, what have you done this time?', 'FMAN')
        ]))
    );
});

bot.action('FMAN', ctx => {
    newsapi.v2.everything({
            q: '"+Florida +Man"',
            sortBy: 'relevancy',
        })
        .then(response => {
            ctx.reply(JSON.stringify(response.articles[Math.floor(Math.random() * (20))].title));
            ctx.reply(JSON.stringify(response.articles[Math.floor(Math.random() * (20))].title));
            ctx.reply(JSON.stringify(response.articles[Math.floor(Math.random() * (20))].title));
        })
        .then(a =>
            setTimeout(b => ctx.reply(
                `I repent of my sins.`,
                Extra.markup(Markup.inlineKeyboard([
                    Markup.callbackButton('What else have you done?', 'FMAN')
                ]))
            ), 1000)

        );
});

bot.on('message', (ctx) => {
    let un = ctx.update.message.from.username;
    let fn = ctx.update.message.from.first_name;
    let message = un + '(' + fn + ') : ' + ctx.message.text;
    ctx.telegram.sendMessage(channel, message);
});

// bot.launch()

exports.bot = functions.https.onRequest((req, res) => bot.handleUpdate(req.body, res))