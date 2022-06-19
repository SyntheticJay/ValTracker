import { IEvent } from "../types";
import { ValorantTracker } from "..";

export const event: IEvent = {
  name: "ready",
  once: true,
  handler: async (bot: ValorantTracker): Promise<void> => {
    bot
      .getLogger()
      .info(
        `Logged in as ${bot.user?.name} | ${bot.servers.cache.size} Servers`
      );
  },
};
