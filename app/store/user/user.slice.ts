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
      // it's not a good decision to filter data in state, filter and search have to be on server side
      if (
        action.payload.filter.country === "" &&
        action.payload.filter.gender === "" &&
        action.payload.filter?.search === ""
      ) {
        return action.payload.data;
      } else if (
        action.payload.filter?.gender !== "" &&
        action.payload.filter?.country === ""
      ) {
        return action.payload.data.filter(
          (item) => item.gender === action.payload.filter?.gender
        );
      } else if (
        action.payload.filter?.country !== "" &&
        action.payload.filter?.gender === ""
      ) {
        return action.payload.data.filter(
          (item) => item.location.country === action.payload.filter?.country
        );
      } else if (
        action.payload.filter?.gender !== "" &&
        action.payload.filter?.country !== ""
      ) {
        return state
          .filter((item) => item.gender === action.payload.filter?.gender)
          .filter(
            (item) => item.location.country === action.payload.filter?.country
          );
      } else if (action.payload.filter?.search !== "") {
        return state.filter((item) =>
          (item.name.first + item.name.last)
            .toLowerCase()
            .includes(action.payload.filter?.search.toLowerCase())
        );
      }
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
