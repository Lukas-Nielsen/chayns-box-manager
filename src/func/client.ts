import { Client } from "@hyper-fetch/core";
import { getAccessToken } from "chayns-api";

export const client = new Client({
	url: "https://sub58.tobit.com/v0.1",
}).onAuth(async (request) => {
	const token = await getAccessToken();

	return request.setHeaders({
		...request.headers,
		Authorization: `Bearer ${token.accessToken}`,
	});
});
