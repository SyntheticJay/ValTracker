import { IEvent } from "../types";
import { ValorantTracker } from "..";
import { Message } from "guilded.ts";

export const event: IEvent = {
    name: "messageCreate",
    once: false,
    handler: async(bot: ValorantTracker, message: Message): Promise<void> => {
		const prefixResult = await bot.getDatabaseHandler().getPrefix(message.server).catch(error => {
			bot.getLogger().error(new Error(`Failed to get prefix for ${message.server.id}: ${error}`));
		});

		bot.getCommandHandler().run(message, prefixResult.prefix || bot.getConfig().defaultPrefix).catch(async error => {
            bot.getLogger().error(new Error(`
                Error in running command: ${error}
            `));

            message.reply("Sorry, there was an error. Please try again later. **This has been logged.**");
        });
    }	
}