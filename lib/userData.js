import useSWR from "swr";

const { getToken } = require("./authenticate.js"); // Assuming you have an Authenticate library

// Function to make authenticated requests
const makeAuthenticatedRequest = () => {
	const token = getToken();
	return async (url, method) => {
		const fetcher = async (url, token) => {
			const response = await fetch(url, {
				method: method,
				headers: {
					Authorization: `JWT ${token}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`Failed to fetch data: ${response.statusText}`);
			}
			return response.json();
		};

		const { data, error } = useSWR([url, token], fetcher);

		if (error) {
			throw new Error(`Failed to fetch data: ${error.message}`);
		}

		return data;
	};
};

// Function to add an item to favourites
export async function addToFavourites(id) {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
	return await makeAuthenticatedRequest(url, "PUT", token);
}

// Function to remove an item from favourites
export async function removeFromFavourites(id) {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
	return await makeAuthenticatedRequest(url, "DELETE", token);
}

// Function to get favourites
export async function getFavourites() {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
	return await makeAuthenticatedRequest(url, "GET", token);
}

// Function to add an item to history
export async function addToHistory(id) {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
	return await makeAuthenticatedRequest(url, "PUT", token);
}

// Function to remove an item from history
export async function removeFromHistory(id) {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
	return await makeAuthenticatedRequest(url, "DELETE", token);
}

// Function to get history
export async function getHistory() {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
	return await makeAuthenticatedRequest(url, "GET", token);
}
