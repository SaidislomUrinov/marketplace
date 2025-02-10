import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'user',
    initialState:{
        _id: '',
        username: '',
        role: ''
    },
    reducers: {
        updateUser: (state, action) => {
            return {...state,...action.payload }
        },
        clearUser: (state) => {
            return {...state, _id: '', username: '', role: '' }
        }
    }
});

export const { updateUser, clearUser } = user.actions;

export default user.reducer;