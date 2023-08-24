import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationType {
  sido: string,
  station: string,
}

let bookmark = createSlice({
  name: 'bookmark',
  initialState: [] as LocationType[],
  reducers: {
    addLocation(state, action: PayloadAction<LocationType>) {
      state.push(action.payload);
    },
    removeLocation(state, action: PayloadAction<LocationType>) {
      let idx = state.indexOf(action.payload);
      if (idx !== -1) state.splice(idx, 1);
    }
  }
})

const store = configureStore({
  reducer: {
    bookmark: bookmark.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store