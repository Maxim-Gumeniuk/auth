import TelegramBot from "node-telegram-bot-api";

import { ENVVARIABLES } from "@/env-variables";
import { userModel } from "@/db/users";

const { TELEGRAM_BOT_TOKEN } = ENVVARIABLES;

export let bot: TelegramBot | null = null;

export const newBot = async (): Promise<void> => {
    try {
        bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, { polling: true });

        bot!.on('message', async (msg) => {
            console.log(msg);
            
            const chatId = msg.chat.id;    
            
            if (msg.text) {
                const user = await userModel.findOne({
                    email: msg.text,
                });

                if (user) {
                    bot?.sendMessage(chatId, 'success');
                    user.randomNumber = 'active';
                    user.save()

                    return;
                }
            console.log(user);
            }

        bot?.sendMessage(chatId, 'write email');
        });

    } catch (error) {
        console.error('Error initializing Telegram bot:', error);
    }
};
