import TelegramBot from "node-telegram-bot-api";

import { ENVVARIABLES } from "@/env-variables";
import { userModel } from "@/db/users";

const { TELEGRAM_BOT_TOKEN } = ENVVARIABLES;

export const newBot = async (): Promise<void> => {
    try {
        const bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, { polling: true });

        bot?.on('message', async (msg) => {            
            const chatId = msg.chat.id;    
            
            if (msg.text) {
                const user = await userModel.findOne({
                    email: msg.text,
                });

                if (user) {
                    bot?.sendMessage(chatId, 'success');
                    user.activateToken = 'activated';
                    user.save()

                    return;
                } 
            }

        bot?.sendMessage(chatId, 'send your email');
            return;
        });

    } catch (error) {
        console.error('Error initializing Telegram bot:', error);
    }
};
