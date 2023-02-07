import styled, { keyframes } from "styled-components";
import { useGetCountryQuery } from "../countryApi";
import { NavLink } from "react-router-dom";

interface Props {
	countryCode: string;
}
const CountryPage = ({ countryCode }: Props) => {
	const { data } = useGetCountryQuery(countryCode);

	interface UserJSON {
		name: {
			common: string;
		};
		altSpellings: string[];
		capital: string;
		population: number;
		region: string;
		subregion: string;
		common: string;
		flags: {
			png: string;
			svg: string;
		};
		tld: string[];
		currencies: {
			name: {
				name: string;
			};
		};
		languages: string;
	}
	if (!data) {
		return (
			<SpinnerContainer>
				<Spinner />
			</SpinnerContainer>
		);
	}

	//TOP LEVEL DOMAIN
	// country.tld[0]
	//CURRENCIES
	//Object.values(country.currencies)[0].name
	//LANGUESGES
	//Object.values(country.languages).map((lang) => {console.log(lang);});

	return (
		<Container>
			{/* {JSON.stringify(data)} */}
			<Link to="/">
				<StyledButton>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15"
						fill="currentColor"
						className="bi bi-arrow-left"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
						/>
					</svg>
					Back
				</StyledButton>
			</Link>
			{data.map((country: UserJSON) => {
				return (
					<FlexContainer key={country.name.common} style={{ display: "flex" }}>
						<img src={country.flags.png} alt="" />
						<div>
							<Header>{country.name.common} </Header>
							<BodyFlex>
								<div>
									<Title>
										Native Name:
										<Span>
											{country.altSpellings[1] ? (
												country.altSpellings[1]
											) : (
												<p>Not Found</p>
											)}
										</Span>
									</Title>
									<Title>
										Population:
										<Span>{country.population.toLocaleString()}</Span>
									</Title>
									<Title>
										Region:<Span>{country.region}</Span>
									</Title>
									<Title>
										Sub Region:<Span>{country.subregion}</Span>
									</Title>
									<Title>
										Capital:<Span>{country.capital}</Span>
									</Title>
								</div>
								<div>
									<Title>
										Top Level Domain:<Span> {country.tld[0]}</Span>
									</Title>
									<Title>
										Currencies:
										<Span> {Object.values(country.currencies)[0].name}</Span>
									</Title>
									<Title style={{ display: "flex", gap: "0.4rem" }}>
										Language:
										{Object.values(country.languages).map((lang) => (
											<Span key={lang}>{lang},</Span>
										))}
									</Title>
								</div>
							</BodyFlex>
						</div>
					</FlexContainer>
				);
			})}
		</Container>
	);
};

export default CountryPage;

//STYLES
const Container = styled.div`
	padding: 4rem 4rem;

	@media (max-width: 540px) {
		padding: 2rem 1.5rem;
	}
`;
const Title = styled.div`
	color: ${(props) => props.theme.text};
	font-weight: 600;
	font-size: 1.1rem;
	margin-top: 1rem;

	@media (max-width: 540px) {
		margin-top: 0.7rem;
		font-size: 0.9rem;
	}
`;

const Header = styled.div`
	font-weight: 700;
	color: ${(props) => props.theme.text};
	font-size: 2rem;
	margin-bottom: 1.5rem;

	@media (max-width: 540px) {
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}
	@media (max-width: 768px) {
		margin-bottom: 1rem;
	}
`;

const Span = styled.span`
	opacity: 0.8;
	margin-left: 0.2rem;
`;

const BodyFlex = styled.div`
	display: flex;
	justify-content: center;
	gap: 4rem;
	align-items: center;

	@media (max-width: 540px) {
		flex-direction: column;
		gap: 1.5rem;
		justify-content: flex-start;
		align-items: flex-start;
	}
`;
const FlexContainer = styled.div`
	display: flex;
	gap: 10rem;

	@media (max-width: 540px) {
		flex-direction: column;
		gap: 3rem;
	}
	@media (max-width: 768px) {
		flex-direction: column;
		gap: 3rem;
	}
	@media (max-width: 820px) {
		flex-direction: column;
		gap: 3rem;
	}
`;

const StyledButton = styled.button`
	padding: 0.6rem 1.6rem;
	color: ${(props) => props.theme.text};
	background: ${(props) => props.theme.element};
	outline: none;
	border: none;
	box-shadow: -1px 1px 5px -1px rgba(0, 0, 0, 0.75);
	border-radius: 5px;
	display: flex;
	gap: 0.5rem;
	margin-bottom: 3rem;
	cursor: pointer;
`;

const Link = styled(NavLink)`
	text-decoration: none;
	color: black;
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
