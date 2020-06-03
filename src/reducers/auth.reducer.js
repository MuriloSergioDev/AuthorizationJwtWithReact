import { createSlice } from '@reduxjs/toolkit';



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        loggingIn: false
    },
    reducers: {
        requestLogin: (state) => {
            state.loggingIn = true;
        },
        sucessLogin: (state) => {
            state.loggedIn = true
            state.loggingIn = false
        },
        refreshLogin: (state) => {
            state.loggedIn = true
        },
        failLogin : (state) => {
            state.loggingIn = false
        },
        setLogout: (state) => {
            state.loggedIn = false
            localStorage.clear();
        }
    },
});

export const { actions, reducer } = authSlice;

//export const { login, logout } = actions;

//console.log(reducer);
export default reducer;