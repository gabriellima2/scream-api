import { CharacterScrapingAdapterImpl } from "@/infra/adapters";

export const makeCharacterScrapingAdapterImpl = () =>
	new CharacterScrapingAdapterImpl();
