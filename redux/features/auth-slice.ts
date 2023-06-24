import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState  {
    value: AuthState
}
 
type AuthState = {
    isAuth: boolean,
    username: string,
    userID: number
}

const initialState:InitialState = {
    value: {
        isAuth: false,
        username: "",
        userID: -1
    } as AuthState ,
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    }
})
