import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countryApi = createApi({
	reducerPath: "countryApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
	endpoints: (builder) => ({
		getAllCountries: builder.query({
			query: () =>
				`/all?fields=languages,cca3,name,capital,region,flags,population,subregion `,
		}),
		getCountry: builder.query({
			query: (code: string) => `/alpha/${code}`,
		}),
		// getBorder: builder.query({
		// 	query: (lang: string) => `/lang/${lang}`,
		// }),
	}),
});

export const { useGetAllCountriesQuery, useGetCountryQuery } = countryApi;
