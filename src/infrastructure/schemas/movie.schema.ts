import { SchemaFactory } from "@nestjs/mongoose";
import { MovieModel } from "../models/movie.model";

export const MovieSchema = SchemaFactory.createForClass(MovieModel);
