import { ScraperGatewayAdapterImpl } from "@/infrastructure/adapters/gateways/scraper-gateway.adapter.impl";
import { makeHttpGatewayAdapterImpl } from "./make-http-gateway-adapter-impl";

import type { BaseScraperAdapter } from "@/adapters/scrapers/base-scraper.adapter";

export const makeScraperGatewayAdapterImpl = <T extends object>(
	scraper: BaseScraperAdapter<T>
) => {
	const http = makeHttpGatewayAdapterImpl();
	return new ScraperGatewayAdapterImpl(http, scraper);
};
