import { Message } from "guilded.ts";
import { ValorantTracker } from "../index";
import { ICommand } from "../types";

export const command: ICommand = {
  name: "prefix",
  description: "Set the prefix for your server",
  usage: "prefix <prefix (or do not specify for default)>",
  aliases: ["p"],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    prefix: string,
    args: any[]
  ): Promise<void> => {
    const argument = args[0] || bot.getConfig().defaultPrefix;

    if (argument.length > 3) {
      await bot
        .getCommandHandler()
        .sendMessage(
          message,
          "The prefix cannot be longer than 3 characters.",
          "FAIL"
        );
      return;
    }

    bot
      .getDatabaseHandler()
      .setPrefix(message.server, argument)
      .catch(async (error) => {
        bot
          .getLogger()
          .error(
            new Error(
              `There was an error setting prefix for server ${message.server.id}: ${error}`
            )
          );
        await bot
          .getCommandHandler()
          .sendMessage(
            message,
            `An error occurred while setting the prefix. Please try again later.`,
            "FAIL"
          );
      });

    /* FIXME - server name? */
    await bot
      .getCommandHandler()
      .sendMessage(
        message,
        `The prefix for **${"test"}** has been set to \`${argument}\`.`,
        "INFO"
      );
  },
};
