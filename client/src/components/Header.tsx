"use client";
import { logoutUser } from "@/features/authSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { Avatar, Box, Button, Flex, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";

export function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <Box bg="teal.500" p={6} color="white">
      <Flex justify="space-between" align="center">
        <Link href={user?.role === "guest" ? "/guest/dashboard" : "/admin/dashboard"}>
          <Heading as="h1" size="lg">
            Hotel System
          </Heading>
        </Link>

        <Menu>
          <MenuButton as={Button} rightIcon={<BiChevronDown />} variant="outline" colorScheme="whiteAlpha">
            <Flex alignItems="center">
              {user?.name ? (
                <>
                  <Avatar size="sm" name={user?.name} />
                  <Text ml={2}>{user?.name}</Text>
                </>
              ) : (
                <Text ml={2}>Carregando...</Text>
              )}
            </Flex>
          </MenuButton>
          <MenuList backgroundColor={"#fafafa"} >
            <MenuItem backgroundColor={"#fafafa"} color={"#202020"} onClick={handleLogout}>Sair Da Conta</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}