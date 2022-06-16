import { ValorantTracker } from ".";
import { ClientEvents } from 'guilded.ts';

interface IEvent {
    name: keyof ClientEvents;
    once: boolean;
    handler: (bot: ValorantTracker, ...args: unknown[]) => Promise<void>;
}

export { IEvent };