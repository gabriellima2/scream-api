import { exceptionResponse } from "./exception.response";

import { HttpStatusCode } from "@/core/domain/helpers/http-status-code";
import type { BaseResponse } from "../@types/base.response";

const exampleItem = {
	id: "653440c4c28893935a25f458",
	name: "Scream",
	image:
		"https://static.wikia.nocookie.net/scream/images/d/d4/Scream_xlg.jpg/revision/latest/scale-to-width-down/337?cb=20160316033407",
	synopsis:
		"A year after Sidney's mom is murdered, more murders start to occur. She begins to suspect if these murders are related and tries to find the killer as everyone seems to be a suspect.",
	directors: ["Wes Craven"],
	writers: ["Kevin Williamson"],
	producers: ["Cathy Konrad", "Cary Woods", "Marianne Maddalena"],
	composer: ["Marco Beltrami"],
	release_date: "December 20, 1996",
	running_time: "111 minutes",
	box_office: "$173,046,663",
	characters: [
		"http://localhost:3000/characters/Sidney_Prescott",
		"http://localhost:3000/characters/Gale_Weathers",
		"http://localhost:3000/characters/Dwight_Riley",
		"...",
	],
};

export const getMoviesResponse: BaseResponse = {
	...exceptionResponse,
	success: {
		status: HttpStatusCode.ok,
		description: "Success",
		schema: {
			example: [exampleItem, "..."],
		},
	},
};

export const getMovieResponse: BaseResponse = {
	...exceptionResponse,
	success: {
		status: HttpStatusCode.ok,
		description: "Success",
		schema: {
			example: exampleItem,
		},
	},
};
