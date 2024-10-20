"use client"

import { useAppSelector } from "@/utils/useSelectorHook";
import { Avatar, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
export function Header() {
  const userName = useAppSelector((state) => state.auth.user?.name);

  return (
    <div>
      <Box bg="teal.500" p={6} color="white">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">Hotel System</Heading>

          <Menu>
            <MenuButton as={Button} rightIcon={<BiChevronDown />} variant="outline" colorScheme="whiteAlpha">
              <Flex alignItems="center">
                {userName ? (
                  <>
                    <Avatar size="sm" name={userName} />
                    <Text ml={2}>{userName}</Text>
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