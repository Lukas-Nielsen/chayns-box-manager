import { useState } from "react";
import { uacClient } from "./func/uacClient";
import { Boxes } from "./components/boxes";

export const Main = () => {
	const [allowed, setAllowed] = useState<boolean>(false);

	uacClient.getGroupsForUser({}).then((groups) => {
		setAllowed(
			groups.some((group) =>
				// manager, team, device manager
				[1, 79077, 92296].some((id) => id === group.id),
			),
		);
	});

	return (
		<>
			<h1>Box Manager</h1>
			{!allowed && (
				<>
					Dir fehlen leider die Berichtigungen, um diese Seite
					aufzurufen.
				</>
			)}
			{allowed && (
				<>
					<Boxes />
				</>
			)}
		</>
	);
};
