import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "../themeComponent/themeContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	const { toggleTheme, theme } = useContext(ThemeContext);
	return (
		<NavContainer>
			<Link to="/">
				<NavHeader>Where in the world?</NavHeader>
			</Link>

			<NavButton onClick={toggleTheme}>
				{theme === "light" ? (
					<div>
						<MdOutlineDarkMode /> Dark Mode
					</div>
				) : (
					<div>
						<CiLight /> Light Mode
					</div>
				)}
			</NavButton>
		</NavContainer>
	);
};

export default NavBar;

//STYLES
const NavHeader = styled.h3`
	color: ${(props) => props.theme.text};
	cursor: pointer;
`;

const Link = styled(NavLink)`
	text-decoration: none;
	color: black;
`;

const NavContainer = styled.div`
	background: ${(props) => props.theme.element};
	display: flex;
	justify-content: space-between;
	padding: 1rem 4rem;
	box-shadow: 2px 14px 10px -22px rgba(0, 0, 0, 0.75);

	@media (max-width: 540px) {
		padding: 2rem 1.5rem;
	}
`;

const NavButton = styled.button`
	cursor: pointer;
	background: none;
	outline: none;
	border: none;
	color: ${(props) => props.theme.text};
	display: flex;
	align-items: center;
	gap: 0.2rem;
`;
