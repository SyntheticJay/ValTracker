import { ValorantTracker } from ".";
import { ClientEvents, Message } from "guilded.ts";

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
  cooldown?: number;
  handler: (
    bot: ValorantTracker,
    message: Message,
    serverPrefix: string,
    ...args: any[]
  ) => Promise<void>;
}

interface ICooldown {
  userID: string;
  time: number;
}

enum MessageType {
  INFO = "",
  SUCCESS = "",
  FAIL = "",
}

export { IEvent, ICommand, ICooldown, MessageType };
