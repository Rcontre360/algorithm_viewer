import { useDispatch as dispatch, useSelector as selector, TypedUseSelectorHook } from 'react-redux'
import type { InitialState, AppDispatch } from '@shared/redux/store'


export const useDispatch = () => dispatch < AppDispatch > ()
export const useSelector: TypedUseSelectorHook < InitialState > = selector