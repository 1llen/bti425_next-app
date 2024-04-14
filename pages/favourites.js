import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import ArtworkCard from "../components/ArtworkCard";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Error from "next/error";
import useSWR from "swr";

export default function Favourites() {
	// get data from favourites
	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

	if (!favouritesList) {
		return null;
	}

	if (favouritesList.length > 0) {
		return (
			<>
				<Row className="gy-4">
					{favouritesList.map((currentObjectID) => (
						<Col lg={3} key={currentObjectID}>
							<ArtworkCard objectID={currentObjectID} />
						</Col>
					))}
				</Row>
			</>
		);
	} else {
		return (
			<div>
				<h1>No favourites yet; try adding some artworks to your favourites</h1>
			</div>
		);
	}
}
