import { configureStore } from "@reduxjs/toolkit";
import { countryApi } from "../countryApi";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
	reducer: {
		search: searchReducer,
		[countryApi.reducerPath]: countryApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(countryApi.middleware),
});
