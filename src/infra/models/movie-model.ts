import { Document, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";

import type { MovieOverview } from "@/domain/entities";

@Schema({ collection: "movies" })
export class MovieModel extends Document {
	@Prop({ type: String, required: true })
	name: string;
	@Prop({
		type: String,
		required: true,
	})
	image: string;
	@Prop({
		type: String,
		required: true,
	})
	synopsis: string;
	@Prop({
		required: true,
		type: {
			directors: {
				type: MongooseSchema.Types.Mixed,
				required: true,
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
				required: true,
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
				required: true,
			},
			composer: {
				type: String,
				required: true,
			},
			release_date: {
				type: String,
				required: true,
			},
			running_time: {
				type: String,
				required: true,
			},
			box_office: {
				type: String,
				required: true,
			},
		},
	})
	overview: MovieOverview;
	@Prop({
		type: [String],
		required: true,
	})
	characters: string[];
}
