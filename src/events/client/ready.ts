import { ActivitiesOptions, ActivityType, Client } from "discord.js";

const activities = [`Em desenvolvimento`];

export default {
  name: "ready",
  once: true,
  async execute(client: Client) {
    let i = 0;
    setInterval(
      () =>
        client.user?.setActivity({
          name: `${activities[i++ % activities.length]}`,
          type: ActivityType.Playing,
        } as ActivitiesOptions),
      5000
    );

    console.log(`Aplicação iniciada como ${client.user?.tag}`);
  },
};
