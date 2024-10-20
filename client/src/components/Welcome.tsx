import { useAppSelector } from "@/utils/useSelectorHook";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface WelcomeProps {
  pageName: string;
}

export function Welcome({ pageName }: WelcomeProps) {
  const userName = useAppSelector((state) => state.auth.user?.name);
  const dateOfToday = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateCapitalized = dateOfToday.charAt(0).toUpperCase() + dateOfToday.slice(1).replace('.', '');

  return (
    <Box width="full" p={2}>
      <Flex flexDirection="row">
        <Box>
          <Heading as="h1" size="2xl" mr={4}>
            Visão geral/ <strong style={{ opacity: 0.8 }}>{pageName}</strong>
          </Heading>
        </Box>
        <Flex alignItems="center" justifyContent="flex-end" ml="auto" mr={5}>
          <Text fontWeight="semibold" color="gray.600">{dateCapitalized}</Text>
        </Flex>
      </Flex>

      <Box mt={10}>
        <Heading as="h2" size="xl" color="gray.800">
          Seja bem-vindo, <strong style={{ opacity: 0.8 }}>{userName}.</strong>
        </Heading>
        <Text maxW="5xl" mt={4} mb={5} color="gray.600">
          Abaixo você encontrará informações essenciais sobre o painel, relatórios e gerenciamento de usuários.
          Este é o hub central para suas atividades no sistema. Explore e utilize as ferramentas disponíveis
          para otimizar sua experiência.
        </Text>
      </Box>
    </Box>
  );
}