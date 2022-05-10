import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VoteListItemProps } from "../components/VoteListItem/VoteListItem";
import { RootState } from "../store";

export interface VoteListState {
  list: Array<VoteListItemProps>;
  voteButtonWidth?: number;
}

const initialState: VoteListState = {
  list: [],
};

const sort = (arr: Array<VoteListItemProps>): Array<VoteListItemProps> =>
  arr.sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes));

export const voteListSlice = createSlice({
  name: "voteList",
  initialState,
  reducers: {
    setVoteList: (state, action: PayloadAction<Array<VoteListItemProps>>) => {
      state.list = sort(action.payload);
    },
  },
});

export const { setVoteList } = voteListSlice.actions;
export const getVoteList = (state: RootState) => state.voteList.list;
export default voteListSlice.reducer;
