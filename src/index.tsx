import { ColorSchemeProvider } from "@chayns-components/core";
import { ChaynsProvider, getSite } from "chayns-api";
import { createRoot } from "react-dom/client";
import { Main } from "./main";

const App = () => {
	const { color, colorMode, id: siteId } = getSite();
	return (
		<ColorSchemeProvider
			color={color}
			colorMode={colorMode}
			siteId={siteId}
		>
			<Main />
		</ColorSchemeProvider>
	);
};

const element = document.querySelector("#root");
if (element) {
	const root = createRoot(element);
	root.render(
		<ChaynsProvider>
			<App />
		</ChaynsProvider>,
	);
}
