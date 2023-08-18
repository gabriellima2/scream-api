import { HttpClientImpl } from "@/infra/gateways";

export const makeHttpClientImpl = () => new HttpClientImpl();
