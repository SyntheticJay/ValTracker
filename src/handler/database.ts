import { ValorantTracker } from "../index";
import { Server } from "guilded.ts";
import Knex from "knex";
import { IServerConfiguration } from "../types";

class DatabaseHandler {
  private readonly bot!: ValorantTracker;
  private readonly connection;

  constructor(bot: ValorantTracker) {
    this.bot = bot;

    const { host, auth, name } = this.bot.getConfig().database;

    const knex = Knex({
      client: "mysql2",
      connection: {
        host,
        user: auth.user,
        password: auth.pass,
        database: name,
      },
    });

    this.connection = knex;
  }

  /* TODO: A better way of doing this? */
  async getServerConfiguration(
    serverID: string | Server
  ): Promise<IServerConfiguration> {
    return new Promise<IServerConfiguration>((resolve, reject) => {
      let properID = serverID;

      if (serverID instanceof Server) {
        properID = serverID.id;
      }

      this.connection("server_settings")
        .select("*")
        .where({
          server_id: properID,
        })
        .then(async (rows) => {
          if (rows.length == 0) {
            await this.connection
              .raw(
                "INSERT INTO server_settings SET server_id = ?, prefix = ?",
                [properID as string, this.bot.getConfig().defaultPrefix]
              )
              .catch(reject);
          }

          resolve(
            this.connection("server_settings")
              .select("*")
              .where({ server_id: properID })
              .first()
          );
        });
    });
  }

  async updateServerConfiguration(config: IServerConfiguration): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.connection("server_settings")
        .update(config)
        .then(() => resolve())
        .catch(reject);
    });
  }

  async logCommand(serverID: string | Server, userID: string, command: string) {
    let properID = serverID;

    if (serverID instanceof Server) {
      properID = serverID.id;
    }

    return this.connection.raw(
      `
			INSERT INTO commands_executed SET
			server_id = ?,
			user_id = ?,
			command = ?,
			executed_on = NOW()	
		`,
      [properID as string, userID, command]
    );
  }
}

export { DatabaseHandler };
