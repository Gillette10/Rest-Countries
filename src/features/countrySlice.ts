import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	code: "",
};

const countrySlice = createSlice({
	name: "country",
	initialState,
	reducers: {
		changeCountry: (state, action) => {
			state.code = action.payload;
		},
	},
});

export const { changeCountry } = countrySlice.actions;
export default countrySlice.reducer;
