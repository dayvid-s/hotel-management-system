"use client";
import { createServiceRequest, fetchServiceRequests, fetchServiceRequestsByUser } from '@/features/serviceRequestSlice';
import { AppDispatch } from '@/store';
import { useAppSelector } from '@/utils/useSelectorHook';
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface ServiceRequestFormData {
  description: string;
}

export default function ServiceRequests() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const serviceRequests = useAppSelector((state) => state.serviceRequest.requests);

  const userId = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchServiceRequestsByUser(userId)).unwrap().catch((err) => {
        console.error("Erro ao carregar as solicitações de serviço", err);
      });
    }
  }, [dispatch, userId]);

  const { register, handleSubmit, reset } = useForm<ServiceRequestFormData>();

  const onSubmit: SubmitHandler<ServiceRequestFormData> = async (data) => {
    try {
      if (!userId) {
        throw new Error("ID do hóspede não está disponível.");
      }

      const newRequest = {
        ...data,
        guestId: userId
      };

      await dispatch(createServiceRequest(newRequest)).unwrap();
      toast({ title: 'Solicitação de serviço criada com sucesso!', status: 'success' });
      reset();
      onClose();
      dispatch(fetchServiceRequests());
    } catch (error) {
      console.error("Erro ao criar a solicitação de serviço", error);
      toast({ title: 'Erro ao criar a solicitação de serviço.', status: 'error' });
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Solicitações de Serviços</Heading>
      <Divider mb={4} />

      <VStack spacing={4} align="start">
        {serviceRequests.length > 0 ? (
          serviceRequests.map((request) => (
            <Box key={request.id} p={4} borderWidth={1} borderRadius="md" width="100%">
              <Text><strong>Serviço:</strong> {request.description}</Text>
              <Text><strong>Status:</strong> {request.status}</Text>
            </Box>
          ))
        ) : (
          <Text>Nenhuma solicitação de serviço foi feita.</Text>
        )}
      </VStack>

      <Flex justify="flex-end" mt={6}>
        <Button colorScheme="blue" onClick={onOpen}>Fazer Nova Solicitação</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Solicitação de Serviço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel>Descrição do Serviço</FormLabel>
                <Input type="text" placeholder="Descreva o serviço..." {...register('description')} />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">Enviar Solicitação</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}