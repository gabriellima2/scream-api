import { CharacterServiceImpl } from "@/infrastructure/services/character.service.impl";

import { makeCharactersNameScraperAdapterImpl } from "../adapters/scrapers/make-characters-name-scraper-adapter-impl";
import { makeCharacterScraperAdapterImpl } from "../adapters/scrapers/make-character-scraper-adapter-impl";
import { makeScraperGatewayAdapterImpl } from "../adapters/gateways/make-scraper-gateway-adapter-impl";
import { makeCharacterRepositoryImpl } from "../repositories/make-character-repository-impl";
import { makePaginationAdapterImpl } from "../adapters/make-pagination-adapter-impl";

import { SOURCE_WEBSITE } from "@/infrastructure/constants/source-website";
import type { CharacterData } from "@/core/domain/entities/character-entity/character.entity";
import type { CharacterScraperGateways } from "@/adapters/gateways/character-scraper-gateways";

export const makeCharacterServiceImpl = () => {
	const repository = makeCharacterRepositoryImpl();
	const scrapers: CharacterScraperGateways = {
		character: makeScraperGatewayAdapterImpl(makeCharacterScraperAdapterImpl()),
		names: makeScraperGatewayAdapterImpl(
			makeCharactersNameScraperAdapterImpl()
		),
	};
	const paginate = makePaginationAdapterImpl<Required<CharacterData>>();
	return new CharacterServiceImpl(
		repository,
		scrapers,
		paginate,
		SOURCE_WEBSITE.CHARACTER
	);
};
