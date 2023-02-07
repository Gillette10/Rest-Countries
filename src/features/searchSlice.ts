import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: "",
	selectedOption: "",
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		changeInput: (state, action) => {
			state.value = action.payload;
		},
		selectOption: (state, action) => {
			state.selectedOption = action.payload;
		},
	},
});

export const { changeInput, selectOption } = searchSlice.actions;
export default searchSlice.reducer;
