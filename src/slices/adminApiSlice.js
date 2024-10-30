import { apiSliceAdmin } from "./apiSliceAdmin";

export const adminApiSlice = apiSliceAdmin.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `/auth`,
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.mutation({
      query: (data) => ({
        url: `/user-list?page=${data.page}&key=${data.key}`,
        method: "GET",
      }),
    }),
    getFeesData: builder.mutation({
      query: (data) => ({
        url: `/getfeesdata/${data}`,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/adduser`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/edituser`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
    addFees: builder.mutation({
      query: (data) => ({
        url: `/addfeesstudent`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/deleteuser`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetUsersMutation,
  useGetFeesDataMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useAddFeesMutation,
  useDeleteUserMutation,
} = adminApiSlice;
