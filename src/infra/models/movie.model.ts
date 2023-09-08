import { Document, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";

import type { Movie, MovieOverview } from "@/domain/entities";

@Schema({ collection: "movies" })
export class MovieModel extends Document implements Omit<Movie, "id"> {
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
		required: false,
		type: {
			directors: {
				type: MongooseSchema.Types.Mixed,
				required: false,
				validate: {
					validator: function (v) {
						return (
							typeof v === "string" ||
							(Array.isArray(v) && v.every((item) => typeof item === "string"))
						);
					},
					message: (props) =>
						`${props.value} is not a valid value for myField!`,
				},
			},
			writers: {
				type: MongooseSchema.Types.Mixed,
				required: false,
				validate: {
					validator: function (v) {
						return (
							typeof v === "string" ||
							(Array.isArray(v) && v.every((item) => typeof item === "string"))
						);
					},
					message: (props) =>
						`${props.value} is not a valid value for myField!`,
				},
			},
			producers: {
				type: [String],
				required: false,
			},
			composer: {
				type: MongooseSchema.Types.Mixed,
				required: false,
				validate: {
					validator: function (v) {
						return (
							typeof v === "string" ||
							(Array.isArray(v) && v.every((item) => typeof item === "string"))
						);
					},
					message: (props) =>
						`${props.value} is not a valid value for myField!`,
				},
			},
			release_date: {
				type: String,
				required: false,
			},
			running_time: {
				type: String,
				required: false,
			},
			box_office: {
				type: String,
				required: false,
			},
		},
	})
	overview: MovieOverview;
	@Prop({
		type: [String],
		required: false,
	})
	characters: string[];
}
