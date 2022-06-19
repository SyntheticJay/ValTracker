import { Message } from "guilded.ts";
import { ValorantTracker } from "..";
import { ICommand, ICooldown, MessageType } from "../types";
import { readdirSync } from "fs";
import { join } from "path";
import { CustomEmbed } from "../";

class CommandHandler {
  private readonly bot!: ValorantTracker;
  private readonly commands!: ICommand[];
  private readonly cooldowns: ICooldown[];

  constructor(bot: ValorantTracker) {
    this.bot = bot;
    this.commands = [];
    this.cooldowns = [];
  }

  async register(): Promise<void> {
    const files = readdirSync(join(__dirname, "../commands")).filter((file) =>
      file.endsWith(".ts")
    );

    files.forEach((file) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { command }: { command: ICommand } = require(join(
        __dirname,
        "../commands",
        file
      ));
      this.commands.push(command);

      this.bot.getLogger().info(`Registered command ${command.name}`);
    });
  }

  public async run(message: Message, prefix: string): Promise<void> {
    if (!message.content?.startsWith(prefix)) return;

    const args: string[] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const commandName: string = args.shift()?.toLowerCase() || "";

    const command = this.commands.find(
      (cmd) => cmd.name === commandName || cmd.aliases.includes(commandName)
    );

    if (command) {
      const authorID = message.authorId;
      const cooldown = this.cooldowns.find((c) => c.userID === authorID);

      if (cooldown) {
        if (Date.now() < cooldown.time) {
          await message.reply(
            `You can use this command again in ${
              (cooldown.time - Date.now()) / 1000
            } seconds.`
          );
          return;
        }

        delete this.cooldowns[this.cooldowns.indexOf(cooldown)];
      }

      this.cooldowns.push({
        userID: authorID,
        time:
          Date.now() +
          (command.cooldown || this.bot.getConfig().defaultCooldown),
      });

      command.handler(this.bot, message, prefix, args).catch(async (error) => {
        this.bot
          .getLogger()
          .error(
            new Error(`Error in running command ${command.name}: ${error}`)
          );

        await message.reply(
          "Sorry, there was an error. Please try again later. **This has been logged.**"
        );
        return;
      });

      this.bot
        .getDatabaseHandler()
        .logCommand(message.server, authorID, command.name)
        .catch((error) => {
          this.bot
            .getLogger()
            .error(
              new Error(`Error in logging command ${command.name}: ${error}`)
            );
        });
    }
  }

  public async sendMessage(
    message: Message,
    content: string,
    type: keyof typeof MessageType
  ): Promise<void> {
    const emoji = MessageType[type];

    await message.channel?.send(`${emoji} | ${content}`);
  }

  public async sendEmbed(message: Message, embed: CustomEmbed[]) {
    await message.channel?.send({
      embeds: embed,
    });
  }

  public getCommands(): ICommand[] {
    return this.commands;
  }
}

export { CommandHandler };
