"use client";
import { signInAsync } from '@/features/authSlice';
import { AppDispatch } from '@/store';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<{
    email: string;
    password: string;
  }>();

  async function handleLogin(data: { email: string; password: string }) {
    Cookies.remove("auth_user");
    Cookies.remove("auth_token");
    const { email, password } = data;
    const resultAction = await dispatch(signInAsync({ identifier: email, password }));

    if (signInAsync.fulfilled.match(resultAction)) {
      router.push('/admin/dashboard');
    } else {
      const errorMessage = 'Senha ou email incorretos.';
      toast({
        position: 'top',
        title: "Erro ao fazer login",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Box as="section" py={12} height="100vh">
      <Container maxW="lg" textAlign="center">
        <VStack spacing={6} mb={10}>
          <Heading as="h1" size="2xl" color="teal.500">
            Login
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Por favor, insira suas credenciais para acessar o painel administrativo.
          </Text>
        </VStack>

        <Box bg="white" p={8} borderRadius="lg" shadow="md">
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl id="email" mb={6} isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="admin@example.com"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Email inválido"
                  }
                })}
              />
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </FormControl>

            <FormControl id="password" mb={6} isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="********"
                {...register("password", { required: "Senha é obrigatória" })}
              />
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>

            <Button
              colorScheme="teal"
              variant="solid"
              size="lg"
              width="full"
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Box>

        <Flex justify="center" mt={6}>
          <Text fontSize="sm" color="gray.500">
            Esqueceu a senha? Entre em contato com o suporte.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}