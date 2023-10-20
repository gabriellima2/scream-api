import type {
	CorsOptions,
	CorsOptionsDelegate,
} from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsConfig: CorsOptions | CorsOptionsDelegate<unknown> = {
	origin: false,
	methods: "GET",
};
