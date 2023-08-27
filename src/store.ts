import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationType {
  sidoN: string,
  stationN: string,
}

let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')!);
console.log(bookmarkList);

let bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: bookmarkList as LocationType[],
  reducers: {
    addLocation(state, action: PayloadAction<LocationType>) {
      let temp = [...state];
      temp.push(action.payload);
      localStorage.setItem('bookmarkList', JSON.stringify(temp));
      state.push(action.payload);
    },
    removeLocation(state, action: PayloadAction<LocationType>) {
      let temp = [...state];
      for (let i=0; i<state.length; i++) {
        if (state[i].sidoN === action.payload.sidoN && state[i].stationN === action.payload.stationN) {
          state.splice(i, 1);
          temp.splice(i, 1);
        }
      }
      localStorage.setItem('bookmarkList', JSON.stringify(temp));
    }
  }
})

const store = configureStore({
  reducer: {
    bookmark: bookmarkSlice.reducer
  }
})

export const { addLocation, removeLocation } = bookmarkSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export default store