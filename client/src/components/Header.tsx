"use client"

import { useAppSelector } from "@/utils/useSelectorHook";
import { Avatar, Box, Button, Flex, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
export function Header() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <Box bg="teal.500" p={6} color="white">
        <Flex justify="space-between" align="center">
          <Link href={user?.role === "guest" ? "/guest/dashboard" : "/admin/dashboard"}>
            <Heading as="h1" size="lg">Hotel System</Heading>
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
            <MenuList>
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </div>
  );
};