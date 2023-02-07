import { createGlobalStyle } from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		background: string;
		element: string;
		text: string;
	}
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  #root {
    margin: 0 auto;
    /* overflow-x: hidden; */
  }

  body {
   background: ${(props) => props.theme.background};
    font-size: 1rem;
    font-family: 'Nunito Sans', sans-serif;
  }
`;
