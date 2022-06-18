import { Message } from "guilded.ts";
import { ValorantTracker } from "..";
import { ICommand } from "../types";

export const command: ICommand = {
  name: "prefix",
  description: "Set the prefix for your server.",
  usage: "prefix <prefix (or do not specify for default)>",
  aliases: ["p"],
  handler: async (
    bot: ValorantTracker,
    message: Message,
    args: any[]
  ): Promise<void> => {
    const prefix = args[0] || bot.getConfig().defaultPrefix;

    if (prefix.length > 3) {
      message.reply("The prefix cannot be longer than 3 characters.");
      return;
    }

    bot
      .getDatabaseHandler()
      .setPrefix(message.server, prefix)
      .catch((error) => {
        bot
          .getLogger()
          .error(
            new Error(
              `There was an error setting prefix for server ${message.server.id}: ${error}`
            )
          );
        message.reply(
          `An error occurred while setting the prefix. Please try again later.`
        );
      });

    message.reply(
      `The prefix for **${message.server.raw}** has been set to \`${prefix}\`.`
    );
  },
};
