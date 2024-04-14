import { useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import ArtworkCard from "../../components/ArtworkCard";
import { useEffect } from "react";
import useSWR from "swr";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import validObjectIDList from "@/public/data/validObjectIDList.json";

var PER_PAGE = 12;

export default function Artwork() {
	// use state to keep track of page
	const [page, setPage] = useState(1);
	const [artworkList, setArtworkList] = useState([]);

	// use router to extract query string
	const router = useRouter();
	let finalQuery = router.asPath.split("?")[1];

	let fullQuery = `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`;

	// debug console
	// console.log(fullQuery);

	// use SWR to fetch data from https://collectionapi.metmuseum.org/public/collection/v1/search?finalQuery
	const { data, error } = useSWR(fullQuery);

	function previousPage() {
		if (page > 1) {
			setPage(page - 1);
		} else {
			setPage(1);
		}
	}

	function nextPage() {
		if (page < artworkList.length) {
			setPage(page + 1);
		} else {
			setPage(artworkList.length);
		}
	}

	// useEffect to set artworkList
	useEffect(() => {
		if (data) {
			// set artworkList to results from SWR request
			const results = [];

			// filter based on validObjectIDList
			let filteredResults = validObjectIDList.objectIDs.filter((x) =>
				data.objectIDs?.includes(x)
			);

			// create chunks of [PER_PAGE] objects
			for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
				const chunk = filteredResults.slice(i, i + PER_PAGE);
				results.push(chunk);
			}

			// set artworkList to results
			setArtworkList(results);

			// set page to 1
			setPage(1);
		}
	}, [data]);

	if (error) {
		// render "Error" component from "next/error"
		return <Error statusCode={404} />;
	} else if (data) {
		// render
		return (
			<>
				<Row className="gy-4">
					{artworkList.length > 0 ? (
						artworkList[page - 1].map((currentObjectID) => (
							<Col lg={3} key={currentObjectID}>
								<ArtworkCard objectID={currentObjectID} />
							</Col>
						))
					) : (
						<Card>
							<Card.Body>
								<h4>Nothing Here</h4>
								Try searching for something else.
							</Card.Body>
						</Card>
					)}
				</Row>

				{artworkList.length > 0 && (
					<Row>
						<Col className="text-center">
							<Pagination>
								<Pagination.Prev onClick={previousPage} />
								<Pagination.Item>{page}</Pagination.Item>
								<Pagination.Next onClick={nextPage} />
							</Pagination>
						</Col>
					</Row>
				)}
			</>
		);
	} else {
		// render null if data is not available but not error
		return null;
	}
}
