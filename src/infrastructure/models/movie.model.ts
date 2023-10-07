import { Document } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";

import { MovieData } from "@/core/domain/entities/movie-entity/movie.entity";

@Schema({ collection: "movies" })
export class MovieModel extends Document implements Omit<MovieData, "id"> {
	@Prop({ type: String, required: true })
	name: string;
	@Prop({
		type: String,
		required: false,
	})
	image: string;
	@Prop({
		type: String,
		required: false,
	})
	synopsis: string;
	@Prop({
		type: [String],
		required: false,
	})
	directors: string[];
	@Prop({
		type: [String],
		required: false,
	})
	writers: string[];
	@Prop({
		type: [String],
		required: false,
	})
	producers: string[];
	@Prop({
		type: [String],
		required: false,
	})
	composer: string[];
	@Prop({
		type: String,
		required: false,
	})
	release_date: string;
	@Prop({
		type: String,
		required: false,
	})
	running_time: string;
	@Prop({
		type: String,
		required: false,
	})
	box_office: string;
	@Prop({
		type: [String],
		required: false,
	})
	characters: string[];
}
