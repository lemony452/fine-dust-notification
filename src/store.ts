import { configureStore, createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export interface LocationType {
  sidoN: string,
  stationN: string,
}

// let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')!);
// console.log(bookmarkList);

let bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: [] as LocationType[],
  reducers: {
    addLocation: (state, action: PayloadAction<LocationType>) => {
      // let temp = [...state];
      // temp.push(action.payload);
      // state.push(action.payload);
      console.log('추가', current(state), action.payload);
      // localStorage.setItem('bookmarkList', JSON.stringify([...state, action.payload]));
      return state = [...current(state), action.payload];
    },
    removeLocation: (state, action: PayloadAction<LocationType>) => {
      // let locationList = [...state];
      console.log('삭제', current(state));
      return state = current(state).filter((location) => !(location.sidoN === action.payload.sidoN && location.stationN === action.payload.stationN))
      // localStorage.setItem('bookmarkList', JSON.stringify(state));
      // for (let i=0; i<state.length; i++) {
      //   if (state[i].sidoN === action.payload.sidoN && state[i].stationN === action.payload.stationN) {
      //     state.splice(i, 1);
      //     temp.splice(i, 1);
      //   }
      // }
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