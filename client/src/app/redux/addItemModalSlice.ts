import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AddItemModalState {
    show: boolean,
}

const initialState: AddItemModalState = {
    show: false,
};

export const addItemModalSlice = createSlice({
    name: 'addItemModal',
    initialState,
    reducers: {
        showAddItemModal: (state) => {
            state.show = true;
        },

        hideAddItemModal: (state) => {
            state.show = false;
        },
    },
});

export const { showAddItemModal, hideAddItemModal } = addItemModalSlice.actions;
export const isAddItemModalOpened = (state: RootState) => state.addItemModal.show;
export default addItemModalSlice.reducer;