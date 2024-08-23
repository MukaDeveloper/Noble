import { Client, CommandInteraction } from "discord.js";
// import { Commands } from "../../commands/commands-index";
import { errorsHandler } from "../../shared/base-component";
import { commandCollection } from "../../shared/utils/collections";

export default {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction, client: Client) {
    if (interaction.isChatInputCommand()) {
      const command = commandCollection.get(interaction?.commandName!);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error: any) {
        console.error(errorsHandler(client, error));
      }
    }
  },
};
