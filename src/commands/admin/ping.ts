import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

export const execute = async (interaction: CommandInteraction, client: Client) => {
  return await interaction.reply("Pong!");
}
