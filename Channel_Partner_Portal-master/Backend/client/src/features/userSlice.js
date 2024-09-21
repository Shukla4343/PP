import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        user : null,
        admin: null,
        checkout: null
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state) =>{
            state.user =null;
        },
        adminLogin:(state,action)=>{
            state.admin = action.payload;
        },
        adminLogout:(state) =>{
            state.admin =null;
        },
        cart:(state) =>{
            state.checkout = action.payload;
        }
    
    },
});

export const {login, logout, adminLogin, adminLogout, cart} = userSlice.actions;

export const selectUser = (state) =>state.user.user;

export default userSlice.reducer;