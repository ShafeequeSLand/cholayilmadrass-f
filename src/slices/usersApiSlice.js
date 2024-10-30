import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getFeesUser: builder.mutation({
      query: (data) => ({
        url: `/getfeesuser/${data}`,
        method: "GET",
             
      }),
    }),
  verifyFees: builder.mutation({
      query: ({id,userId}) => ({
        url: `/verify/${id}/${userId}`,
        method: "GET",
             
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyFeesMutation,
  useRegisterMutation,
  useGetFeesUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
