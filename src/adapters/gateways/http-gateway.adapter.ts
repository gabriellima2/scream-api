export interface HttpGatewayAdapter {
	getHtml(url: string): Promise<string | undefined>;
}
