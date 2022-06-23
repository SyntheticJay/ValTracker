import { ValorantTracker } from '../index';

class ValorantAPIHandler {
  private readonly bot!: ValorantTracker;

  constructor(bot: ValorantTracker) {
     this.bot = bot;
  }
}

export { ValorantAPIHandler };
