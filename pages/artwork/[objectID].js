import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "../../components/ArtworkCardDetail";
import { useRouter } from "next/router";

export default function ArtworkById({ objectID }) {
	// use router to extract query string
	const router = useRouter();
	objectID = router.query;

	return (
		<Row>
			<Col>
				<ArtworkCardDetail objectID={objectID} />
			</Col>
		</Row>
	);
}
