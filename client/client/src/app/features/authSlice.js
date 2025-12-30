// import { createSlice } from "@reduxjs/toolkit";


// const authSlice = createSlice({
//     name: 'auth',
//     initialState:{
//         token: null,
//         user: null,
//         loading: true,
//     },
//     reducers:{
//         login: (state,action)=>{
//             state.token = action.payload;
//             state.user = action.payload;
//         },
//         logout: (state)=>{
//             state.token = '',
//             state.user = null,
//             localStorage.removeItem('token')
//         },
//         setLoading: (state,action)=>{
//             state.loading = action.payload
//         }
//     }
// })

// export const {login, logout ,setLoading} = authSlice.actions

// export default authSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const tokenFromStorage = localStorage.getItem("token") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage,
    user: userFromStorage,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;