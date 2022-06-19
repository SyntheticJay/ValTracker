import { ValorantTracker } from '../index';
import { ICommand, ICommandContext } from '../types';
import { CustomEmbed } from '../index';

export const command: ICommand = {
	name: 'help',
	description: 'Speaks for itself...',
	usage: '',
	aliases: ['h'],
	handler: async (bot: ValorantTracker, context: ICommandContext): Promise<void> => {
		const commands = bot
			.getCommandHandler()
			.getCommands()
			.filter((command) => command.name != 'help');

		if (context.args.length == 0) {
			return await bot.getCommandHandler().sendEmbed(context.message, [
				new CustomEmbed().setTitle('Help').setDescription(`
				  There are ${commands.length} commands within Valorant Tracker.
				  Use ${context.config.prefix}help <command> for more information.
				 
				  ${commands.map((command) => command.name)}
      `),
			]);
		}

		const command = commands.find((command) => command.name.toLowerCase() == context.args[0].toLowerCase());

		if (!command) {
			return await bot.getCommandHandler().sendMessage(context.message, 'I could not find that command.', 'FAIL');
		}

		return await bot.getCommandHandler().sendEmbed(context.message, [
			new CustomEmbed().setTitle(command.name).setDescription(`
				  ${command.description}
				  
				  Usage: **${command.usage == '' ? 'No arguments required' : command.usage}**
				`),
		]);
	},
};
