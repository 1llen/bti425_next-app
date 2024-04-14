import useSWR from "swr";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function ArtworkCard(props) {
	// Make SWR request to https://collectionapi.metmuseum.org/public/collection/v1/objects/props.objectID
	// console.log("ArtworkCard DEBUG: ", props.objectID);

	const { data, error } = useSWR(
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
	);

	if (error) {
		console.log(`Error: Could not fetch data from id: ${props.objectID}`);
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
							data?.primaryImageSmall ||
							"https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"
						}
						alt={data?.title + "thumbnail"}
					/>
					<Card.Title>{data?.title || "N/A"}</Card.Title>
					<Card.Text>
						<strong>Date: </strong> {data?.objectDate || "N/A"} <br />
						<strong>Classification: </strong> {data?.classification || "N/A"}
						<br />
						<strong>Medium: </strong> {data?.medium || "N/A"}
					</Card.Text>
					<Link href={`/artwork/${props.objectID}`} passHref>
						<Button variant="primary">View Details</Button>
					</Link>
				</Card>
			</>
		);
	} else {
		return null;
	}
}
