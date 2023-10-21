import { NestFactory } from "@nestjs/core";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { AppModule } from "./app.module";

import { rateLimitConfig } from "./infrastructure/configs/rate-limit.config";
import { helmetConfig } from "./infrastructure/configs/helmet.config";
import { corsConfig } from "./infrastructure/configs/cors.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet(helmetConfig));
	app.use(rateLimit(rateLimitConfig));
	app.enableCors(corsConfig);
	await app.listen(3000);
}
bootstrap();
