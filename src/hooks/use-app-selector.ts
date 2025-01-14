import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {store} from '../store';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;
type State = ReturnType<typeof store.getState>;


export default useAppSelector;
