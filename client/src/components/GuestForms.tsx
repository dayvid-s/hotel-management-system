import { fetchRooms } from '@/features/roomSlice';
import { dispatch } from '@/store';
import { useAppSelector } from '@/utils/useSelectorHook';
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type GuestFormData = {
  id?: number;
  name: string;
  cpf: string;
  password: string;
  roomId?: number;
};

interface GuestFormProps {
  initialData?: GuestFormData;
  onSubmit: SubmitHandler<GuestFormData>;
}

export const GuestForm: React.FC<GuestFormProps> = ({ initialData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<GuestFormData>({
    defaultValues: initialData,
  });
  const rooms = useAppSelector((state) => state.room.rooms);

  if (!rooms || rooms.length === 0) {
    return <p>Carregando quartos...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl id="name" isRequired isInvalid={!!errors.name}>
          <FormLabel>Nome do Hóspede</FormLabel>
          <Input
            type="text"
            placeholder="Digite o nome do hóspede"
            {...register('name', { required: true })}
          />
        </FormControl>

        <FormControl id="cpf" isRequired isInvalid={!!errors.cpf}>
          <FormLabel>CPF</FormLabel>
          <Input
            type="text"
            placeholder="Digite o CPF do hóspede"
            {...register('cpf', { required: true })}
          />
        </FormControl>

        <FormControl id="password" isRequired isInvalid={!!errors.password}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="Digite a senha do hóspede"
            {...register('password', { required: true })}
          />
        </FormControl>

        <FormControl id="roomId" isInvalid={!!errors.roomId}>
          <FormLabel>Quarto</FormLabel>
          <Select placeholder="Selecione um quarto" {...register('roomId')}>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                Quarto {room.number}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          {initialData ? 'Atualizar Hóspede' : 'Adicionar Hóspede'}
        </Button>
      </VStack>
    </form>
  );
};
interface GuestItemProps {
  guest: GuestFormData;
  onEdit: (guest: GuestFormData) => void;
}
interface GuestItemProps {
  guest: GuestFormData;
  onEdit: (guest: GuestFormData) => void;
}

export const GuestItem: React.FC<GuestItemProps> = ({ guest, onEdit }) => {

  const [room, setRoom] = useState<{ id: number; number: string } | null>(null);
  useEffect(() => {
    dispatch(fetchRooms()).then((result) => {
      const rooms = result.payload;
      const foundRoom = rooms.find((r: { id: number }) => r.id === guest.roomId);
      setRoom(foundRoom || null);
    });
  }, [guest.roomId]);

  return (
    <Box key={guest.id} borderWidth={1} borderRadius="md" p={4}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Heading size="md">{guest.name}</Heading>
        <Button colorScheme="blue" onClick={() => onEdit(guest)}>Editar</Button>
      </Box>
      <p>CPF: {guest.cpf}</p>
      <p>Quarto: {guest ? `Quarto ${room?.number}` : 'Não atribuído'}</p>
    </Box>
  );
};


interface GuestListProps {
  guests: GuestFormData[];
  password?: string;
  loading: boolean;
  error: string | null;
  onEdit: (guest: GuestFormData) => void;
}

export const GuestList: React.FC<GuestListProps> = ({ guests, loading, error, onEdit }) => {
  if (loading) return <p>Carregando hóspedes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <VStack spacing={4} align="stretch">
      {guests.map((guest) => (
        <GuestItem key={guest.id} guest={guest} onEdit={onEdit} />
      ))}
    </VStack>
  );
};