import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
	const theme = useState("pink");
	// const theme = ["darkblue"];
	// You can use this way also
	return (
		<ThemeContext.Provider value={theme}>
			{/*Everything below this line can access this theme */}
			<div>
				<Router>
					<header>
						<Link to="/">
							<h1>Adopt Me!</h1>
						</Link>
					</header>
					{/* Switch renders the first child that matches the location. And hence the order is important */}
					<Switch>
						<Route path="/details/:id">
							<Details />
						</Route>
						<Route path="/">
							{/* You can wrap a component with ThemeContext to provide it with different theme */}
							{/* <ThemeContext.Provider value={["darkblue"]}> */}
							<SearchParams />
							{/* </ThemeContext.Provider> */}
						</Route>
					</Switch>
				</Router>
			</div>
		</ThemeContext.Provider>
	);
};

export default App;
