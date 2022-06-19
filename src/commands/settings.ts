import { Message } from "guilded.ts";
import { ValorantTracker } from "../index";
import { ICommand, IServerConfiguration } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "settings",
  description: "Config Valorant Tracker for your server",
  usage: "settings <config> <value> (leave blank for help)",
  aliases: ["p"],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    serverConfig: IServerConfiguration,
    args: any[]
  ): Promise<void> => {
    const key = args[0];

    if (!key) {
      return await bot.getCommandHandler().sendEmbed(message, [
        new CustomEmbed().setTitle("Server Settings").setFields([
          {
            name: "Prefix",
            value: `${serverConfig.prefix}settings prefix <value>`,
          },
          {
            name: "Patch Notes",
            value: `${serverConfig.prefix}settings patchnotes <channelID>`,
          },
        ]),
      ]);
    }
  },
};
