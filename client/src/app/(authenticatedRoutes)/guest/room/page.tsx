/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { fetchRoomDetails, updateRoom } from '@/features/roomSlice';
import { AppDispatch } from '@/store';
import { useAppSelector } from '@/utils/useSelectorHook';
import { Box, Button, Divider, Flex, Heading, Text, VStack, useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function RoomDetails() {
  const user = useAppSelector((state) => state.auth.user);
  const room = useAppSelector((state) => state.room.roomDetails);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  useEffect(() => {
    if (user && user?.roomId != undefined) {
      dispatch(fetchRoomDetails(user.roomId))
        .unwrap()
        .catch(() => {
          toast({ title: 'Erro ao carregar os detalhes do quarto.', status: 'error', duration: 5000, isClosable: true });
        });
    }
  }, [dispatch, user, toast]);

  if (!room) {
    return <Text>Carregando detalhes do quarto...</Text>;
  }

  const handleCheckIn = async () => {
    if (room.id) {
      const { id, ...roomWithoutId } = room;
      const updatedRoom = { ...roomWithoutId, checkIn: new Date() };
      await dispatch(updateRoom({ id: room.id, room: updatedRoom }))
        .unwrap()
        .then(() => {
          toast({ title: 'Check-in realizado com sucesso!', status: 'success', duration: 5000, isClosable: true });
          router.push('/guest/dashboard');
        })
        .catch(() => {
          toast({ title: 'Erro ao realizar check-in.', status: 'error', duration: 5000, isClosable: true });
        });
    }
  };
  const handleCheckout = async () => {
    if (room.id) {
      const { id, ...roomWithoutId } = room;
      const updatedRoom = { ...roomWithoutId, checkOut: new Date() };
      await dispatch(updateRoom({ id: room.id, room: updatedRoom }))
        .unwrap()
        .then(() => {
          toast({ title: 'Checkout realizado com sucesso!', status: 'success', duration: 5000, isClosable: true });
          router.push('/guest/dashboard');
        })
        .catch(() => {
          toast({ title: 'Erro ao realizar checkout.', status: 'error', duration: 5000, isClosable: true });
        });
    }
  };


  return (
    <Box p={6}>
      <Heading mb={4}>Detalhes do Quarto</Heading>
      <Divider mb={4} />
      <VStack spacing={4} align="start">
        <Text><strong>Status:</strong> {room.status}</Text>
        <Text><strong>Tipo de Quarto:</strong> {room.type}</Text>
        <Text><strong>Data de Check-in:</strong> {room.checkIn ? dayjs(room.checkIn).format('DD/MM/YYYY') : 'Não definido'}</Text>
        <Text><strong>Data de Check-out:</strong> {room.checkOut ? dayjs(room.checkOut).format('DD/MM/YYYY') : 'Não definido'}</Text>
      </VStack>
      <Divider my={6} />
      <Flex justify="flex-end" gap={4}>
        {!room.checkIn && (
          <Button colorScheme="green" onClick={handleCheckIn}>Fazer Check-in</Button>
        )}
        {room.checkIn && !room.checkOut && (
          <Button colorScheme="red" onClick={handleCheckout}>Fazer Checkout</Button>
        )}
        <Button disabled={room?.checkOut ? true : false} colorScheme="blue"
        // onClick={() => router.push('/guest/serviceRequest')}
        >Solicitar Serviço</Button>
        <Button colorScheme="teal" onClick={() => router.push('/guest/dashboard')}>Voltar ao Dashboard</Button>
      </Flex>
    </Box>
  );
}