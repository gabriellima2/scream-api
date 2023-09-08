import { Document, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";

import type { Character, CharacterOverview } from "@/domain/entities";

@Schema({ collection: "characters" })
export class CharacterModel extends Document implements Omit<Character, "id"> {
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
	description: string;
	@Prop({
		required: false,
		type: {
			born: {
				type: String,
				required: false,
			},
			personality: {
				type: [String],
				required: false,
			},
			status: {
				type: String,
				required: false,
			},
			portrayed_by: {
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
		},
	})
	overview: CharacterOverview;
	@Prop({
		type: [String],
		required: false,
	})
	appearances: string[];
}
