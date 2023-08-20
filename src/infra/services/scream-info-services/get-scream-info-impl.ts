import { Injectable } from "@nestjs/common";

import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { ScreamInfoServiceProtocols } from "@/domain/protocols";
import { ScreamInfoRepository } from "@/domain/repositories";
import { GetScreamInfo } from "@/domain/services";
import { Scraping } from "@/domain/gateways";

@Injectable()
export class GetScreamInfoImpl<T extends object> implements GetScreamInfo<T> {
	constructor(
		private readonly repository: ScreamInfoRepository<T>,
		private readonly scraping: Scraping<T>
	) {}

	async execute(
		baseUrl: string,
		name: string
	): Promise<ScreamInfoServiceProtocols.Response<T>> {
		if (!name) throw new InvalidParamsError();
		const infoFromDB = await this.repository.getByName(name.toLowerCase());
		if (infoFromDB) return infoFromDB;
		const url = encodeURIComponent(`${baseUrl}/${name}`);
		const info = await this.scraping.execute(url);
		if (!info) throw new EmptyDataError();
		return await this.repository.insert(info);
	}
}
