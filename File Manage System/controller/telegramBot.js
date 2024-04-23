const TelegramBot = require("node-telegram-bot-api");
// const fs = require('fs');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
// const bot = new TelegramBot('7151930228:AAET7jtgpGFlU43ddIuJeyCUz9PXY0kMyCk', { polling: false });

const token = "7151930228:AAET7jtgpGFlU43ddIuJeyCUz9PXY0kMyCk";

// Replace with the chat ID where you want to receive alerts
const chatId = "-4120634663";

const bot = new TelegramBot(token, { polling: true });

function sendAlert(caption) {
  try {
    bot.sendMessage(chatId, caption).then(res => {
        console.log("resresresresres",res);
      })

    console.log("Alert sent successfully!");
  } catch (error) {
    console.error("Error sending alert:", error);
  }
}

module.exports = sendAlert;
