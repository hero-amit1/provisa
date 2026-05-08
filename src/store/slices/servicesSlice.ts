import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ServiceKey = string;

type ServicesState = {
    selectedServiceId: ServiceKey | null;
};

const initialState: ServicesState = {
    selectedServiceId: null,
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setSelectedServiceId(state, action: PayloadAction<ServiceKey>) {
            state.selectedServiceId = action.payload;
        },
        clearSelectedServiceId(state) {
            state.selectedServiceId = null;
        },
    },
});

export const { setSelectedServiceId, clearSelectedServiceId } = servicesSlice.actions;
export default servicesSlice.reducer;

