import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUsers } from "./user.types";

export const userApi = createApi({
  reducerPath: "api/users",
  baseQuery: fetchBaseQuery({ baseUrl: "https://randomuser.me/api/" }),
  endpoints: (build) => ({
    getUsers: build.query<IUsers, number>({
      query: (limit: number = 200) => `?results=${limit}`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
