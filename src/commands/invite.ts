import { ValorantTracker } from "../index";
import { ICommand, ICommandContext } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "invite",
  description: "Invite Valorant Tracker to your community",
  usage: "",
  aliases: [],
  handler: async (
    bot: ValorantTracker,
    context: ICommandContext
  ): Promise<void> => {
    return await bot.getCommandHandler().sendEmbed(context.message, [
      new CustomEmbed().setDescription(`
       [Click here to invite **Valorant Tracker** to your community.](${
         bot.getConfig().invite
       })
      `),
    ]);
  },
};
