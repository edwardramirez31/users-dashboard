import { FC } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';
import { getSearchedValue } from 'src/store/selectors';
import { setSearchedValue } from 'src/store/user';
import { useSelector, useDispatch } from 'react-redux';

interface SearchProps {
  store?: {};
  updateStore?: (val) => void;
}

// OR

//interface SearchProps {
//  selected?: {};
//  updateSelected?: (val) => void;
//}

// OR store can be global

export const Search: FC<SearchProps> = props => {
  const searchedValue = useSelector(getSearchedValue);
  const dispatch = useDispatch();
  const onChange = (value: string) => {
    dispatch(setSearchedValue(value));
  };

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchedValue}
      type="search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={e => onChange(e.target.value)}
    />
  );
};
