import { ValorantTracker } from "../index";
import { ICommand, ICommandContext } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "about",
  description: "About Valorant Tracker",
  usage: "",
  aliases: [],
  handler: async (
    bot: ValorantTracker,
    context: ICommandContext
  ): Promise<void> => {
    return await bot.getCommandHandler().sendEmbed(context.message, [
      new CustomEmbed().setDescription(`
          Hi! I'm Valorant Tracker, also known as ValoTracker. I'm a Valorant Statistics Tracker for Guilded.
          
          Get started by registering your username#tag now with **${context.config.prefix}register (user#tag)**
          Or navigate around with **${context.config.prefix}help**
      `),
    ]);
  },
};
