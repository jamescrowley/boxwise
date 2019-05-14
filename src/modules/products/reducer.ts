/* eslint-disable no-case-declarations */
import { createReducerForIndexedState } from "redux/indexedState";
import { RootState, RootAction, ProductsState } from "redux/storeTypes";

import {
  PRODUCT_DELETE,
  PRODUCT_LIST,
  PRODUCT_EDIT,
  PRODUCT_ADD
} from "./actions";
import { Product } from "./api";

export function getAllProductsFromState({ products }: RootState) {
  return {
    loading: products.loading,
    error: products.error,
    data: products.allIds.map(id => products.byId[id])
  };
}

const productsIndexedStateReducer = createReducerForIndexedState<
  Product,
  ProductsState,
  RootAction
>(PRODUCT_ADD, PRODUCT_EDIT, PRODUCT_LIST, PRODUCT_DELETE);

export default function products(
  state: ProductsState = {
    byId: {},
    allIds: [],
    loading: false,
    error: undefined
  },
  action: RootAction
) {
  const { type } = action;

  switch (type) {
    default:
      return productsIndexedStateReducer(state, action);
  }
}
