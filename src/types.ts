import { ValorantTracker } from "./index";
import { ClientEvents, Message } from "guilded.ts";
import { RowDataPacket } from "mysql2";

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
    serverPrefix: IServerConfiguration,
    ...args: any[]
  ) => Promise<void>;
}

interface ICooldown {
  userID: string;
  time: number;
}

interface IServerConfiguration extends RowDataPacket {
  serverID: string;
  prefix: string;
  patchNotesID: string;
}

enum MessageType {
  INFO = "",
  SUCCESS = "",
  FAIL = "",
}

export { IEvent, ICommand, ICooldown, IServerConfiguration, MessageType };
