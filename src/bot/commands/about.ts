import { Message } from "guilded.ts";
import { ValorantTracker } from "..";
import { ICommand } from "../types";
import { CustomEmbed } from "../extends";

export const command: ICommand = {
  name: "about",
  description: "About Valorant Tracker",
  usage: "",
  aliases: [],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    prefix: string,
    args: any[]
  ): Promise<void> => {
    await bot.getCommandHandler().sendEmbed(message, [
      new CustomEmbed().setDescription(`
          Hi! I'm Valorant Tracker, also known as ValoTracker. I'm a Valorant Statistics Tracker for Guilded.
          
          Get started by registering your username#tag now with **${prefix}register (user#tag)**
          Or navigate around with **${prefix}help**
      `),
    ]);
  },
};
