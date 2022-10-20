import { useState, FC } from 'react';
import Checkbox from '@mui/material/Checkbox';

import styles from './Filters.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFilters } from 'src/store/user';
import { getSelectedFilters } from 'src/store/selectors';

interface FiltersProps {
  store?: {};
  updateStore?: (val) => void;
}

// OR

//interface FiltersProps {
//  selected?: {};
//  updateSelected?: (val) => void;
//}

// OR store can be global

const OPTIONS = [
  {
    title: 'Without posts',
  },
  {
    title: 'More than 100 posts',
  },
];

export const Filters: FC<FiltersProps> = props => {
  const selectedFilters = useSelector(getSelectedFilters);
  const dispatch = useDispatch();

  const onChange = ({ title }) => {
    dispatch(setSelectedFilters(title));
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {OPTIONS.map(option => (
          <li
            value={option.title}
            key={option.title}
            onClick={() => onChange(option)}
          >
            <Checkbox
              checked={
                !!selectedFilters.find(filter => filter === option.title)
              }
              value={option.title}
              size="small"
              color="primary"
            />{' '}
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
