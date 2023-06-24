"use client"

import {RootState, store} from './store'
import { Provider, TypedUseSelectorHook, useSelector } from 'react-redux'

export function ReduxProvider({children}: {children: React.ReactNode}) {
    return <Provider store={store}> {children} </Provider>
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;