import { Model } from "mongoose";

import { CharacterRepositoryImpl } from "@/infrastructure/repositories/character.repository.impl";
import { CharacterModel } from "@/infrastructure/models/character.model";

export const makeCharacterRepositoryImpl = () => {
	const model = new Model<CharacterModel>();
	return new CharacterRepositoryImpl(model);
};
