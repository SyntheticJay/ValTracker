import { Message } from "guilded.ts";
import { ValorantTracker } from "..";
import { ICommand } from "../types";
import { CustomEmbed } from "../embed";

export const command: ICommand = {
  name: "invite",
  description: "Invite Valorant Tracker to your community",
  usage: "",
  aliases: [],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    args: any[]
  ): Promise<void> => {
    await bot.getCommandHandler().sendEmbed(message, [
      new CustomEmbed().setDescription(`
       [Click here to invite **Valorant Tracker** to your community.](${
         bot.getConfig().invite
       })
      `),
    ]);
  },
};
