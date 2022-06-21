import { ValorantTracker } from '../index';
import { ICommand, ICommandContext } from '../types';
import { CustomEmbed } from '../index';
import { Server } from 'guilded.ts';

export const command: ICommand = {
	name: 'settings',
	description: 'Config Valorant Tracker for your server',
	usage: 'settings <config> <value> (leave blank for help)',
	aliases: ['p'],
	handler: async (bot: ValorantTracker, context: ICommandContext): Promise<void> => {
		const key = context.args[0];

		if (!key) {
			return await bot.getCommandHandler().sendEmbed(context.message, [
				new CustomEmbed().setTitle('Server Settings').setFields([
					{
						name: 'Prefix',
						value: `${context.config.prefix}settings prefix <value>`,
					},
					{
						name: 'Patch Notes',
						value: `${context.config.prefix}settings patchnotes <channelID or mention>`,
					},
					{
						name: 'Region',
						value: `${context.config.prefix}settings region <region>`,
					},
				]),
			]);
		}

		let value = context.args[1];

		if (!value) {
			return await bot.getCommandHandler().sendMessage(context.message, 'Please specify a value!', 'FAIL');
		}

		if (key == 'prefix') {
			if (value.length > 3 && value != 'default') {
				return await bot
					.getCommandHandler()
					.sendMessage(context.message, 'Prefix must be less than 3 characters!', 'FAIL');
			}

			context.config.prefix = value == 'default' ? bot.getConfig().defaultPrefix : value;
			await bot
				.getDatabaseHandler()
				.updateServerConfiguration(context.config)
				.catch(async (err) => {
					bot
						.getLogger()
						.error(new Error(`Error updating ${key} (${value}) for server ID ${context.server.id}: ${err}`));
					await bot
						.getCommandHandler()
						.sendMessage(
							context.message,
							'There was an error changing this setting. **this has been logged**.',
							'FAIL',
						);
				})
				.then(async () => {
					return await bot
						.getCommandHandler()
						.sendMessage(context.message, `Prefix for this server has been changed to ${value}`, 'SUCCESS');
				});
		}

		if (key == 'patchnotes') {
			if (context.message.mentions?.channels && context.message.mentions.channels.length > 0) {
				value = context.message.mentions.channels[0].id;
			}

			bot.channels
				.fetch(value)
				.catch(async () => {
					return await bot.getCommandHandler().sendMessage(context.message, 'Invalid channel ID!', 'FAIL');
				})
				.then(async (channel) => {
					if (channel != undefined) {
						context.config.patch_notes = channel.id;

						await bot
							.getDatabaseHandler()
							.updateServerConfiguration(context.config)
							.catch(async (err) => {
								bot
									.getLogger()
									.error(new Error(`Error updating ${key} (${value}) for server ID ${context.server.id}: ${err}`));
								await bot
									.getCommandHandler()
									.sendMessage(
										context.message,
										'There was an error changing this setting. **this has been logged**.',
										'FAIL',
									);
							})
							.then(async () => {
								return await bot
									.getCommandHandler()
									.sendMessage(context.message, `Patch Notes for this server has been changed to ${value}`, 'SUCCESS');
							});
					}
				});
		}

		if (key == 'region') {
			const validRegions = [
				'en-us',
				'en-gb',
				'de-de',
				'es-es',
				'fr-fr',
				'it-it',
				'ru-ru',
				'tr-tr',
				'es-mx',
				'ja-jp',
				'ko-kr',
				'pt-br',
				'vi-vn',
			];

			if (!validRegions.includes(value)) {
				const append = '`' + validRegions.join(', ') + '`';
				return await bot
					.getCommandHandler()
					.sendMessage(context.message, `Invalid Region! Please select from the following: ${append}`, 'FAIL');
			}

			context.config.region = value;

			await bot
				.getDatabaseHandler()
				.updateServerConfiguration(context.config)
				.catch(async (err) => {
					bot
						.getLogger()
						.error(new Error(`Error updating ${key} (${value}) for server ID ${context.server.id}: ${err}`));
					await bot
						.getCommandHandler()
						.sendMessage(
							context.message,
							'There was an error changing this setting. **this has been logged**.',
							'FAIL',
						);
				})
				.then(async () => {
					return await bot
						.getCommandHandler()
						.sendMessage(context.message, `Region for this server has been changed to ${value}`, 'SUCCESS');
				});
		}
	},
};
