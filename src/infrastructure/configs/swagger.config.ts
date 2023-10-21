import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
	.setTitle("Scream API")
	.setDescription(
		"Uma API Rest dedicada à clássica franquia de filmes de terror slasher, Scream. Ela serve como uma fonte de dados e informações sobre a série, proporcionando aos fãs e desenvolvedores uma maneira conveniente de acessar e interagir com o conteúdo relacionado a franquia."
	)
	.setVersion("1.0")
	.build();
