import { OPTIONS } from './../components/Filters/Filters';
import { Row } from 'src/components';

export const filterByCountry =
  (searchedValue: string) => (applySearchFilter: boolean) => (row: Row) =>
    applySearchFilter &&
    row.country.toLowerCase().includes(searchedValue.toLowerCase());

export const filterByPosts = (values: string[]) => {
  return (row: Row) => {
    return OPTIONS.map(({ title, checkCondition }) => {
      const filterIsApplied = values.find(filter => filter === title);

      return filterIsApplied && checkCondition(row.posts);
    }).includes(true);
  };
};

export const sortByPayments = (value: 'asc' | 'desc') => {
  return (array: Row[]) =>
    array.sort((a, b) => {
      const condition =
        value === 'asc'
          ? a.lastPayments >= b.lastPayments
          : a.lastPayments < b.lastPayments;
      return condition ? 1 : -1;
    });
};
