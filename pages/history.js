import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import styles from "../styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
	// get data from searchHistory
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

	// define router
	const router = useRouter();

	if (!searchHistory) {
		return null;
	}

	let parsedHistory = [];
	searchHistory.forEach((h) => {
		let params = new URLSearchParams(h);
		let entries = params.entries();
		parsedHistory.push(Object.fromEntries(entries));
	});

	function historyClicked(e, index) {
		// navigate to /artwork?searchHistory[index]
		router.push(searchHistory[index]);
	}

	async function removeHistoryClicked(e, index) {
		e.stopPropagation(); // stop the event from trigging other events
		setSearchHistory(await removeFromHistory(searchHistory[index]));
	}

	return (
		<>
			{parsedHistory.length === 0 ? (
				<Card>
					<Card.Body>
						<Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
					</Card.Body>
				</Card>
			) : (
				<ListGroup>
					{parsedHistory.map((historyItem, index) => (
						<ListGroup.Item
							className={styles.historyListItem}
							key={index}
							onClick={(e) => historyClicked(e, index)}
						>
							{Object.keys(historyItem).map((key) => (
								<span key={key}>
									{key}: <strong>{historyItem[key]}</strong>&nbsp;
								</span>
							))}
							<Button
								className="float-end"
								variant="danger"
								size="sm"
								onClick={(e) => removeHistoryClicked(e, index)}
							>
								&times;
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</>
	);
}
