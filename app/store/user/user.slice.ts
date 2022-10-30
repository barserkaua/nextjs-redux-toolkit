import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFilter, IUser } from "./user.types";

const initialState: IUser[] = [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (
      state,
      action: PayloadAction<{ data: IUser[]; filter: IFilter }>
    ) => {
      return action.payload.data
        .filter((item) =>
          action.payload.filter?.gender !== ""
            ? action.payload.filter?.gender === item.gender
            : item
        )
        .filter((item) =>
          action.payload.filter?.country !== ""
            ? action.payload.filter?.country === item.location.country
            : item
        )
        .filter((item) =>
          (item.name.first + item.name.last)
            .toLowerCase()
            .includes(action.payload.filter?.search.toLowerCase())
        );
    },
    sortByFirstName: (state) => {
      return state.sort((firstItem, secondItem) => {
        if (firstItem.name.first < secondItem.name.first) {
          return -1;
        }
        if (firstItem.name.first > secondItem.name.first) {
          return 1;
        }
        return 0;
      });
    },
    sortByLastName: (state) => {
      state.sort((firstItem, secondItem) => {
        if (firstItem.name.last < secondItem.name.last) {
          return -1;
        }
        if (firstItem.name.last > secondItem.name.last) {
          return 1;
        }
        return 0;
      });
    },
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
