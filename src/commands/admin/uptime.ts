import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { errorsHandler, msToDescription } from "../../shared/base-component";

export const data = new SlashCommandBuilder()
  .setName("uptime")
  .setDescription("Time alive!")
  .setNSFW(false)
  .setDMPermission(true)

export async function execute(interaction: CommandInteraction, client: Client) {
  await interaction.deferReply();
  try {
    return interaction.editReply({
      content: `Estou online há ${msToDescription(client.uptime!)}`,
    });
  } catch (error: any) {
    console.error(errorsHandler(client, error));
  }
}
