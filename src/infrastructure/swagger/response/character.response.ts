import { exceptionResponse } from "./exception.response";

import { HttpStatusCode } from "@/core/domain/helpers/http-status-code";
import type { BaseResponse } from "../@types/base.response";

const exampleItem = {
	id: "65344ba1491aa9b2511ef994",
	name: "Tara Carpenter",
	image:
		"https://static.wikia.nocookie.net/scream/images/b/b8/Tara-Profile.png/revision/latest/scale-to-width-down/337?cb=20230213213829",
	description:
		"Tara Carpenter is the deuteragonist of the film franchise Scream, she serves as the supporting character in Scream (2022), and the one of two protagonists (along with Sam) in the sequel film (2023)...",
	born: "December 14, 2002",
	personality: ["Protective", "Final Girl", "Sweet"],
	status: "Alive",
	portrayed_by: ["Jenna Ortega"],
	appearances: [
		"http://localhost:3000/movies/Scream",
		"http://localhost:3000/movies/Scream_VI",
	],
};

export const getCharactersResponse: BaseResponse = {
	...exceptionResponse,
	success: {
		status: HttpStatusCode.ok,
		description: "Success",
		schema: {
			example: {
				total: 1,
				items: [exampleItem],
				next: "http://localhost:3000/characters?page=2&limit=1",
			},
		},
	},
};

export const getCharacterResponse: BaseResponse = {
	...exceptionResponse,
	success: {
		status: HttpStatusCode.ok,
		description: "Success",
		schema: {
			example: exampleItem,
		},
	},
};
