import { createSlice } from '@reduxjs/toolkit';
import { Row } from 'src/components';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  data: Row[] | null;
  searchedValue: string;
  selectedFilters: string[];
  sortValue: 'asc' | 'desc' | null;
}

const initialState: InitialState = {
  data: null,
  searchedValue: '',
  selectedFilters: [],
  sortValue: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Row[]>) {
      state.data = action.payload;
    },
    setSearchedValue(state, action: PayloadAction<string>) {
      state.searchedValue = action.payload;
    },
    setSelectedFilters(state, action: PayloadAction<string>) {
      if (state.selectedFilters.find(filter => filter === action.payload)) {
        state.selectedFilters = state.selectedFilters.filter(
          filter => filter !== action.payload
        );
      } else {
        state.selectedFilters.push(action.payload);
      }
    },
    setSortValue(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sortValue = action.payload;
    },
  },
});

export const { setData, setSearchedValue, setSelectedFilters, setSortValue } =
  userSlice.actions;

export default userSlice.reducer;
