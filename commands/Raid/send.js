const { ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require('discord.js');
const configfile = require('../../config.json');

module.exports = {
    data: 
        new SlashCommandBuilder()
      .setName('send')
      .setDescription('Kanala girilen mesajı atar.')
      .setIntegrationTypes(['GuildInstall', 'UserInstall'])
      .setContexts(["Guild"])
      .addStringOption(option =>
		option.setName('text')
			.setDescription('Gönderilecek mesaj.').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id != configfile["ownerId"]) return;

        try {
            await interaction.reply({ content: interaction.options.getString("text"), allowedMentions: { parse: ["everyone"] } });
        } catch (error) {
            await interaction.reply({ content: `Hata oluştu :x: => ${error}`, ephemeral: true });
        };
    }
};