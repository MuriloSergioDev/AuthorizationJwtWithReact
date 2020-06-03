import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increment: state => state+1,
        decrement: state => state-1
    }
})



export const { actions, reducer } = counterSlice;

export const { increment, decrement } = actions;

//console.log(reducer);
export default reducer;
