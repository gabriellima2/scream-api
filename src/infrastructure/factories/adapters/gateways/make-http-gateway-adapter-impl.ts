import { HttpGatewayAdapterImpl } from "@/infrastructure/adapters/gateways/http-gateway.adapter.impl";

export const makeHttpGatewayAdapterImpl = () => new HttpGatewayAdapterImpl();
