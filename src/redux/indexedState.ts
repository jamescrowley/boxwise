export interface IndexedStateItem {
  id: string;
}

export interface IndexedState<T extends IndexedStateItem> {
  byId: { [id: string]: T };
  allIds: string[];
}

export function addItem<
  TItem extends IndexedStateItem,
  TState extends IndexedState<TItem>
>(state: TState, item: TItem): TState {
  return {
    ...state,
    allIds: [...state.allIds, item.id],
    byId: { ...state.byId, [item.id]: item }
  };
}

export function replaceAllItems<
  TItem extends IndexedStateItem,
  TState extends IndexedState<TItem>
>(state: TState, items: TItem[]): TState {
  const indexedById = items.reduce((obj, row) => {
    return { ...obj, [row.id]: row };
  }, {});

  return {
    ...state,
    allIds: items.map(item => item.id),
    byId: indexedById
  };
}

export function updateItem<
  TItem extends IndexedStateItem,
  TState extends IndexedState<TItem>
>(state: TState, item: TItem): TState {
  return {
    ...state,
    byId: { ...state.byId, [item.id]: item }
  };
}

export function removeItem<
  TItem extends IndexedStateItem,
  TState extends IndexedState<TItem>
>(state: TState, idToDelete: string): TState {
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
}
