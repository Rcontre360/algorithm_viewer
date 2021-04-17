import { useDispatch as dispatch, useSelector as selector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store'


export const useDispatch = () => dispatch < AppDispatch > ()
export const useSelector: TypedUseSelectorHook < RootState > = selector