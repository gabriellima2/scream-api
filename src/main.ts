import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { rateLimitConfig } from "./infrastructure/configs/rate-limit.config";
import { helmetConfig } from "./infrastructure/configs/helmet.config";
import { corsConfig } from "./infrastructure/configs/cors.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet(helmetConfig));
	app.enableCors(corsConfig);
	app.use(rateLimit(rateLimitConfig));
	await app.listen(3000);
}
bootstrap();
