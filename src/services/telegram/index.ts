import TelegramBot from "node-telegram-bot-api";

import { ENVVARIABLES } from "@/env-variables";

const { TELEGRAM_BOT_TOKEN } = ENVVARIABLES;

let bot: TelegramBot | null = null;

export const newBot = async (): Promise<void> => {
    try {
        bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, { polling: true });

        bot!.on('message', (msg) => {
            const chatId = msg.chat.id;
        
        bot?.sendMessage(chatId, '1111');
        });

    } catch (error) {
        console.error('Error initializing Telegram bot:', error);
    }
};
