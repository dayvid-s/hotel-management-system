import { Guest } from '@/@types/guestTypes';
import { api } from '@/services/axiosClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface GuestsState {
  guests: Guest[];
  loading: boolean;
  error: string | null;
}

const initialState: GuestsState = {
  guests: [],
  loading: false,
  error: null,
};

export const fetchGuests = createAsyncThunk('guests/fetchGuests', async () => {
  const response = await api.get('/guests');
  return response.data;
});

export const createGuest = createAsyncThunk<Guest, Omit<Guest, 'id'>>(
  'guests/createGuest',
  async (newGuest) => {
    const response = await api.post<Guest>('guests', newGuest);

    if (response.status !== 201) {
      throw new Error('Erro ao criar o hóspede');
    }

    return response.data;
  }
);

export const updateGuest = createAsyncThunk<Guest, { id: number; guest: Omit<Guest, 'id'> }>(
  'guests/updateGuest',
  async ({ id, guest }) => {
    const response = await api.put(`/guests/${id}`, guest);
    return response.data;
  }
);

export const deleteGuest = createAsyncThunk<number, number>(
  'guests/deleteGuest',
  async (id) => {
    await api.delete(`/guests/${id}`);
    return id;
  }
);

const guestsSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.guests = action.payload;
        state.loading = false;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Falha ao buscar hóspedes';
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        state.guests.push(action.payload);
      })
      .addCase(updateGuest.fulfilled, (state, action) => {
        const index = state.guests.findIndex((guest) => guest.id === action.payload.id);
        if (index !== -1) {
          state.guests[index] = action.payload;
        }
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.guests = state.guests.filter((guest) => guest.id !== action.payload);
      });
  },
});

export default guestsSlice.reducer;

export const GuestReducer = guestsSlice.reducer; 