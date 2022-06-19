import { ValorantTracker } from "../index";
import { ICommand, ICommandContext } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "help",
  description: "Speaks for itself...",
  usage: "",
  aliases: ["h"],
  handler: async (
    bot: ValorantTracker,
    context: ICommandContext
  ): Promise<void> => {
    const embed = new CustomEmbed().setTitle("Help");

    const commands = bot
      .getCommandHandler()
      .getCommands()
      .filter((command) => command.name != "help");

    commands.forEach((command) => {
      embed.addField(
        `${context.config.prefix}${command.name}`,
        `${command.description} | **${
          command.usage == ""
            ? command.name
            : `${context.config.prefix}${command.usage}`
        }**`
      );
    });

    return await bot.getCommandHandler().sendEmbed(context.message, [embed]);
  },
};
