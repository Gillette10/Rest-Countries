import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeInput, selectOption } from "../features/searchSlice";
import { BiSearch } from "react-icons/bi";
import { useContext } from "react";
import { ThemeContext } from "../themeComponent/themeContext";

interface RootState {
	search: {
		value: string;
		selectedOption: string;
	};
}

const options = [
	"Filter by Region",
	"Africa",
	"America",
	"Europe",
	"Asia",
	"Oceania",
];

const Search = () => {
	const { theme } = useContext(ThemeContext);
	const { selectedOption, value } = useSelector(
		(state: RootState) => state.search,
	);
	const dispatch = useDispatch();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(changeInput(e.target.value));
	};

	const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(selectOption(e.target.value));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(changeInput(value));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputContainer>
				{theme === "light" ? (
					<BiSearch color="black" />
				) : (
					<BiSearch color="white" />
				)}
				<Input
					type="text"
					value={value}
					onChange={handleInputChange}
					placeholder="Search for a country..."
				/>
			</InputContainer>

			<Select value={selectedOption} onChange={handleOptionChange}>
				<optgroup>
					{options.map((option) => (
						<StyledOption key={option} value={option}>
							{option}
						</StyledOption>
					))}
				</optgroup>
			</Select>
			{/* <button type="submit">Submit</button> */}
		</Form>
	);
};

export default Search;

// STYLES
const Form = styled.form`
	display: flex;
	justify-content: space-between;
	padding: 1rem 4rem;
	margin-top: 1.5rem;
	margin-bottom: 1rem;

	@media (max-width: 540px) {
		flex-direction: column;
		padding: 1rem 1.5rem;
		margin-bottom: 0;
	}
`;
const InputContainer = styled.div`
	background: ${(props) => props.theme.element};
	padding: 0.4rem 4rem 0.4rem 1.5rem;
	border: none;
	border-radius: 5px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	box-shadow: -1px 2px 34px -21px rgba(0, 0, 0, 0.75);
	display: flex;
	align-items: center;
	gap: 0.8rem;
	justify-content: flex-start;

	@media (max-width: 540px) {
		width: 100%;
		padding: 1.2rem 1rem;
		margin-bottom: 2rem;
	}
`;

const Input = styled.input`
	outline: none;
	border: none;
	background: none;
	color: ${(props) => props.theme.text};
`;
const Select = styled.select`
	outline: none;
	border: none;
	border-radius: 5px;
	padding: 1rem 1rem;
	background: ${(props) => props.theme.element};
	color: ${(props) => props.theme.text};
	font-size: 0.7rem;
	cursor: pointer;

	@media (max-width: 540px) {
		width: 50%;
		margin-bottom: 1rem;
	}
`;
const StyledOption = styled.option`
	border-radius: 5px;
	margin-top: 5rem;
`;
