import { api } from "./index";

export interface FridgeItem {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
}

export interface ItemsResponse {
  items: FridgeItem[];
}

interface AddItemResponse {
  id: number;
}

interface AddItemParams {
  item_name: string;
  quantity: number;
  unit: string;
}

const server = api.injectEndpoints({
  endpoints: (builder) => ({
    virtualFrigeGetItems: builder.query<ItemsResponse, void>({
      query: () => "/api/v1/virtual-fridge/items",
      providesTags: () => [{ type: "VirtualFridgeItems", id: "LIST" }],
    }),
    virtualFridgeAddItem: builder.mutation<AddItemResponse, AddItemParams>({
      query: (arg) => ({
        url: "/api/v1/virtual-fridge/items",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: () => [{ type: "VirtualFridgeItems", id: "LIST" }],
    }),
  }),
});

export const { useVirtualFrigeGetItemsQuery, useVirtualFridgeAddItemMutation } =
  server;
