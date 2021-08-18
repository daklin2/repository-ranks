import { TypedUseSelectorHook, useDispatch as useDispatchOrg, useSelector as useSelectorOrg } from 'react-redux';
import type { AppState, AppDispatch } from '../store/store';

export const useDispatch = () => useDispatchOrg<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useSelectorOrg;