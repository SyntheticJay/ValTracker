import { ValorantTracker } from "../index";
import { ICommand, ICommandContext } from "../types";
import { CustomEmbed } from "../index";

export const command: ICommand = {
  name: "settings",
  description: "Config Valorant Tracker for your server",
  usage: "settings <config> <value> (leave blank for help)",
  aliases: ["p"],
  handler: async (
    bot: ValorantTracker,
    context: ICommandContext
  ): Promise<void> => {
    const key = context.args[0];

    if (!key) {
      return await bot.getCommandHandler().sendEmbed(context.message, [
        new CustomEmbed().setTitle("Server Settings").setFields([
          {
            name: "Prefix",
            value: `${context.config.prefix}settings prefix <value>`,
          },
          {
            name: "Patch Notes",
            value: `${context.config.prefix}settings patchnotes <channelID>`,
          },
        ]),
      ]);
    }

    const value = context.args[1];

    if (!value) {
      return await bot
        .getCommandHandler()
        .sendMessage(context.message, "Please specify a value!", "FAIL");
    }

    switch (key) {
      case "prefix":
        if (value.length > 3 && value != "default") {
          return await bot
            .getCommandHandler()
            .sendMessage(
              context.message,
              "Prefix must be less than 3 characters!",
              "FAIL"
            );
        }

        context.config.prefix =
          value == "default" ? bot.getConfig().defaultPrefix : value;

        await bot
          .getDatabaseHandler()
          .updateServerConfiguration(context.config)
          .catch(async (err) => {
            bot
              .getLogger()
              .error(
                new Error(
                  `Error updating prefix for server ID ${context.server.id}: ${err}`
                )
              );
            await bot
              .getCommandHandler()
              .sendMessage(
                context.message,
                "There was an error changing your prefix **this has been logged**.",
                "FAIL"
              );
          })
          .then(async () => {
            return await bot
              .getCommandHandler()
              .sendMessage(
                context.message,
                `Prefix for this server has been changed to ${context.config.prefix}`,
                "SUCCESS"
              );
          });
        break;
      case "patchnotes":
        break;
    }
  },
};
