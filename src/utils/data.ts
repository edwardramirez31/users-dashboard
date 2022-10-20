import { Row } from 'src/components';
import { User, Account, Image } from 'types';

export const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Row[] => {
  const rows = users.map(({ username, country, name }, index) => ({
    avatar: images[index].url,
    username,
    country,
    name,
    lastPayments: accounts[index].payments[0]?.totalSum ?? 0,
    posts: accounts[index].posts,
  }));
  return rows;
};
