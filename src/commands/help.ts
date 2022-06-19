import { Message } from "guilded.ts";
import { ValorantTracker } from "../index";
import { ICommand, IServerConfiguration } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "help",
  description: "Speaks for itself...",
  usage: "",
  aliases: ["h"],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    serverConfig: IServerConfiguration,
    args: any[]
  ): Promise<void> => {
    const embed = new CustomEmbed().setTitle("Help");

    const commands = bot
      .getCommandHandler()
      .getCommands()
      .filter((command) => command.name != "help");

    commands.forEach((command) => {
      embed.addField(
        `${serverConfig.prefix}${command.name}`,
        `${command.description} | **${
          command.usage == ""
            ? command.name
            : `${serverConfig.prefix}${command.usage}`
        }**`
      );
    });

    return await bot.getCommandHandler().sendEmbed(message, [embed]);
  },
};
