import { Embed } from "guilded.ts";

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

export { CustomEmbed };
