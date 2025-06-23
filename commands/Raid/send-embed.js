const { ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const configfile = require('../../config.json');

module.exports = {
    data: 
        new SlashCommandBuilder()
      .setName('send-embed')
      .setDescription('Kanala girilen mesajı embed olarak atar.')
      .setIntegrationTypes(['GuildInstall', 'UserInstall'])
      .setContexts(["Guild"])
      .addStringOption(option =>
		option.setName('text')
			.setDescription('Gönderilecek mesaj.').setRequired(true))
            .addStringOption(option =>
                option.setName('title')
                    .setDescription('Embedin başlık metni.').setRequired(true))
                    .addBooleanOption(option =>
                        option.setName('everyone')
                            .setDescription('Embedi atarken everyone rolünü etiketleyecek mi?').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id != configfile["ownerId"]) return;

        try {
            const ever = interaction.options.getBoolean("everyone");

            const embed = new EmbedBuilder()
            .setTitle(`${interaction.options.getString("title")}`)
            .setDescription(`${interaction.options.getString("text")}`)
            .setTimestamp()
            .setColor("#FF0000")
            .setFooter({ text: "Whisky Lorean" })
            ever ? await interaction.reply({ content: "@everyone", embeds: [embed], allowedMentions: { parse: ["everyone"] } }) : await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: `Hata oluştu :x: => ${error}`, ephemeral: true });
        };
    }
};