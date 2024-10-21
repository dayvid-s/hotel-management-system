import { ServiceRequest } from '@/@types/serviceRequestTypes';
import { api } from '@/services/axiosClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ServiceRequestState {
  requests: ServiceRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceRequestState = {
  requests: [],
  loading: false,
  error: null,
};

export const fetchServiceRequests = createAsyncThunk(
  'serviceRequests/fetchServiceRequests',
  async () => {
    const response = await api.get<ServiceRequest[]>('/service-requests');
    return response.data;
  }
);

export const fetchServiceRequestsByUser = createAsyncThunk(
  'serviceRequests/fetchServiceRequestsByUser',
  async (guestId: number) => {
    const response = await api.get<ServiceRequest[]>(`/service-requests?guestId=${guestId}`);
    return response.data;
  }
);

export const createServiceRequest = createAsyncThunk(
  'serviceRequests/createServiceRequest',
  async (newRequest: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<ServiceRequest>('/service-requests', newRequest);
    return response.data;
  }
);

const serviceRequestSlice = createSlice({
  name: 'serviceRequests',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchServiceRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar as solicitações';
      })
      .addCase(fetchServiceRequestsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceRequestsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchServiceRequestsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar as solicitações do hóspede';
      })
      .addCase(createServiceRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createServiceRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar solicitação';
      });
  },
});

export default serviceRequestSlice.reducer;
export const ServiceRequestReducer = serviceRequestSlice.reducer;