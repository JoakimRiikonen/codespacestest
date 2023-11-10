import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits } from 'discord.js'
import OpenAI from 'openai';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

client.login(process.env.DISCORD_KEY);

client.on("messageCreate", async (message) => {
    console.log(message)

    if (!message?.author.bot && message.content.slice(0, 5) === '!bot ') {
        const userInput = message.content.slice(5);

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: userInput }],
            model: 'gpt-3.5-turbo',
        })

        // console.log(chatCompletion.choices[0].message.content);

        client.channels.cache.get(message.channelId).send(chatCompletion.choices[0].message.content);
    }
})