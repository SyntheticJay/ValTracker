import { Message } from "guilded.ts";
import { ValorantTracker } from "../index";
import { ICommand } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "help",
  description: "Speaks for itself...",
  usage: "",
  aliases: ["h"],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    prefix: string,
    args: any[]
  ): Promise<void> => {
    const embed = new CustomEmbed().setTitle("Help");

    const commands = bot
      .getCommandHandler()
      .getCommands()
      .filter((command) => command.name != "help");

    commands.forEach((command) => {
      embed.addField(
        `${prefix}${command.name}`,
        `${command.description} | **${
          command.usage == "" ? command.name : `${prefix}${command.usage}`
        }**`
      );
    });

    await bot.getCommandHandler().sendEmbed(message, [embed]);
  },
};
