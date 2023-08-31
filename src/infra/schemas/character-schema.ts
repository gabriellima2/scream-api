import { SchemaFactory } from "@nestjs/mongoose";
import { CharacterModel } from "../models";

export const CharacterSchema = SchemaFactory.createForClass(CharacterModel);
