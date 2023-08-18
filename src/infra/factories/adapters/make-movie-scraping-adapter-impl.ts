import { MovieScrapingAdapterImpl } from "@/infra/adapters";

export const makeMovieScrapingAdapterImpl = () =>
	new MovieScrapingAdapterImpl();
