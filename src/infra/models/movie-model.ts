import { model } from "mongoose";
import { MovieSchema } from "../schemas/movie-schema";

export const MovieModel = model("movie", MovieSchema, "movies");
