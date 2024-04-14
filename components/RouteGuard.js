import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard(props) {
	const router = useRouter();

	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
	const [searchHistoryList, setSearchHistoryList] = useAtom(searchHistoryAtom);

	async function updateAtoms() {
		// update favourites and history atoms using values from getFavourites and getHistory

		const favouritesList = await getFavourites();
		const historyList = await getHistory();
	}

	useEffect(() => {
		updateAtoms();
		// on initial load - run auth check
		//authCheck(router.pathname);

		// on route change complete - run auth check
		//router.events.on("routeChangeComplete", authCheck);

		// unsubscribe from events in useEffect return function
		// return () => {
		// 	router.events.off("routeChangeComplete", authCheck);
		// };
	}, []);

	function authCheck(url) {
		const path = url.split("?")[0];
		if (!PUBLIC_PATHS.includes(path)) {
			console.log(`trying to request a secure path: ${path}`);
		}
	}

	return <>{props.children}</>;
}
