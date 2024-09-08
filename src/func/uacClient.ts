import { UacServiceClient } from "@chayns/uac-service";
import { getAccessToken, getLanguage, getSite, getUser } from "chayns-api";

export const uacClient = new UacServiceClient({
	getToken: async () => (await getAccessToken()).accessToken || "",
	getDefaultSiteId: () => getSite().id,
	getDefaultPersonId: () => getUser()?.personId || "",
	getLanguage: () => getLanguage().active,
});
