import { RootAction, RootState, BoxesState } from "redux/storeTypes";
import * as indexedState from "redux/indexedState";

import { BOX_ADD, BOX_LIST } from "./actions";
import { Box } from "./api";

export interface BoxWithProductInfo extends Box {
  productName: string;
  productCategory: string;
}

export const getBoxesWithProductInfoFromState = ({
  boxes,
  products
}: RootState): {
  loading: boolean;
  error?: string;
  data: BoxWithProductInfo[];
} => {
  const isLoading = products.loading || boxes.loading;
  const data = {
    loading: isLoading,
    error: boxes.error,
    data: isLoading
      ? []
      : boxes.data.map(box => {
          const product = products.byId[box.productId];
          return {
            ...box,
            productName: (product && product.name) || "!!!Missing product",
            productCategory:
              (product && product.category) || "!!!Missing product"
          };
        })
  };
  return data;
};

// const boxesIndexedStateReducer = createReducerForIndexedState<
//   Box,
//   BoxesState,
//   RootAction
// >([BOX_ADD], [], [BOX_LIST], []);

export default function boxes(
  state: BoxesState = {
    byId: {},
    allIds: [],
    loading: false,
    error: undefined
  },
  { type, payload }: RootAction
) {
  switch (type) {
    case BOX_ADD.SUCCESS:
      const updatedState = indexedState.addItem(state, payload);
      return {
        loading: false,
        ...updatedState
      };
    default:
      return boxesIndexedStateReducer(state, action);
  }
}
