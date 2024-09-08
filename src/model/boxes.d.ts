export interface IBoxes {
	data: Daum[];
}

export interface Daum {
	tapp: Tapp;
	tapps: Tapp2[];
	device: Device;
	location: Location;
}

export interface Tapp {
	id: number;
	url: string;
	uacGroupIds?: number[];
	mode: number;
	offlineMode: number;
}

export interface Tapp2 {
	deviceTappId: number;
	id: number;
	url: string;
	displayTime: number;
	animationType: number;
	viewMode: ViewMode;
}

export interface ViewMode {
	id: number;
	name: string;
	description: string;
}

export interface Device {
	deviceId: number;
	imei: string;
	setupKey: string;
	orientation: number;
	restartTime: number;
	setupUrl: string;
	loginMode: number;
	name: string;
	deviceType: string;
	lastRequest: number;
	online: boolean;
	kioskMode: boolean;
	masterPassword: string;
	userBarVisible: boolean;
	notificationBarVisible: boolean;
	reboot: boolean;
	batteryMode: number;
	batteryModeDelay: number;
	refresh: boolean;
	fontScale: number;
	zoomFactor: number;
	monitoringMode: number;
	bootAnimation: BootAnimation;
	develop: boolean;
	logIdentifier: boolean;
	batterySettings: BatterySettings;
	screenBrightness: number;
	loginDialogUrl: string;
	showBottomNavView: boolean;
	personId: string;
	version: number;
	minLogLevel: number;
	factoryReset: boolean;
	errorMonitoring: boolean;
	screenSaverTimeout: number;
	showScanner: boolean;
	tappMode: number;
	tokenCreationTime?: string;
	terminalMonitoring?: boolean;
}

export interface BootAnimation {
	version: number;
	portrait: string;
	landscape: string;
}

export interface BatterySettings {
	conserveBattery: boolean;
}

export interface Location {
	siteId: string;
	design: Design;
	locationId: number;
	locationName: string;
	domain: string;
	locationPersonId: string;
}

export interface Design {
	color: string;
	colorMode: number;
	font: Font;
}

export interface Font {
	id: number;
	name: string;
}
