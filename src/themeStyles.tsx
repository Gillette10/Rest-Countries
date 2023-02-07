import styled from "styled-components";

export const Container = styled.div`
	background: ${(props) => props.theme.background};
`;

export const Content = styled.div`
	color: ${(props) => props.theme.text};
`;

export const Button = styled.button`
	background: #ccc;
	padding: 10px;
	border: none;
`;
