import { Client, REST, Routes } from "discord.js";
import config from "../data/config";
import { readdirSync } from "fs";
import * as path from "path";
import { commandCollection } from "./utils/collections";

// const commandsData = Commands.map((command) => command.data.toJSON());
const commandsArray: any[] = [];

export async function deployCommands() {
  const cFolder = readdirSync(path.join(__dirname, "../commands"));
  for (const folder of cFolder) {
    const cFiles = readdirSync(
      path.join(__dirname, `../commands/${folder}`)
    ).filter((file) => file.endsWith(".js"));
    for (const file of cFiles) {
      const command = require(path.join(`../commands/${folder}/${file}`));
      commandsArray.push(command.data.toJSON());
      commandCollection.set(command.data.name, command);
    }
  }

  const rest = new REST({ version: "10" }).setToken(config.CLIENT_TOKEN);
  try {
    console.log("Começando a carregar comandos de aplicação (/).");

    await rest.put(Routes.applicationCommands(config?.CLIENT_ID!), {
      body: commandsArray,
    });

    console.log("Carregamento de comandos de aplicação concluído (/).");
  } catch (error) {
    console.error(error);
  }
}

export function eventsHandler(client: Client) {
  const eFolder = readdirSync(path.join(__dirname, "../events"));
  for (const folder of eFolder) {
    const eFiles = readdirSync(
      path.join(__dirname, `../events/${folder}`)
    ).filter((file) => file.endsWith(".js"));
    switch (folder) {
      case "client":
        for (const file of eFiles) {
          const event = require(path.join(
            `../events/${folder}/${file}`
          )).default;
          if (event.once) {
            client.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          } else {
            client.on(event.name, (...args) => event.execute(...args, client));
          }
        }
        break;
    }
  }
}
