import { SchemaFactory } from "@nestjs/mongoose";
import { CharacterModel } from "../models/character.model";

export const CharacterSchema = SchemaFactory.createForClass(CharacterModel);
