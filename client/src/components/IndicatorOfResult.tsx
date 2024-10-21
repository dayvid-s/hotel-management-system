"use client";
import { fetchGuests } from '@/features/guestSlice';
import { fetchRooms } from '@/features/roomSlice';
import { AppDispatch } from '@/store';
import { useAppSelector } from '@/utils/useSelectorHook';
import { Box, Divider, Heading, SimpleGrid, Stat, StatLabel, StatNumber, useToast } from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';

Chart.register(...registerables);

const serviceRequestsData = [
  { id: 1, request: 'Toalhas extras', status: 'Em andamento' },
  { id: 2, request: 'Limpeza do quarto', status: 'Concluído' },
  { id: 3, request: 'Reparo no ar condicionado', status: 'Em andamento' },
];

export function IndicatorOfResult() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const rooms = useAppSelector((state) => state.room.rooms);
  const guest = useAppSelector((state) => state.guest.guests);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchRooms()).unwrap();
        await dispatch(fetchGuests()).unwrap();
      } catch (error) {
        console.error(error)
        toast({ title: 'Erro ao carregar dados.', status: 'error', duration: 5000, isClosable: true });
      }
    };
    loadData();
  }, [dispatch, toast]);

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.status === 'Ocupado' || room.status === "Em Manutenção").length;

  const chartData = {
    labels: ['Hoje', 'Ontem', '2 dias atrás', '3 dias atrás', '4 dias atrás'],
    datasets: [
      {
        label: 'Quartos ocupados por dia',
        data: [occupiedRooms, 50, 40, 60, 70],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stat>
          <StatLabel>Total de Quartos</StatLabel>
          <StatNumber>{totalRooms}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Quartos Ocupados ou em Manutenção Hoje</StatLabel>
          <StatNumber>{occupiedRooms}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total de Hóspedes</StatLabel>
          <StatNumber>{guest.length}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Quartos Livres</StatLabel>
          <StatNumber>{totalRooms - occupiedRooms}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Divider my={6} />
      <Box mb={6}>
        <Heading size="md" mb={4}>Evolução de Quartos Ocupados P/dia</Heading>
        <Box height="300px">
          <Line data={chartData} options={chartOptions} />
        </Box>
      </Box>
      <Divider my={6} />
      <Box>
        <Heading size="md" mb={4}>Solicitações de Serviços Ativas</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {serviceRequestsData.map((request) => (
            <Box key={request.id} borderWidth={1} borderRadius="md" p={4}>
              <Heading size="sm">{request.request}</Heading>
              <p>Status: {request.status}</p>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}