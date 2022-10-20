import { Row } from 'src/components';

export const filterByCountry = (value: string) => {
  return (array: Row[]) =>
    array.filter(row =>
      row.country.toLowerCase().includes(value.toLowerCase())
    );
};

export const filterByPosts = (values: string[]) => {
  return (array: Row[]) =>
    array.filter(row => {
      const withoutPosts = values.find(filter => filter === 'Without posts');
      const moreThanOneHundredPosts = values.find(
        filter => filter === 'More than 100 posts'
      );

      return (
        (withoutPosts && row.posts === 0) ||
        (moreThanOneHundredPosts && row.posts > 100)
      );
    });
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
