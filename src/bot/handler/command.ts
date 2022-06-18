import { Message } from "guilded.ts";
import { ValorantTracker } from "..";
import { ICommand } from '../types';
import { readdirSync } from 'fs';
import { join } from 'path';

class CommandHandler {
	private readonly bot!: ValorantTracker;
	private readonly commands!: ICommand[];

	constructor(bot: ValorantTracker) {
		this.bot = bot;
		this.commands = [];
	}

	async register(): Promise<void> {
		const files = readdirSync(join(__dirname, "../commands")).filter(file => file.endsWith(".ts"));

		files.forEach(file => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const { command }: { command: ICommand } = require(join(__dirname, '../commands', file));
			this.commands.push(command);

			this.bot.getLogger().info(`Registered command ${command.name}`);
		});
	}

	public async run(message: Message, prefix: string): Promise<void> {
		if(!message.content?.startsWith(prefix)) return;
	
		const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
		const commandName: string = args.shift()?.toLowerCase() || "";

		const command = this.commands.find(cmd => cmd.name === commandName || cmd.aliases.includes(commandName));

		if(command) {
			command.handler(this.bot, message, args).catch(error => {
				this.bot.getLogger().error(new Error(`
					Error in running command ${command.name}: ${error}
				`));

				message.reply("Sorry, there was an error. Please try again later. **This has been logged.**");
			});
		}
    }
}

export { CommandHandler };