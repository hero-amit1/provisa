import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ContactFormState = {
    name: string;
    email: string;
    phone: string;
    address: string;
    subject: string;
    message: string;
};

type AppointmentFormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
    serviceId?: string;
};

type FormState = {
    contact: ContactFormState;
    appointment: AppointmentFormState;
};

const initialState: FormState = {
    contact: {
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        message: '',
    },
    appointment: {
        name: '',
        email: '',
        phone: '',
        message: '',
    },
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setContactField<K extends keyof ContactFormState>(
            state,
            action: PayloadAction<{ key: K; value: ContactFormState[K] }>
        ) {
            state.contact[action.payload.key] = action.payload.value;
        },
        resetContactForm(state) {
            state.contact = initialState.contact;
        },

        setAppointmentField<K extends keyof AppointmentFormState>(
            state,
            action: PayloadAction<{ key: K; value: AppointmentFormState[K] }>
        ) {
            state.appointment[action.payload.key] = action.payload.value;
        },
        resetAppointmentForm(state) {
            state.appointment = initialState.appointment;
        },
    },
});

export const {
    setContactField,
    resetContactForm,
    setAppointmentField,
    resetAppointmentForm,
} = formSlice.actions;

export default formSlice.reducer;

