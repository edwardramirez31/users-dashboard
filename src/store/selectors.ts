import { Row } from 'src/components';
import { sortByPayments } from 'src/utils/filters';
import { RootState } from '.';

export type Selector<R, P extends (string | number)[] = []> = (
  state: RootState,
  ...args: P
) => R;

export const getData: Selector<Row[] | null> = (state): Row[] | null =>
  state.user.data;

export const getFilteredData: Selector<Row[] | null> = (
  state
): Row[] | null => {
  const withoutPosts = state.user.selectedFilters.find(
    filter => filter === 'Without posts'
  );
  const moreThanOneHundredPosts = state.user.selectedFilters.find(
    filter => filter === 'More than 100 posts'
  );

  const filteredData = state.user.data?.filter(row => {
    return (
      !(withoutPosts || moreThanOneHundredPosts) ||
      (state.user.searchedValue &&
        row.country
          .toLowerCase()
          .includes(state.user.searchedValue.toLowerCase())) ||
      (withoutPosts && row.posts === 0) ||
      (moreThanOneHundredPosts && row.posts > 100)
    );
  });

  return state.user.sortValue
    ? sortByPayments(state.user.sortValue)(filteredData)
    : filteredData;
};

export const getSearchedValue: Selector<string> = (state): string =>
  state.user.searchedValue;

export const getSelectedFilters: Selector<string[]> = (state): string[] =>
  state.user.selectedFilters;

export const getSortValue: Selector<'asc' | 'desc' | null> = (
  state
): 'asc' | 'desc' | null => state.user.sortValue;
