import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState  {
    value: AuthState
}

interface InputAction {
    username: string,
    userID: number,
    token: string
}
 
type AuthState = {
    isAuth: boolean,
    username: string,
    userID: number,
    token: string
}

const initialState:InitialState = {
    value: {
        isAuth: false,
        username: "",
        userID: -1,
        token: ""
    } as AuthState ,
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {return initialState},
        login: (_, action:  PayloadAction<InputAction>) => {
            return {
                value: {
                    isAuth: true,
                    username: action.payload.username,
                    userID: action.payload.userID,
                    token: action.payload.token
                }
            }
        }
    }
})

export const {logout, login} = auth.actions;
export default auth.reducer;