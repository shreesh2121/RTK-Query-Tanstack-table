
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL = 'https://fakestoreapi.com';

// Define the shape of the user data
// interface User {
//   id: number;
//   name: string;
//   username:string;
//   email: string;
//   address: {
//     street: string;
//     city: string;
//     zipcode: string;
//   }
  
//   // Add more fields as needed
// }
interface Product {
  id: number;
  title: string;
  price:number;
  category: string;
  rating: {
        rate: number;
        count: number;
  }
}

// Define an API service using RTK Query
export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<Product[], void>({
      // query: () => '/users',
      query: () => '/products',

    }),
  }),
});

// Export the generated hook for usage in components
export const { useGetUsersQuery } = jsonServerApi;

  