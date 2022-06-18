import { ValorantTracker } from "./bot/index";
import { Logger } from "tslog";

(async () => {
  const logger: Logger = new Logger({
    name: "ValorantTracker",
  });

  const bot: ValorantTracker = new ValorantTracker(logger);

  await bot.run().catch((error) => {
    logger.fatal(
      new Error(`
			An error occurred while running the bot: ${error.message}
		`)
    );
  });

  process.on("unhandledRejection", (error) => {
    logger.fatal(
      new Error(`
			Unhandled Rejection: ${error}
		`)
    );
  });
})();
