import { configureStore, createSlice, PayloadAction, current, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface LocationType {
  sidoN: string,
  stationN: string,
}


let bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: [] as LocationType[],
  reducers: {
    addLocation: (state, action: PayloadAction<LocationType>) => {

      console.log('추가', current(state), action.payload);
      return state = [...current(state), action.payload];
    },
    removeLocation: (state, action: PayloadAction<LocationType>) => {
      console.log('삭제', current(state));
      return state = current(state).filter((location) => !(location.sidoN === action.payload.sidoN && location.stationN === action.payload.stationN))
      
    }
  }
})

const reducers = combineReducers({
  bookmark: bookmarkSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bookmark']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer
});

export const { addLocation, removeLocation } = bookmarkSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export default store