import { Client, Embed } from "guilded.ts";
import { Logger } from "tslog";
import { IConfiguration, config } from "../../config";

import { EventHandler } from "./handler/event";
import { DatabaseHandler } from "./handler/database";
import { CommandHandler } from "./handler/command";

import * as node from "@sentry/node";

class ValorantTracker extends Client {
  private readonly logger!: Logger;

  private readonly config: IConfiguration;
  private readonly databaseHandler!: DatabaseHandler;
  private readonly eventHandler: EventHandler;
  private readonly commandHandler!: CommandHandler;

  constructor(logger: Logger) {
    super();

    this.logger = logger;
    this.config = config;

    this.databaseHandler = new DatabaseHandler(this);
    this.eventHandler = new EventHandler(this);
    this.commandHandler = new CommandHandler(this);
  }

  async run(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      node.init({
        dsn: this.config.sentryDSN,
        tracesSampleRate: 1.0,
      });

      this.commandHandler.register().catch(reject);
      this.eventHandler.run().catch(reject);

      try {
        this.login(this.config.token);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getConfig(): IConfiguration {
    return this.config;
  }

  public getLogger(): Logger {
    return this.logger;
  }

  public getDatabaseHandler(): DatabaseHandler {
    return this.databaseHandler;
  }

  public getEventHandler(): EventHandler {
    return this.eventHandler;
  }

  public getCommandHandler(): CommandHandler {
    return this.commandHandler;
  }
}

class CustomEmbed extends Embed {
  constructor() {
    super();

    this.setFooter(
      `${
        this.footer ? this.footer : ""
      } · valotracker.net (${new Date().toLocaleString()})`
    );

    this.setTitle(`Valorant Tracker ${this.title ? `· ${this.title}` : ""}`);
  }
}

export { ValorantTracker, CustomEmbed };
