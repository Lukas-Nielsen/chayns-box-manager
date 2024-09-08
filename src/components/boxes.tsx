import { useFetch } from "@hyper-fetch/react";
import { client } from "../func/client";
import { IBoxes } from "../model/boxes";
import {
	Accordion,
	AccordionContent,
	AccordionGroup,
	Button,
	Checkbox,
	SelectButton,
} from "@chayns-components/core";
import { useState } from "react";
import { usePages, useSite } from "chayns-api";
import { IDelete, IPatch, IPost } from "../model/modifyBox";

const getBoxes = client.createRequest<IBoxes>()({
	endpoint: "/settings",
	auth: true,
});

const deleteTapp = client.createRequest<undefined, IDelete>()({
	endpoint: "/tapp",
	auth: true,
	method: "DELETE",
});

const postTapp = client.createRequest<null, IPost>()({
	endpoint: "/tapp",
	auth: true,
	method: "POST",
});

const patchViewMode = client.createRequest<null, IPatch>()({
	endpoint: "/settings",
	auth: true,
	method: "PATCH",
});

export const Boxes = () => {
	const { data: boxes, refetch } = useFetch(getBoxes);
	const [checked, setChecked] = useState<string[]>([]);
	const [selectedPages, setSelectedPages] = useState<number[]>([]);
	const [pageMode, setPageMode] = useState<boolean>(false);
	const tapps = usePages();
	const { locationId } = useSite();

	const save = () => {
		if (checked.length > 0) {
			checked.forEach((imei) => {
				const box = boxes?.data.find((i) => i.device.imei === imei);
				if (box) {
					deleteTapp.send({
						data: {
							deviceId: box.device.deviceId,
							imei: imei,
							locationId: locationId,
							tappId: box.tapp.id,
						},
					});
					box.tapps.forEach((tapp) => {
						deleteTapp.send({
							data: {
								deviceId: box.device.deviceId,
								imei: imei,
								locationId: locationId,
								tappId: tapp.id,
							},
						});
					});
					if (!pageMode) {
						selectedPages.forEach((tappId) => {
							postTapp.send({
								data: {
									deviceId: box.device.deviceId,
									imei: imei,
									locationId: locationId,
									tappId: tappId,
								},
							});
						});
					}
					patchViewMode.send({
						data: { imei: imei, tappViewMode: pageMode ? 1 : 0 },
					});
				}
			});
			setChecked([]);
			setSelectedPages([]);
			setPageMode(false);
		}
		refetch();
	};

	return (
		<>
			<AccordionGroup>
				{boxes?.data.map((box) => {
					return (
						<Accordion
							key={box.device.deviceId}
							title={box.device.name}
							rightElement={
								<>
									&nbsp;
									<Checkbox
										shouldShowAsSwitch
										isChecked={checked.includes(
											box.device.imei,
										)}
										onChange={(e) => {
											if (e.currentTarget.checked) {
												setChecked([
													...checked,
													box.device.imei,
												]);
											} else {
												const t = [...checked];
												t.splice(
													t.indexOf(box.device.imei),
													1,
												);
												setChecked(t);
											}
										}}
									/>
								</>
							}
						>
							<AccordionContent>
								<h3>Anzeigemodus</h3>
								{box.tapp.mode === 0 ? "Standard" : "Promotion"}
								{box.tapp.mode === 0 && (
									<>
										<h3>Angezeigte Pages</h3>
										<ul>
											<li>
												{
													tapps.find(
														(i) =>
															i.id ===
															box.tapp.id,
													)?.name
												}
											</li>
											{box.tapp.mode === 0 &&
												box.tapps.map((tapp) => {
													const t = tapps.find(
														(i) => i.id === tapp.id,
													);
													if (t) {
														return <li>t.name</li>;
													}
												})}
										</ul>
									</>
								)}
							</AccordionContent>
						</Accordion>
					);
				})}
			</AccordionGroup>
			<div>
				<>
					<h3>ausgewählte Boxen</h3>
					<ul>
						{checked.length !== 0 &&
							checked.map((i) => (
								<li key={i}>
									{
										boxes?.data.find(
											(box) => box.device.imei === i,
										)?.device.name
									}
								</li>
							))}
						{checked.length === 0 && <li>keine ausgewählt</li>}
					</ul>
					<h3>Anzeigemodus</h3>
					<div
						style={{
							display: "grid",
							gap: "1rem",
							gridTemplateColumns: "5rem 4rem 5rem",
						}}
					>
						<span>Standard</span>
						<Checkbox
							shouldShowAsSwitch
							shouldShowCentered
							isChecked={pageMode}
							onChange={(e) =>
								setPageMode(e.currentTarget.checked)
							}
						/>
						<span>Promotion</span>
					</div>
					{!pageMode && (
						<>
							<h3>ausgewählte Seiten</h3>
							<SelectButton
								buttonText="Seiten wählen"
								shouldShowSearch
								list={tapps
									.filter(
										(tapp) =>
											tapp.sortId > 0 &&
											!tapp.isHiddenFromMenu &&
											!["id", "admin"].some((url) =>
												tapp.customUrl.startsWith(url),
											),
									)
									.map((tapp) => ({
										id: tapp.id,
										text: tapp.name,
									}))}
								shouldAllowMultiSelect
								selectedItemIds={selectedPages}
								onSelect={setSelectedPages}
							/>
						</>
					)}
					<Button onClick={save} isDisabled={checked.length === 0}>
						übernehmen
					</Button>
				</>
			</div>
		</>
	);
};
