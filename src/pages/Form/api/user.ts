import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../type'

const URL: string = 'http://localhost:8080'

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/api/` }),
  endpoints: (build) => ({
    getUsers: build.query<User, void>({
      query: () => 'users'
      // providesTags: (result) => {
      //   console.log({ result })
      //   return result
      // }
    })
  })
})

export const { useGetUsersQuery } = userApi
