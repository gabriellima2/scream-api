import { GenericScrapingAdapter } from "@/domain/adapters";
import { makeHttpClientImpl } from "./make-http-client-impl";
import { ScrapingImpl } from "@/infra/gateways";

export const makeScrapingImpl = <T extends object>(
	scraping: GenericScrapingAdapter<T>
) => new ScrapingImpl(makeHttpClientImpl(), scraping);
