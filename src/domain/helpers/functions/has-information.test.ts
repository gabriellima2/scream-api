import { hasInformation } from "./has-information";

const INFOS = ["any", "_", "info"];

describe("HasInformation function", () => {
	it("should return true when it has the desired info", () => {
		const hasInfo = hasInformation(INFOS, INFOS[2]);
		expect(hasInfo).toBeTruthy();
	});
	it("should return false when it does not have the desired info", () => {
		const hasInfo = hasInformation(INFOS, "another");
		expect(hasInfo).toBeFalsy();
	});
});
