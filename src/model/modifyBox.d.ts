export interface IDelete {
	imei: string;
	tappId: number;
	locationId: number;
	deviceId: number;
}

export interface IPost {
	imei: string;
	tappId: number;
	locationId: number;
	deviceId: number;
}

export interface IPatch {
	imei: string;
	tappViewMode: 0 | 1;
}
