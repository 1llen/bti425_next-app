import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "@/lib/userData";

export default function AdvancedSearch() {
	// use router to extract query string
	const router = useRouter();

	// get data from searchHistory
	const [searchHistoryList, setSearchHistoryList] = useAtom(searchHistoryAtom);

	// use react hook form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// function to submit form
	async function submitForm(data) {
		// empty string
		var queryString = "";
		// searchBy string
		queryString += data.searchBy + "=true";
		// add geoLocation if it exists
		if (data.geoLocation != null && data.geoLocation != "") {
			queryString += "&geoLocation=" + data.geoLocation;
		}
		// add medium if it exists
		if (data.medium != null && data.medium != "") {
			queryString += "&medium=" + data.medium;
		}
		// add isOnView if it exists
		if (data.isOnView != null && data.isOnView != "") {
			queryString += "&isOnView=" + data.isOnView;
		}
		// add isHighlight if it exists
		if (data.isHighlight != null && data.isHighlight != "") {
			queryString += "&isHighlight=" + data.isHighlight;
		}
		// add q if it exists
		if (data.q != null && data.q != "") {
			queryString += "&q=" + data.q;
		}

		// prepend /artwork? to queryString
		queryString = "artwork?" + queryString;

		// debug console
		// console.log(` added ${queryString} to search history`);

		// add queryString to searchHistoryList
		setSearchHistory(await addToHistory(queryString));

		// redirect to /artwork?queryString using useRouter
		router.push(queryString);
	}

	return (
		<>
			<Form onSubmit={handleSubmit(submitForm)}>
				<Row>
					<Col>
						<Form.Group className="mb-3">
							<Form.Label>Search Query</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								{...register("q", { required: "This field is required" })}
								className={errors.q ? "is-invalid" : ""}
							/>
							{errors.q && (
								<div className="invalid-feedback">{errors.q.message}</div>
							)}
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<Form.Label>Search By</Form.Label>
						<Form.Select name="searchBy" className="mb-3">
							<option value="title">Title</option>
							<option value="tags">Tags</option>
							<option value="artistOrCulture">Artist or Culture</option>
						</Form.Select>
					</Col>
					<Col md={4}>
						<Form.Group className="mb-3">
							<Form.Label>Geo Location</Form.Label>
							<Form.Control type="text" placeholder="" name="geoLocation" />
							<Form.Text className="text-muted">
								Case Sensitive String (ie &quot;Europe&quot;,
								&quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;,
								&quot;New York&quot;, etc.), with multiple values separated by
								the | operator
							</Form.Text>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group className="mb-3">
							<Form.Label>Medium</Form.Label>
							<Form.Control type="text" placeholder="" name="medium" />
							<Form.Text className="text-muted">
								Case Sensitive String (ie: &quot;Ceramics&quot;,
								&quot;Furniture&quot;, &quot;Paintings&quot;,
								&quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
								multiple values separated by the | operator
							</Form.Text>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Check
							type="checkbox"
							label="Highlighted"
							name="isHighlight"
						/>
						<Form.Check
							type="checkbox"
							label="Currently on View"
							name="isOnView"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<br />
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
