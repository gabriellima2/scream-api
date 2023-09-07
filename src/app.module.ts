import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { MovieModule, CharacterModule } from "./infra/modules";

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
