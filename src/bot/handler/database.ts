import { ValorantTracker } from "..";
import Knex from 'knex';
import { Server } from "guilded.ts";

class DatabaseHandler {
    private readonly bot!: ValorantTracker;
    private readonly connection;

    constructor(bot: ValorantTracker) {
        this.bot = bot;

        const {
            host, auth, name
        } = this.bot.getConfig().database;
        
        const knex = Knex({
            client: 'mysql',
            connection: {
                host,
                user: auth.user,
                password: auth.pass,
                database: name
            }
        });

        this.connection = knex;
    }

    async getPrefix(serverID: string | Server) {
        let properID = serverID;

        if(serverID instanceof Server) {
            properID = serverID.id;
        }

        return this.connection('prefixes').select('prefix').where('server_id', properID as string).first();
    }

    async setPrefix(serverID: string | Server, prefix: string) {
        let properID = serverID;

        if(serverID instanceof Server) {
            properID = serverID.id;
        }

        return this.connection.raw('INSERT INTO prefixes (server_id, prefix) VALUES (?, ?) ON DUPLICATE KEY UPDATE prefix = ?', [properID as string, prefix, prefix]);
    }
}

export { DatabaseHandler };