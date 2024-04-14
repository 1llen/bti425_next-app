import useSWR from "swr";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import { useAtom } from "jotai";
import { useState } from "react";
import { favouritesAtom } from "@/store";
import { Button } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail(props) {
	// Make SWR request to https://collectionapi.metmuseum.org/public/collection/v1/objects/objectID

	// TODO: FIX props.objectID to be just objectID
	// console.log("ArtworkCardDetailDEBUG: ", props.objectID.objectID);

	// get data from SWR
	const { data, error } = useSWR(
		props.objectID.objectID
			? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID.objectID}`
			: null
	);

	// reference to favouritesList
	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

	// showAdded state for button; default is false
	const [showAdded, setShowAdded] = useState(false);

	useEffect(() => {
		setShowAdded(favouritesList?.includes(objectID));
	}, [favouritesList]);

	// favouritesClicked; add or remove from favourites list
	async function favouritesClicked() {
		if (showAdded) {
			// remove from favouritesList
			setFavouritesList(await removeFromFavourites(props.objectID.objectID));
		} else if (!showAdded) {
			// add to favouritesList
			setFavouritesList(await addToFavourites(props.objectID.objectID));
		}
	}

	if (error) {
		// render "Error" component from "next/error"
		return <Error statusCode={404} />;
	} else if (data) {
		// render Bootstrap Card with data from SWR request
		return (
			<>
				<Card>
					<Card.Img
						variant="top"
						src={
							data?.primaryImage ||
							"https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"
						}
					/>
					<Card.Title>{data?.title || "N/A"}</Card.Title>
					<Card.Text>
						<strong>Date: </strong> {data?.objectDate || "N/A"} <br />
						<strong>Classification: </strong> {data?.classification || "N/A"}
						<br />
						<strong>Medium: </strong> {data?.medium || "N/A"}
						<br /> <br />
						<strong>Artist:</strong> {data?.artistDisplayName || "N/A"}
						<br />
						<strong>Credit Line: </strong>
						{data?.creditLine || "N/A"} <br /> <strong>Dimensions: </strong>
						{data?.dimensions || "N/A"}
						<br />
						<Button variant="primary" onClick={favouritesClicked}>
							{showAdded ? "+ Favourite (added)" : "+ Favourite"}
						</Button>
					</Card.Text>
					{data?.artistDisplayName && (
						<>
							<a
								href={data?.artistWikidata_URL}
								target="_blank"
								rel="noreferrer"
							>
								Wiki
							</a>
						</>
					)}
				</Card>
			</>
		);
	} else if (!data && !error) {
		return null;
	}

	return <></>;
}
