import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { deployCommands, eventsHandler } from "./shared/deployer";
import config from "./data/config";

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.MessageContent,
];
const client = new Client({ intents, partials: [Partials.Channel] });

deployCommands();
eventsHandler(client);

client.login(config.CLIENT_TOKEN);
