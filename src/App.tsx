import { FC } from 'react';
import { useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Image, User, Account } from '../types';
import { Table, Filters, Sort, Search, Row } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';
import rows from './mocks/rows.json';

import styles from './App.module.scss';
import { dataConverter } from './utils/data';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredData } from './store/selectors';
import { setData } from './store/user';

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;

export const App: FC = () => {
  const dispatch = useDispatch();

  const filteredData = useSelector(getFilteredData);
  console.log(filteredData);
  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        const convertedData = dataConverter(users, accounts, images);
        dispatch(setData(convertedData));
      }
    );
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters />
            <Sort />
          </div>
          <Search />
        </div>
        <Table rows={filteredData || mockedData} />
      </div>
    </StyledEngineProvider>
  );
};
