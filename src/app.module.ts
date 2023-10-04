import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { CharacterModule } from "./infrastructure/modules/character.module";
import { MovieModule } from "./infrastructure/modules/movie.module";

@Module({
	imports: [
		MovieModule,
		CharacterModule,
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get<string>("MONGO_URI"),
				dbName: config.get<string>("DB_NAME"),
				auth: {
					username: config.get<string>("DB_ROOT_USERNAME"),
					password: config.get<string>("DB_ROOT_PASSWORD"),
				},
			}),
		}),
	],
})
export class AppModule {}
