import { ValorantTracker } from ".";
import { ClientEvents, Message } from 'guilded.ts';

interface IEvent {
    name: keyof ClientEvents;
    once: boolean;
    handler: (bot: ValorantTracker, ...args: any[]) => Promise<void>;
}

interface ICommand {
	name: string;
	aliases: string[];
	description: string;
	usage: string;
	handler: (bot: ValorantTracker, message: Message, ...args: any[]) => Promise<void>;
}

export { IEvent, ICommand };