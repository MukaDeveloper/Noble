import { Collection } from "discord.js";

const commands = new Collection<any, any>();
const events = new Collection<any, any>();

export class commandCollection {
  static set(param1: any, param2: any) {
    commands.set(param1, param2);
  }

  static get(commandName: string) {
    return commands.get(commandName);
  }
}

export class eventCollection {
  static set(param1: any, param2: any) {
    events.set(param1, param2);
  }

  static get(commandName: string) {
    return events.get(commandName);
  }
}
