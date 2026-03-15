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

interface EditItemParams {
  id: number;
  quantity?: number;
}

const server = api.injectEndpoints({
  endpoints: (builder) => ({
    virtualFrigeGetItems: builder.query<ItemsResponse, void>({
      query: () => "/api/v1/virtual-fridge/items",
      providesTags: (result) =>
        result != null
          ? [
              ...result.items.map((item) => ({
                type: "VirtualFridgeItems" as const,
                id: item.id,
              })),
              { type: "VirtualFridgeItems", id: "LIST" },
            ]
          : [{ type: "VirtualFridgeItems", id: "LIST" }],
    }),
    virtualFridgeAddItem: builder.mutation<AddItemResponse, AddItemParams>({
      query: (arg) => ({
        url: "/api/v1/virtual-fridge/items",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: () => [{ type: "VirtualFridgeItems", id: "LIST" }],
    }),
    virtualFridgeEditItem: builder.mutation<FridgeItem, EditItemParams>({
      query: ({ id, ...rest }) => ({
        url: `/api/v1/virtual-fridge/items/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result) =>
        result != null ? [{ type: "VirtualFridgeItems", id: result.id }] : [],
    }),
    virtualFridgeDeleteItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/v1/virtual-fridge/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, _a, params) => [
        { type: "VirtualFridgeItems", id: "LIST" },
        { type: "VirtualFridgeItems", id: params },
      ],
    }),
  }),
});

export const {
  useVirtualFrigeGetItemsQuery,
  useVirtualFridgeAddItemMutation,
  useVirtualFridgeEditItemMutation,
  useVirtualFridgeDeleteItemMutation,
} = server;
