import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice'
export const store = configureStore({
    reducer: {
        authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.dispatch>;