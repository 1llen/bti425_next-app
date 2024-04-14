import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import { SWRConfig } from "swr";

const fetcher = async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
		const error = new Error(`An error occurred while fetching the data.`);
		error.info = await response.json();
		error.status = response.status;
		throw error;
	}
	return response.json();
};

export default function App({ Component, pageProps }) {
	return (
		<RouteGuard>
			<Layout>
				<SWRConfig
					value={{
						refreshInterval: 3000,
						fetcher: fetcher,
					}}
				>
					<Component {...pageProps} />
				</SWRConfig>
			</Layout>
		</RouteGuard>
	);
}
