import { Message } from "guilded.ts";
import { ValorantTracker } from "../index";
import { ICommand, IServerConfiguration } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "about",
  description: "About Valorant Tracker",
  usage: "",
  aliases: [],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    serverConfig: IServerConfiguration,
    args: any[]
  ): Promise<void> => {
    return await bot.getCommandHandler().sendEmbed(message, [
      new CustomEmbed().setDescription(`
          Hi! I'm Valorant Tracker, also known as ValoTracker. I'm a Valorant Statistics Tracker for Guilded.
          
          Get started by registering your username#tag now with **${serverConfig.prefix}register (user#tag)**
          Or navigate around with **${serverConfig.prefix}help**
      `),
    ]);
  },
};
