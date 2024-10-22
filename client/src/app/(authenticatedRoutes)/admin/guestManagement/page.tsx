"use client"
import { GuestForm, GuestFormData, GuestList } from '@/components/GuestForms';
import { createGuest, fetchGuests, updateGuest } from '@/features/guestSlice';
import { fetchRooms } from '@/features/roomSlice';
import { AppDispatch } from '@/store';
import { useAppSelector } from '@/utils/useSelectorHook';
import { Box, Button, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function GuestsPage() {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const createDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();

  const { guests, loading, error } = useAppSelector((state) => state.guest);
  const [selectedGuest, setSelectedGuest] = useState<GuestFormData | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchRooms()),
        dispatch(fetchGuests())
      ]);
    };
    fetchData();
  }, [dispatch]);

  const handleEditOpen = (guest: GuestFormData) => {
    setSelectedGuest(guest);
    editDisclosure.onOpen();
  };

  const handleFormSubmit = async (data: GuestFormData) => {
    const newGuest = {
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      roomId: data.roomId
    };

    try {
      if (selectedGuest?.id !== undefined) {
        await dispatch(updateGuest({ id: selectedGuest.id, guest: newGuest })).unwrap();
        setSelectedGuest(undefined);
        toast({ title: 'Hóspede atualizado.', status: 'success', duration: 5000, isClosable: true });
      } else {
        await dispatch(createGuest(newGuest)).unwrap();
        toast({ title: 'Hóspede adicionado.', status: 'success', duration: 5000, isClosable: true });
      }
      createDisclosure.onClose();
      editDisclosure.onClose();
    } catch (error) {
      const errorMessage = (error as Error).message || 'Erro ao adicionar ou atualizar hóspede.';
      console.error(error);
      toast({ title: errorMessage, status: 'error', duration: 5000, isClosable: true });
    }
    // window.location.reload();
  };

  return (
    <Box p={5}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={5}>
        <Heading>Listagem de Hóspedes</Heading>
        <Button colorScheme="teal" onClick={createDisclosure.onOpen} isLoading={loading}>
          Criar Novo Hóspede
        </Button>
      </Box>
      <GuestList guests={guests} loading={loading} error={error} onEdit={handleEditOpen} />

      <Modal isOpen={createDisclosure.isOpen} onClose={createDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Novo Hóspede</ModalHeader>
          <ModalBody>
            <GuestForm onSubmit={handleFormSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={createDisclosure.onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Hóspede</ModalHeader>
          <ModalBody>
            <GuestForm initialData={selectedGuest} onSubmit={handleFormSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={editDisclosure.onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}