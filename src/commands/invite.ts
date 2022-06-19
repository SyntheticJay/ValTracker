import { Message } from "guilded.ts";
import { ValorantTracker } from "../index";
import { ICommand, IServerConfiguration } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "invite",
  description: "Invite Valorant Tracker to your community",
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
       [Click here to invite **Valorant Tracker** to your community.](${
         bot.getConfig().invite
       })
      `),
    ]);
  },
};
