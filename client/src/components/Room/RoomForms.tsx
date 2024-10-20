import { Box, Button, FormControl, FormLabel, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type RoomFormData = {
  id?: number;
  number: string;
  type: 'Simples' | 'Duplo' | 'Suite';
  price: number;
  status: 'Disponível' | 'Ocupado' | 'Em Manutenção';
};

interface RoomFormProps {
  initialData?: RoomFormData;
  onSubmit: SubmitHandler<RoomFormData>;
}

export const RoomForm: React.FC<RoomFormProps> = ({ initialData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RoomFormData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl id="number" isRequired isInvalid={!!errors.number}>
          <FormLabel>Número do Quarto</FormLabel>
          <Input
            type="text"
            placeholder="Digite o número do quarto"
            {...register('number', { required: true })}
          />
        </FormControl>

        <FormControl id="type" isRequired isInvalid={!!errors.type}>
          <FormLabel>Tipo de Quarto</FormLabel>
          <Select
            placeholder="Selecione o tipo de quarto"
            {...register('type', { required: true })}
          >
            <option value="Simples">Simples</option>
            <option value="Duplo">Duplo</option>
            <option value="Suite">Suíte</option>
          </Select>
        </FormControl>

        <FormControl id="price" isRequired isInvalid={!!errors.price}>
          <FormLabel>Preço por Diária</FormLabel>
          <Input
            type="number"
            placeholder="Digite o preço"
            {...register('price', { required: true })}
          />
        </FormControl>

        <FormControl id="status" isRequired isInvalid={!!errors.status}>
          <FormLabel>Status</FormLabel>
          <Select
            placeholder="Selecione o status"
            {...register('status', { required: true })}
          >
            <option value="Disponível">Disponível</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Em Manutenção">Em Manutenção</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          {initialData ? 'Atualizar Quarto' : 'Adicionar Quarto'}
        </Button>
      </VStack>
    </form>
  );
};




interface RoomItemProps {
  room: RoomFormData;
  onEdit: (room: RoomFormData) => void;
}

export const RoomItem: React.FC<RoomItemProps> = ({ room, onEdit }) => {
  return (
    <Box key={room.number} borderWidth={1} borderRadius="md" p={4}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" >
        <Heading size="md">Número: {room.number}</Heading>
        <Button colorScheme="blue" onClick={() => onEdit(room)}>Editar</Button>
      </Box>
      <p>Tipo: {room.type}</p>
      <p>Preço: R$ {room.price}</p>
      <p>Status: {room.status}</p>
    </Box>
  );
};




interface RoomListProps {
  rooms: RoomFormData[];
  loading: boolean;
  error: string | null;
  onEdit: (room: RoomFormData) => void;
}

export const RoomList: React.FC<RoomListProps> = ({ rooms, loading, error, onEdit }) => {
  if (loading) return <p>Carregando quartos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <VStack spacing={4} align="stretch">
      {rooms.map((room) => (
        <RoomItem key={room.number} room={room} onEdit={onEdit} />
      ))}
    </VStack>
  );
};