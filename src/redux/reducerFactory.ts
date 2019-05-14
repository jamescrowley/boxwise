/* eslint-disable no-case-declarations */
import { AnyAction } from "redux";

import { AsyncAction } from "./actionCreators";

export interface IndexedState<T extends { id: string }> {
  byId: { [id: string]: T };
  allIds: string[];
  loading: boolean;
  error?: string;
}

// this may end up being not helpful as I'd rather not push
// people towards 'crud' vs meaningful actions
// but trying to see how it goes.
export function createReducerForIndexedState<
  TItem extends { id: string },
  TState extends IndexedState<TItem>
>(
  addAsyncAction: AsyncAction,
  editAsyncAction: AsyncAction,
  listAsyncAction: AsyncAction,
  deleteAsyncAction: AsyncAction
) {
  return (state: TState, { type, payload }: AnyAction) => {
    switch (type) {
      case addAsyncAction.SUCCESS:
        return {
          ...state,
          loading: false,
          allIds: [...state.allIds, payload.id],
          byId: { ...state.byId, [payload.id]: payload }
        };

      case listAsyncAction.SUCCESS:
        const items = payload as TItem[];
        const indexedById = items.reduce((obj, row) => {
          return { ...obj, [row.id]: row };
        }, {});

        return {
          ...state,
          allIds: items.map(item => item.id),
          byId: indexedById,
          loading: false
        };

      case editAsyncAction.SUCCESS:
        return {
          ...state,
          loading: false,
          byId: { ...state.byId, [payload.id]: payload }
        };

      case addAsyncAction.ERROR:
      case editAsyncAction.ERROR:
      case listAsyncAction.ERROR:
      case deleteAsyncAction.ERROR:
        return { ...state, loading: false, error: payload };

      case addAsyncAction.START:
      case editAsyncAction.START:
      case listAsyncAction.START:
      case deleteAsyncAction.START:
        return { ...state, loading: true };

      case deleteAsyncAction.SUCCESS:
        const idToDelete = payload;
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          [idToDelete]: _,
          ...remainingItemsById
        } = state.byId;

        return {
          ...state,
          allIds: state.allIds.filter(id => id !== idToDelete),
          byId: remainingItemsById
        };

      default:
        return state;
    }
  };
}
