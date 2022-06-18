import { Message } from "guilded.ts";
import { ValorantTracker } from "..";
import { ICommand } from "../types";

export const command: ICommand = {
	name: "test",
	description: "Test command",
	usage: "test",
	aliases: ["t"],
	handler: async(bot: ValorantTracker, message: Message, args: any[]): Promise<void> => {
		message.reply("hi! args: " + args);
	}
}