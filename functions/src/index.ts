const Telegraf = require('telegraf')
// const Markup = require("telegraf/markup");
const functions = require('firebase-functions')

const bot = new Telegraf()

// bot.start(ctx => {
//   ctx.reply(
//     `How can I help you, ${ctx.from.first_name}?`,
//     Markup.inlineKeyboard([
//       Markup.callbackButton("Oh Florida Man, what have you done this time?", "FMAN_DONE"),
//     ]).extra()
//   );
// });

bot.start((ctx) => ctx.reply('Привет!'))
bot.command('/start', (ctx) => ctx.reply('Доброго времени суток.'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('эт стикер'))
bot.hears('yo', ({ reply }) => reply('Yo!'))

exports.bot = functions.https.onRequest((req, res) => bot.handleUpdate(req.body, res))
