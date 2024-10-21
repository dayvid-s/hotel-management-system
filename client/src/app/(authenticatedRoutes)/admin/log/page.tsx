"use client";

import { Log } from '@/@types/logTypes';
import { fetchLogs } from '@/features/logSlice';
import { AppDispatch } from '@/store';
import { useAppSelector } from '@/utils/useSelectorHook';
import { Badge, Box, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function LogsPage() {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadLogs = async () => {
      try {
        await dispatch(fetchLogs()).unwrap();
      } catch (error) {
        console.log(error)
        toast({ title: 'Erro ao carregar logs.', status: 'error', duration: 5000, isClosable: true });
      }
    };
    loadLogs();
  }, [dispatch, toast]);

  const { logs, loading, error } = useAppSelector((state) => state.log);

  if (loading) return <Text>Carregando logs...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Histórico de ações no sistema</Heading>
      <VStack spacing={4} align="stretch">
        {logs.map((log: Log) => (
          <Box key={log.id} borderWidth={1} borderRadius="md" p={4} boxShadow="lg" bg="white" _hover={{ boxShadow: "xl" }} transition="0.2s">
            <HStack justify="space-between" align="center">
              <Box>
                <Heading size="md">{log.name}</Heading>
                <Text color="gray.600" fontSize="sm">{log.description}</Text>
              </Box>
              <Badge colorScheme={log.status === 'success' ? 'green' : log.status === 'error' ? 'red' : 'green'}>
                {log.status}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Criado em: {new Date(log.created_at).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
