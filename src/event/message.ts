import { IEvent, IServerConfiguration } from "../types";
import { ValorantTracker } from "../index";
import { Message } from "guilded.ts";

export const event: IEvent = {
  name: "messageCreate",
  once: false,
  handler: async (bot: ValorantTracker, message: Message): Promise<void> => {
    await bot
      .getDatabaseHandler()
      .getServerConfiguration(message.server)
      .catch(async (error) => {
        bot
          .getLogger()
          .error(
            new Error(
              `Failed to fetch server configuration for server ID ${message.server.id}: ${error}`
            )
          );

        return await bot
          .getCommandHandler()
          .sendMessage(
            message,
            "There was an error fetching configurations for your server. **This has been logged.**",
            "FAIL"
          );
      })
      .then(async (result) => {
        result = <IServerConfiguration>result;

        if (message.content == "valtracker:prefix") {
          return await bot
            .getCommandHandler()
            .sendMessage(
              message,
              `The prefix for this server is '${result.prefix}'`,
              "INFO"
            );
        }
        bot
          .getCommandHandler()
          .run(message, result)
          .catch(async (error) => {
            bot.getLogger().error(
              new Error(`
                Error in running command: ${error}
            `)
            );

            return await message.reply(
              "Sorry, there was an error. Please try again later. **This has been logged.**"
            );
          });
      });
  },
};
