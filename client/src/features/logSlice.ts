import { Log } from '@/@types/logTypes';
import { api } from '@/services/axiosClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface LogsState {
  logs: Log[];
  loading: boolean;
  error: string | null;
}

const initialState: LogsState = {
  logs: [],
  loading: false,
  error: null,
};

export const fetchLogs = createAsyncThunk<Log[]>('logs/fetchLogs', async () => {
  const response = await api.get('/logs');
  return response.data;
});

const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar logs.';
      });
  },
});

export default logSlice.reducer;
export const LogReducer = logSlice.reducer;