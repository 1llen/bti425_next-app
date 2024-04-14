import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
	let token = readToken();

	// create state for searchField
	const [searchField, setSearchField] = useState("");

	// get data from searchHistory
	const [searchHistoryList, setSearchHistoryList] = useAtom(searchHistoryAtom);

	// use router to extract query string
	const router = useRouter();

	const [isExpanded, setIsExpanded] = useState(false);

	function logout() {
		// set expanded to false
		setIsExpanded(false);

		// invoke removeToken() function from authenticate.js
		removeToken();

		router.push("/login");
	}

	// search function
	async function handleSearch(e) {
		e.preventDefault();

		var searchString = `/artwork?title=true&q=` + searchField;

		// console.log("Searching for: ", searchField);

		// add searchString to searchHistory
		setSearchHistoryList(await addToHistory(`title=true&q=${searchField}`));

		router.push(`/artwork?title=true&q=` + searchField);
	}

	function toggleNavbar() {
		setIsExpanded(!isExpanded);
	}

	function closeNavbar() {
		setIsExpanded(false);
	}

	return (
		<>
			<Navbar
				expand="lg"
				expanded={isExpanded}
				className="bg-body-tertiary fixed-top "
			>
				<Container>
					<Navbar.Brand>Allen Clark</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						onClick={toggleNavbar}
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link href={"/"} passHref legacyBehavior>
								<Nav.Link
									href="/"
									onClick={closeNavbar}
									active={router.pathname === "/"}
								>
									Home
								</Nav.Link>
							</Link>
							<Link href={"/search"} passHref legacyBehavior>
								<Nav.Link
									href="/search"
									onClick={closeNavbar}
									active={router.pathname === "/search"}
								>
									Advanced Search
								</Nav.Link>
							</Link>
						</Nav>
						&nbsp;
						<Form
							className="d-flex justify-content-end"
							onSubmit={(e) => {
								handleSearch(e);
								closeNavbar();
							}}
						>
							<Form.Control
								type="text"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
								value={searchField}
								onChange={(e) => setSearchField(e.target.value)}
							/>
							<Button type="submit" variant="outline-success">
								Search
							</Button>
						</Form>
						&nbsp;
						<Nav>
							{token ? (
								<NavDropdown title={token.userName} id="basic-nav-dropdown">
									<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav>
									<Link href={"/register"} passHref legacyBehavior>
										<Nav.Link
											href="/register"
											onClick={closeNavbar}
											active={router.pathname === "/register"}
										>
											Register
										</Nav.Link>
									</Link>
									<Link href={"/login"} passHref legacyBehavior>
										<Nav.Link
											href="/login"
											onClick={closeNavbar}
											active={router.pathname === "/login"}
										>
											Login
										</Nav.Link>
									</Link>
								</Nav>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<br />
			<br />
		</>
	);
}
