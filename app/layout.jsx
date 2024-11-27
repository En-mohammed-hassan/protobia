import "@/style/globals.css";
import { Suspense } from "react";

import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
export const metadata = {
	title: "Protobia",
	description: "Discover & Share AI Prompts",
};
const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Suspense fallback={<div>Loading...</div>}>
					<Provider>
						<div className="main">
							<div className="gradient" />
						</div>
						<main className="app">
							<Nav></Nav>
							{children}
						</main>
					</Provider>
				</Suspense>
			</body>
		</html>
	);
};

export default RootLayout;
