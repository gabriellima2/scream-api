import { SchemaFactory } from "@nestjs/mongoose";
import { MovieModel } from "../models";

export const MovieSchema = SchemaFactory.createForClass(MovieModel);
