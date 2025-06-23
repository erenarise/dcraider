const { ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder  } = require('discord.js');
const configfile = require('../../config.json');
const { createDatabase } = require('whisky.db');
const db = new createDatabase();

module.exports = {
    data: 
        new SlashCommandBuilder()
      .setName('send-spam')
      .setDescription('Kanala girilen mesajı her butona bastığınızda 5 defa atar.')
      .setIntegrationTypes(['GuildInstall', 'UserInstall'])
      .setContexts(["Guild"])
      .addStringOption(option =>
		option.setName('text')
			.setDescription('Gönderilecek mesaj.').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id != configfile["ownerId"]) return interaction.reply({ content: "Bu komutu kullanamazsın. :x:", ephemeral: true });

        const gonderBtn = new ButtonBuilder()
			.setCustomId(`ss_${interaction.user.id}`)
			.setLabel('Gönder')
			.setStyle(ButtonStyle.Success);

        const gonderRow = new ActionRowBuilder()
		.addComponents(gonderBtn);

        db.set(`sonSpam_${interaction.user.id}`, interaction.options.getString("text"));
        await interaction.reply({ content: `**Spam Yönetim** \n:speech_balloon: Gönderilecek Mesaj: ${interaction.options.getString("text")}`, components: [gonderRow], ephemeral: true });
    }
};