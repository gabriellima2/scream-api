import { Schema } from "mongoose";

export const MovieSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	synopsis: {
		type: String,
		required: true,
	},
	overview: {
		required: true,
		type: {
			directors: {
				type: Schema.Types.Mixed,
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
				type: Schema.Types.Mixed,
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
			composers: {
				type: String,
				required: true,
			},
			realease_date: {
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
	},
	characters: {
		type: [String],
		required: true,
	},
});
