const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const configfile = require('../config.json');

const clientId = configfile["clientId"]; 

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                if (command.data instanceof SlashCommandBuilder) {
                    client.commandArray.push(command.data.toJSON());
                } else {
                    client.commandArray.push(command.data);
                }
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(configfile["token"]);

        (async () => {
            try {
                console.log('Slash komutları yükleniyor..');

                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );

                console.log('Slash komutları başarıyla yüklendi!');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};