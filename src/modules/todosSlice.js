import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: null,
};

export const todosSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
