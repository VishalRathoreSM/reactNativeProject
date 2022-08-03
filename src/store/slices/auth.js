import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: {},
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, {payload}) {
      state.loggedIn = payload;
    },
    setUser(state, {payload}) {
      state.user = payload;
    },
  },
});

export const {setLoggedIn, setUser} = auth.actions;

export const getLoggedIn = state => state.auth.loggedIn;

export const getUser = state => state.auth.user;

export default auth.reducer;
