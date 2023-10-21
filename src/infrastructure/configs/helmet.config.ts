import type { HelmetOptions } from "helmet";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const helmetConfig: Readonly<HelmetOptions> = {
	strictTransportSecurity: {
		maxAge: ONE_YEAR_IN_SECONDS,
	},
	frameguard: {
		action: "deny",
	},
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'", "'static.wikia.nocookie.net'"],
			styleSrc: ["'self'", "'unsafe-inline'"],
			imgSrc: ["'self'", "data:", "validator.swagger.io"],
			scriptSrc: ["'self'", "https: 'unsafe-inline'"],
		},
	},
};
