import { Document } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";

import type { Character, CharacterOverview } from "@/domain/entities";

@Schema({ collection: "characters" })
export class CharacterModel extends Document implements Omit<Character, "id"> {
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
	description: string;
	@Prop({
		required: true,
		type: {
			born: {
				type: String,
				required: true,
			},
			personality: {
				type: [String],
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
			portrayed_by: {
				type: String,
				required: true,
			},
		},
	})
	overview: CharacterOverview;
	@Prop({
		type: [String],
		required: true,
	})
	appearances: string[];
}
