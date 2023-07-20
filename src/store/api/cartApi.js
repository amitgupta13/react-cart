import { reauthApi } from "./reauthApi";

const cartApi = reauthApi("cart").injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      providesTags: ["Cart", "Orders"],
      query: (params) => ({
        url: "/cart",
        params,
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      invalidatesTags: ["Cart"],
      query: (body) => ({
        url: "/cart",
        body,
        method: "POST",
      }),
    }),
    getOrders: builder.query({
      providesTags: ["Orders"],
      query: (params) => ({
        url: "/orders",
        params,
        method: "GET",
      }),
    }),
    addOrder: builder.mutation({
      invalidatesTags: ["Orders", "Cart"],
      query: (body) => ({
        url: "/orders",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useAddOrderMutation,
  useGetOrdersQuery,
} = cartApi;
export { cartApi };
