import { Room } from '@/@types/roomTypes';
import { api } from '@/services/axiosClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface RoomsState {
  rooms: Room[];
  roomDetails: null | Room;
  loading: boolean;
  error: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  roomDetails: null,
  loading: false,
  error: null,
};
interface NewRoom {
  number: string;
  type: 'Simples' | 'Duplo' | 'Suite';
  price: number;
  status: 'Disponível' | 'Ocupado' | 'Em Manutenção';
}


export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await api.get('/rooms');
  return response.data;
});

export const fetchRoomDetails = createAsyncThunk('rooms/fetchRoomDetails', async (roomId: number) => {
  const response = await api.get(`/rooms/${roomId}`);
  return response.data;
});

export const createRoom = createAsyncThunk<Room, NewRoom>(
  'rooms/createRoom',
  async (newRoom: NewRoom) => {
    const response = await api.post<Room>('rooms', newRoom);

    if (response.status !== 201) {
      throw new Error('Erro ao criar o quarto');
    }

    return response.data;
  }
);
export const updateRoom = createAsyncThunk('rooms/updateRoom', async ({ id, room }: { id?: number; room: Room }) => {
  const response = await api.patch(`/rooms/${id}`, room);
  return response.data;
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: number) => {
  await api.delete(`/rooms/${id}`);
  return id;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rooms';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload
        state.loading = false;

      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex((room) => room.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      })
      .addCase(fetchRoomDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomDetails.fulfilled, (state, action) => {
        state.roomDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoomDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar os detalhes do quarto';
      });
  },
});

export default roomsSlice.reducer;

export const RoomReducer = roomsSlice.reducer;