import { Client } from 'guilded.ts';
import { Logger } from 'tslog';
import { IConfiguration, config } from '../../config';

import { EventHandler } from './handler/event';
import { DatabaseHandler } from './handler/database';

import * as node from '@sentry/node';

class ValorantTracker extends Client {
	private readonly logger!: Logger;

	private readonly config: IConfiguration;
	private readonly databaseHandler!: DatabaseHandler;
	private readonly eventHandler: EventHandler;

	constructor(logger: Logger) {
		super();
		
		this.logger = logger;
		this.config = config;

		this.databaseHandler = new DatabaseHandler(this);
		this.eventHandler = new EventHandler(this);
	}

	async run(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			node.init({
				dsn: this.config.sentryDSN,
				tracesSampleRate: 1.0
			});
			
			this.eventHandler.run().catch(reject);

			try {
				this.login(this.config.token);
			}catch(error) {
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
}

export { ValorantTracker };