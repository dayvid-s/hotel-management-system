"use client"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";


export function LandingPage() {
  const router = useRouter();
  function handleWithNavigation(page: string) {
    router.push(`/${page}`);
  }
  return (
    <Box as="section" py={12} bg="blue.50">
      <Container maxW="7xl" textAlign="center">
        <VStack spacing={6} mb={10}>
          <Heading as="h1" size="2xl" color="teal.500">
            Bem vindo ao seu Hotel Favorito!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Faça o check-in e gerencie suas estadias com tranquilidade. Aqui, tudo é pensado para o seu conforto!
          </Text>
          <Text fontSize="lg" color="gray.600">
            Hóspedes relaxam, e administradores mantêm tudo sob controle. 💼🌴
          </Text>
        </VStack>

        <Flex justify="center" mt={6} mb={12}>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={6}>
            <Button
              onClick={() => handleWithNavigation("LoginAdmin")}
              colorScheme="teal"
              variant="solid"
              size="lg"
              _hover={{ bg: 'teal.600' }}
            >
              Entrar como Administrador
            </Button>
            <Button colorScheme="teal" variant="outline" size="lg">
              Entrar como Hóspede
            </Button>
          </Stack>
        </Flex>

        <Box boxSize={{ base: '300px', md: '400px' }} mx="auto">
          <Image
            src="https://delmond.com.br/wp-content/uploads/2021/12/piscina-delmond-hotel-8.jpg"
            alt="Ambiente relaxante de hotel"
            borderRadius="xl"
            height="80"
            width="full"
            shadow="lg"
          />
        </Box>

        <Container maxW="7xl" mt={12}>
          <Heading as="h2" size="lg" mb={6} color="teal.500">
            O que temos para você?
          </Heading>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="stretch"
          >
            <Box
              p={6}
              bg="white"
              shadow="md"
              borderRadius="lg"
              flex="1"
              m={4}
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
            >
              <Heading as="h3" size="md" mb={4}>
                Para Hóspedes 🏨
              </Heading>
              <Text color="gray.600">
                Chegou a hora de relaxar! Acesse suas informações, verifique detalhes do seu quarto e solicite serviços extras. Afinal, você merece o melhor! ✨
              </Text>
            </Box>
            <Box
              p={6}
              bg="white"
              shadow="md"
              borderRadius="lg"
              flex="1"
              m={4}
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
            >
              <Heading as="h3" size="md" mb={4}>
                Para Administradores 💼
              </Heading>
              <Text color="gray.600">
                Aqui está o controle total! Gerencie quartos, hóspedes e reservas com facilidade. Tudo o que você precisa para manter o hotel funcionando perfeitamente.
              </Text>
            </Box>
          </Flex>
        </Container>

        <Container maxW="7xl" mt={12}>
          <Heading as="h2" size="lg" mb={6} color="teal.500">
            Por que esse sistema?
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Esse sistema foi feito para oferecer o máximo de praticidade tanto para hóspedes quanto para administradores. Tudo está a apenas um clique de distância.
          </Text>
          <Text fontSize="lg" color="gray.600">
            Hóspedes podem relaxar e aproveitar, enquanto os administradores mantêm o controle total do hotel de forma simples e eficiente. Vamos fazer uma gestão inteligente e tranquila!
          </Text>
        </Container>
      </Container>
    </Box>
  );
}