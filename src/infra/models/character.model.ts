import { Document } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";

import type { Character, CharacterStatus } from "@/domain/entities";

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
		type: String,
		required: false,
	})
	born: string;
	@Prop({
		type: [String],
		required: false,
	})
	personality: string[];
	@Prop({
		type: String,
		required: false,
	})
	status: CharacterStatus;
	@Prop({
		type: [String],
		required: false,
	})
	portrayed_by: string[];
	@Prop({
		type: [String],
		required: false,
	})
	appearances: string[];
}
