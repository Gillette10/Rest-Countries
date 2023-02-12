import { configureStore } from "@reduxjs/toolkit";
import { countryApi } from "../countryApi";
import searchReducer from "../features/searchSlice";
import countryReducer from "../features/countrySlice";

export const store = configureStore({
	reducer: {
		search: searchReducer,
		country: countryReducer,
		[countryApi.reducerPath]: countryApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(countryApi.middleware),
});
