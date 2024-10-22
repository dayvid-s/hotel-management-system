"use client"
import { RoomForm, RoomFormData, RoomList } from '@/components/RoomForms';
import { createRoom, fetchRooms, updateRoom } from '@/features/roomSlice';
import { AppDispatch } from '@/store';
import { useAppSelector } from '@/utils/useSelectorHook';
import { Box, Button, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Page() {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const createDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();

  const { rooms, loading, error } = useAppSelector((state) => state.room);
  const [selectedRoom, setSelectedRoom] = useState<RoomFormData | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleEditOpen = (room: RoomFormData) => {
    setSelectedRoom(room);
    editDisclosure.onOpen();
  };

  const handleFormSubmit = async (data: RoomFormData) => {
    const newRoom = { number: data.number, type: data.type, price: data.price, status: data.status };

    try {
      if (selectedRoom) {
        await dispatch(updateRoom({ id: selectedRoom.id, room: newRoom })).unwrap();
        setSelectedRoom(undefined);
        toast({ title: 'Quarto atualizado.', status: 'success', duration: 5000, isClosable: true });
      } else {
        await dispatch(createRoom(newRoom)).unwrap();
        toast({ title: 'Quarto adicionado.', status: 'success', duration: 5000, isClosable: true });
      }
      createDisclosure.onClose();
      editDisclosure.onClose();
    } catch (error) {
      console.log(error)
      toast({ title: 'Erro.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  return (
    <Box p={5}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={5}>
        <Heading>Listagem de Quartos</Heading>

        <Button colorScheme="teal" onClick={createDisclosure.onOpen}>
          Criar Novo Quarto
        </Button>
      </Box>
      <RoomList rooms={rooms} loading={loading} error={error} onEdit={handleEditOpen} />

      <Modal isOpen={createDisclosure.isOpen} onClose={createDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Novo Quarto</ModalHeader>
          <ModalBody>
            <RoomForm onSubmit={handleFormSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              setSelectedRoom(undefined);
              createDisclosure.onClose();
            }}>Fechar</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Quarto</ModalHeader>
          <ModalBody>
            <RoomForm initialData={selectedRoom} onSubmit={handleFormSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={editDisclosure.onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}