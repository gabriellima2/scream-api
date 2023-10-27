# Scream API

API Rest dedicada à clássica franquia de filmes de terror slasher, Scream. Ela serve como uma fonte de dados e informações sobre a série, proporcionando aos fãs e desenvolvedores uma maneira conveniente de acessar e interagir com o conteúdo relacionado a franquia.

Através de um Web Scraper realizado no [Site Fandom](https://scream.fandom.com/wiki/Scream_Wiki), consegui obter os dados necessários para os filmes e personagens.

## Tecnologias
- [NestJS](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [Swagger](https://swagger.io/)

## Configuração

Você precisa ter o [Git](https://git-scm.com/) e algum gerenciador de pacotes([NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) | [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)) instalados. Além disso, para rodar a aplicação é necessário que você tenha o [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) em sua máquina.

### Preparando o ambiente

```bash
1. Clone o repositório:
$ git clone https://github.com/gabriellima2/scream-api.git

2. Acesse a pasta e instale as dependências via terminal:
$ yarn / npm i
```

#### Defina as variáveis de ambiente
```bash
1. Renomeie o arquivo
	.env.example -> .env

2. Substitua os <valores>
	DB_ROOT_USERNAME=<root-username>
	DB_ROOT_PASSWORD=<root-password>
	DB_NAME=<database-name>
	DB_PORT=<database-port>
	DB_USER=<username>
	DB_PASSWORD=<password>
	MONGO_URI=mongodb://<username>:<password>@mongo:<database-port>/<database-name>
```

### Rodando a aplicação

```bash
1. Inicie a aplicação em modo de desenvolvimento:
$ docker-compose up

2. O servidor será aberto em http://localhost:3000
```

## Endpoints

Para mais detalhes, você pode acessar a documentação criada com [Swagger](https://swagger.io/) em `http://localhost:3000/docs`.

### Movies

#### Request

`GET /movies/`

    curl -i -H 'Accept: application/json' http://localhost:3000/movies

#### Response

    HTTP/1.1 200 OK
    Date: Fri, 27 Out 2023 17:00:20 GMT
    Status: 200 OK
    Connection: close
    RateLimit-Limit: 30
    RateLimit-Remaining: 29
    Content-Type: application/json

```js
	[
		{
			"_id": "653c12cd64f902c0aaabbba5",
			"name": "Scream",
			"image": "https://static.wikia.nocookie.net/scream/images/d/d4/Scream_xlg.jpg",
			"synopsis": "A year after Sidney's mom is murdered...",
			"directors": [
				"Wes Craven"
			],
			"writers": [
				"Kevin Williamson"
			],
			"producers": [
				"Cathy Konrad",
				"Cary Woods",
				"Marianne Maddalena"
			],
			"composer": [
				"Marco Beltrami"
			],
			"release_date": "December 20, 1996",
			"running_time": "111 minutes",
			"box_office": "$173,046,663",
			"characters": [
				"http://localhost:3000/characters/Sidney_Prescott",
				"http://localhost:3000/characters/Gale_Weathers",
				//...
			],
		},
		//...
	],
```

##

#### Request

`GET /movies/:name`

    curl -i -H 'Accept: application/json' http://localhost:3000/movies/scream_2

#### Response

    HTTP/1.1 200 OK
    Date: Fri, 27 Out 2023 17:01:38 GMT
    Status: 200 OK
    Connection: close
    RateLimit-Limit: 30
    RateLimit-Remaining: 28
    Content-Type: application/json

```js
	{
		"_id": "653c12cd64f902c0aaabbba5",
		"name": "Scream",
		"image": "https://static.wikia.nocookie.net/scream/images/d/d4/Scream_xlg.jpg",
		"synopsis": "A year after Sidney's mom is murdered...",
		"directors": [
			"Wes Craven"
		],
		"writers": [
			"Kevin Williamson"
		],
		"producers": [
			"Cathy Konrad",
			"Cary Woods",
			"Marianne Maddalena"
		],
		"composer": [
			"Marco Beltrami"
		],
		"release_date": "December 20, 1996",
		"running_time": "111 minutes",
		"box_office": "$173,046,663",
		"characters": [
			"http://localhost:3000/characters/Sidney_Prescott",
			"http://localhost:3000/characters/Gale_Weathers",
			// ...
		],
	},
```

### Characters

#### Request

`GET /characters/`

		curl -i -H 'Accept: application/json' http://localhost:3000/characters

`Com Paginação`

		curl -G -i -H 'Accept: application/json' -d "page=1&limit=10" http://localhost:3000/characters

#### Response

    HTTP/1.1 200 OK
    Date: Fri, 27 Out 2023 17:09:15 GMT
    Status: 200 OK
    Connection: close
    RateLimit-Limit: 30
    RateLimit-Remaining: 28
    Content-Type: application/json

```js
	{
		"total": 10,
		"next": "http://localhost:3000/characters?page=2&limit=10",
		"last": undefined,
		"items": [
			// ...
			{
				"id": "653c1933a96530d435fdb1a0",
				"name": "Stu Macher",
				"image": "https://static.wikia.nocookie.net/scream/images/f/fc/Stu-Profile.jpg",
				"description": "Stuart \"Stu\" Macher is the secondary antagonist of Scream (1996 film)...",
				"born": "1978",
				"personality": [
					"Eccentric",
					"Psychotic (self-identifying)"
				],
				"status": "Deceased",
				"portrayed_by": [
					"Matthew Lillard"
				],
				"appearances": [
					"http://localhost:3000/movies/Scream",
					"http://localhost:3000/movies/Scream_3",
					"http://localhost:3000/movies/Scream_VI"
				],
			},
			// ...
		]
	},
```

##

#### Request

`GET /characters/:name`

    curl -i -H 'Accept: application/json' http://localhost:3000/characters/stu_macher

#### Response

    HTTP/1.1 200 OK
    Date: Fri, 27 Out 2023 17:14:29 GMT
    Status: 200 OK
    Connection: close
    RateLimit-Limit: 30
    RateLimit-Remaining: 27
    Content-Type: application/json

```js
	{
		"id": "653c1933a96530d435fdb1a0",
		"name": "Stu Macher",
		"image": "https://static.wikia.nocookie.net/scream/images/f/fc/Stu-Profile.jpg",
		"description": "Stuart \"Stu\" Macher is the secondary antagonist of Scream (1996 film)...",
		"born": "1978",
		"personality": [
			"Eccentric",
			"Psychotic (self-identifying)"
		],
		"status": "Deceased",
		"portrayed_by": [
			"Matthew Lillard"
		],
		"appearances": [
			"http://localhost:3000/movies/Scream",
			"http://localhost:3000/movies/Scream_3",
			// ...
		],
	},
```


<p align="center">Data scraped from <a href="https://scream.fandom.com/wiki/Scream_Wiki">Fandom</a></p>
<p align="center">Made with 💙 by <a href="https://www.linkedin.com/in/gabriel-lima-860612236">Gabriel Lima</a></p>

<p align="center">All rights reserved</p>

