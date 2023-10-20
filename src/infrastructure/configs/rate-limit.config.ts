import { HttpException } from "@nestjs/common";
import type { Options } from "express-rate-limit";

const TIME_TO_LIMIT_IN_MS = 30 * 60 * 1000; // 30 minutes
const LIMIT_IP_REQUEST_PER_WINDOW = 30;

export const rateLimitConfig: Partial<Options> = {
	windowMs: TIME_TO_LIMIT_IN_MS,
	max: LIMIT_IP_REQUEST_PER_WINDOW,
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: false,
	handler: (req, res, next, options) => {
		throw new HttpException({ message: options.message }, options.statusCode);
	},
};
