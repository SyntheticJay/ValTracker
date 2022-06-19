import { ValorantTracker } from "../index";
import { readdirSync } from "fs";
import { join } from "path";
import { IEvent } from "../types";
import { ClientEvents } from "guilded.ts";

class EventHandler {
  private readonly bot!: ValorantTracker;

  constructor(bot: ValorantTracker) {
    this.bot = bot;
  }

  public async run(): Promise<void> {
    return new Promise<void>((resolve) => {
      readdirSync(join(__dirname, "../event"))
        .filter((file) => file.endsWith(".ts"))
        .forEach((file) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { event }: { event: IEvent } = require(join(
            __dirname,
            "../event",
            file
          ));

          if (event) {
            const name: keyof ClientEvents = event.name;
            const once: boolean = event.once;

            if (once) {
              this.bot.once(name, (...args: unknown[]) => {
                return event.handler(this.bot, ...args).catch((error) => {
                  this.bot
                    .getLogger()
                    .fatal(
                      new Error(
                        `An error occurred while running event ${name}: ${error.message}`
                      )
                    );
                });
              });
            } else {
              /* event getting called twice? maybe to update some kind of cache, I really don't know. potential FIXME? */
              this.bot.on(name, (...args: unknown[]) => {
                return event.handler(this.bot, ...args).catch((error) => {
                  this.bot
                    .getLogger()
                    .fatal(
                      new Error(
                        `An error occurred while running event ${name}: ${error.message}`
                      )
                    );
                });
              });
            }

            this.bot
              .getLogger()
              .info(
                `Registered ${once ? "one time" : "ongoing"} event ${name}`
              );
          }
        });

      resolve();
    });
  }

  public async reload() {
    return new Promise<void>((resolve, reject) => {
      this.bot.removeAllListeners();
      this.run().catch(reject);
    });
  }
}

export { EventHandler };
