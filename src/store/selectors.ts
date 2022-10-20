import { filterByCountry, filterByPosts } from './../utils/filters';
import { Row } from 'src/components';
import { sortByPayments } from 'src/utils/filters';
import { RootState } from '.';

export type Selector<R, P extends (string | number)[] = []> = (
  state: RootState,
  ...args: P
) => R;

export const getData: Selector<Row[] | null> = (state): Row[] | null =>
  state.user.data;

export const getSearchedValue: Selector<string> = (state): string =>
  state.user.searchedValue;

export const getSelectedFilters: Selector<string[]> = (state): string[] =>
  state.user.selectedFilters;

export const getSortValue: Selector<'asc' | 'desc' | null> = (
  state
): 'asc' | 'desc' | null => state.user.sortValue;

export const applySearchFilter: Selector<boolean> = (state): boolean =>
  !state.user.selectedFilters.length || !!state.user.searchedValue;

export const getFilteredData: Selector<Row[] | null> = (
  state
): Row[] | null => {
  const filteredData = state.user.data?.filter(row => {
    return (
      filterByCountry(getSearchedValue(state))(applySearchFilter(state))(row) ||
      filterByPosts(getSelectedFilters(state))(row)
    );
  });

  return state.user.sortValue
    ? sortByPayments(state.user.sortValue)(filteredData)
    : filteredData;
};
