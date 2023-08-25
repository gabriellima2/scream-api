import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
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
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
