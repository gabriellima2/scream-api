import mongoose from "mongoose";

import { makeCharacterServiceImpl } from "../factories/services/make-character-service-impl";
import { makeMovieServiceImpl } from "../factories/services/make-movie-service-impl";

import { DbHasNotConnection } from "@/core/domain/exceptions/db-has-not-connection.exception";

interface Config {
	connection: typeof mongoose | undefined;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	populate(): Promise<void>;
}

export const dbConfig: Config = {
	connection: undefined,
	async connect() {
		if (this.connection) throw new DbHasNotConnection();
		try {
			this.connection = await mongoose.connect(process.env.MONGO_URI, {
				dbName: process.env.DB_NAME,
				auth: {
					username: process.env.DB_USER,
					password: process.env.DB_PASSWORD,
				},
			});
		} catch (err) {
			console.error(err.message);
		}
	},
	async disconnect() {
		if (!this.connection) throw new DbHasNotConnection();
		try {
			await this.connection.close();
			this.connection = undefined;
		} catch (err) {
			console.error(err.message);
		}
	},
	async populate() {
		if (!this.connection) throw new DbHasNotConnection();
		try {
			await makeCharacterServiceImpl().getCharacters();
			await makeMovieServiceImpl().getMovies();
		} catch (err) {
			console.error(err.message);
		}
	},
};
