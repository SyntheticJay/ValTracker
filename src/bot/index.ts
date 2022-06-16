import { Client } from 'guilded.ts';
import { Logger } from 'tslog';

class ValorantTracker extends Client {
	private readonly logger!: Logger;

	constructor(logger: Logger) {
		super();
		
		this.logger = logger;
	}

	async run(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			console.log("lol");
		});
	}
}

export { ValorantTracker };