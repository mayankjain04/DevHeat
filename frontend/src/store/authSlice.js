import { createSlice } from '@reduxjs/toolkit'

const savedAuth = JSON.parse(localStorage.getItem('authentication'));

const initialState = savedAuth || {
    status: false,
    userData: null
};

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;

            // Save to localStorage
            localStorage.setItem('authentication', JSON.stringify({
                status: true,
                userData: action.payload.userData
            }));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;

            // Clear from localStorage
            localStorage.removeItem('authentication');
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;