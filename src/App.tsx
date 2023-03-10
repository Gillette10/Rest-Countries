import { useState } from "react";
import { ThemeProvider } from "styled-components";
import Home from "./component/Home";
import NavBar from "./component/NavBar";
import { GlobalStyle } from "./globalStyles";
import { darkTheme, lightTheme } from "./themeComponent/theme";
import { ThemeContext } from "./themeComponent/themeContext";
import { Routes, Route } from "react-router-dom";
import CountryPage from "./component/CountryPage";

const App = () => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	return (
		<div>
			<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
				<ThemeContext.Provider value={{ theme, toggleTheme }}>
					<GlobalStyle />
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/countrypage" element={<CountryPage />} />
					</Routes>
				</ThemeContext.Provider>
			</ThemeProvider>
		</div>
	);
};

export default App;
