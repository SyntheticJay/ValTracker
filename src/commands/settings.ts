import { ValorantTracker } from "../index";
import { ICommand, ICommandContext } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "settings",
  description: "Config Valorant Tracker for your server",
  usage: "settings <config> <value> (leave blank for help)",
  aliases: ["p"],
  handler: async (
    bot: ValorantTracker,
    context: ICommandContext
  ): Promise<void> => {
    const key = context.args[0];

    if (!key) {
      return await bot.getCommandHandler().sendEmbed(context.message, [
        new CustomEmbed().setTitle("Server Settings").setFields([
          {
            name: "Prefix",
            value: `${context.config.prefix}settings prefix <value>`,
          },
          {
            name: "Patch Notes",
            value: `${context.config.prefix}settings patchnotes <channelID>`,
          },
        ]),
      ]);
    }
  },
};
