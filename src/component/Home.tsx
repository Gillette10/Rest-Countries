import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { useGetAllCountriesQuery } from "../countryApi";
import Search from "./Search";
import { Link } from "react-router-dom";

interface RootState {
	search: {
		value: string;
		selectedOption: string;
	};
}
interface Props {
	setCountryCode: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ setCountryCode }: Props) => {
	const { data, error, isLoading } = useGetAllCountriesQuery([]);
	const { selectedOption, value } = useSelector(
		(state: RootState) => state.search,
	);

	//handling the submission of single page for each country
	const handleClick = (code: string) => {
		setCountryCode(code);
	};

	interface UserJSON {
		name: {
			common: string;
			nativeName: string;
		};
		capital: string;
		cca3: string;
		population: number;
		region: string;
		subregion: string;
		nativeName: string;
		common: string;
		flags: {
			png: string;
		};
	}
	if (!data) {
		return (
			<SpinnerContainer>
				<Spinner />
			</SpinnerContainer>
		);
	}

	const filteredData = data
		.filter(
			(country: UserJSON) =>
				country.name.common.toLowerCase().includes(value.toLowerCase()) &&
				country.region.toLowerCase().includes(selectedOption.toLowerCase()),
		)
		.sort((a: UserJSON, b: UserJSON) =>
			a.name.common.localeCompare(b.name.common),
		);

	return (
		<div>
			{/* the search component */}
			<Search />

			{isLoading ? (
				<SpinnerContainer>
					<Spinner />
				</SpinnerContainer>
			) : error ? (
				<ErrorContainer>
					<div>Oh no! Something went wrong</div>
				</ErrorContainer>
			) : (
				<>
					<HomeContainer>
						{filteredData.map((country: UserJSON) => (
							<CountryCard key={country.name.common}>
								<Link to="countrypage">
									<HomeImage
										src={country.flags.png}
										alt=""
										onClick={() => handleClick(country.cca3)}
									/>
								</Link>
								<HomeText>
									<h2
										style={{
											fontWeight: "700",
											fontSize: ".9rem",
											marginBottom: ".5rem",
											display: "flex",
											flexWrap: "wrap",
										}}
									>
										{country.name.common}
									</h2>
									<div>
										Population:
										<Span>{country.population.toLocaleString()}</Span>
									</div>
									<div>
										Region: <Span>{country.region}</Span>
									</div>
									<div>
										Capital: <Span>{country.capital}</Span>
									</div>
								</HomeText>
							</CountryCard>
						))}
					</HomeContainer>
				</>
			)}
			{/* {JSON.stringify(data)} */}
		</div>
	);
};

export default Home;

//STYLES
const HomeContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	column-gap: 8rem;
	row-gap: 2rem;
	padding: 0 5rem;
	align-items: center;

	@media (max-width: 540px) {
		flex-direction: column;
		column-gap: 0rem;
		row-gap: 2rem;
		padding: 0 3rem;
	}
	@media (max-width: 768px) {
		justify-content: center;
		align-items: center;
	}
	@media (max-width: 820px) {
		justify-content: center;
		align-items: center;
	}
`;

const Span = styled.span`
	opacity: 0.8;
	margin-left: 0.2rem;
`;

const HomeImage = styled.img`
	width: 100%;
	max-width: 100%;
	height: 55%;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
`;
const CountryCard = styled.div`
	border-radius: 5px;
	background: ${(props) => props.theme.element};
	height: 250px;
	box-shadow: 10px 14px 10px -20px rgba(0, 0, 0, 0.75);
	overflow-wrap: break-word;
	inline-size: 200px;

	@media (max-width: 540px) {
		inline-size: 100%;
	}
`;
const HomeText = styled.div`
	color: ${(props) => props.theme.text};
	margin-left: 1rem;
	font-size: 0.8rem;
`;

//ERROR
const ErrorContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 20px;
	color: red;
`;

//LOADING SPINNER
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50vh;
`;

const Spinner = styled.div`
	border: 5px solid #f3f3f3;
	border-top: 5px solid #3498db;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: ${rotate} 1s linear infinite;
`;
