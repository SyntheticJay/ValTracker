import { Message } from "guilded.ts";
import { ValorantTracker } from "../index";
import { ICommand } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "donate",
  description: "Donate to Valorant Tracker's development",
  usage: "",
  aliases: [],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    prefix: string,
    args: any[]
  ): Promise<void> => {
    await bot.getCommandHandler().sendEmbed(message, [
      new CustomEmbed()
        .setTitle("Donate")
        .setDescription(
          "Hey! Thanks for taking the time to even use this command. Valorant Tracker is a free to use service & I will never pressure anyone into donating, that said, if you wouldn't mind donating a cup of coffee that'd be swell!"
        )
        .setFields([
          {
            name: "Paypal",
            value: "[paypal.me](https://paypal.me/nameddeveloper)",
            inline: true,
          },
        ]),
    ]);
  },
};
