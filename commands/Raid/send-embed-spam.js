const { ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder, EmbedBuilder  } = require('discord.js');
const configfile = require('../../config.json');
const { createDatabase } = require('whisky.db');
const db = new createDatabase();

module.exports = {
    data: 
        new SlashCommandBuilder()
      .setName('send-embed-spam')
      .setDescription('Kanala girilen mesajı her butona bastığınızda 5 defa embed olarak atar.')
      .setIntegrationTypes(['GuildInstall', 'UserInstall'])
      .setContexts(["Guild"])
      .addStringOption(option =>
		option.setName('text')
			.setDescription('Gönderilecek mesaj.').setRequired(true))
            .addStringOption(option =>
                option.setName('title')
                    .setDescription('Gönderilecek embed mesajının başlığı.').setRequired(true))
                    .addBooleanOption(option =>
                        option.setName('everyone')
                            .setDescription('Embedi atarken everyone rolünü etiketleyecek mi?').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id != configfile["ownerId"]) return interaction.reply({ content: "Bu komutu kullanamazsın. :x:", ephemeral: true });

        const gonderBtn = new ButtonBuilder()
			.setCustomId(`sse_${interaction.user.id}`)
			.setLabel('Gönder')
			.setStyle(ButtonStyle.Success);

        const gonderRow = new ActionRowBuilder()
		.addComponents(gonderBtn);

        const embed = new EmbedBuilder()
        .setTitle(`${interaction.options.getString('title')}`)
        .setDescription(`${interaction.options.getString('text')}`)
        .setTimestamp()
        .setFooter({ text: "Whisky Lorean" })
        .setColor("#ff0000")

        db.set(`sonSpamEmbed_${interaction.user.id}`, { text: interaction.options.getString("text"), title: interaction.options.getString("title"), everyone: interaction.options.getBoolean("everyone") });
        await interaction.reply({ content: `**Spam Yönetim** \n:speech_balloon: Gönderilecek Mesaj:`, embeds: [embed], components: [gonderRow], ephemeral: true });
    }
};