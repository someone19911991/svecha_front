import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState, AppStore, AppDispatch } from '../store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
