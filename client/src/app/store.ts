import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import VoteListReducer from './redux/voteListSlice'
import AddItemModalReducer from './redux/addItemModalSlice';
export const store = configureStore({
  reducer: {
    voteList: VoteListReducer,
    addItemModal: AddItemModalReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;