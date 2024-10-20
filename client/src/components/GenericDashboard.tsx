'use client';

import { Welcome } from '@/components/Welcome';
import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface LinkItem {
  href: string;
  icon: JSX.Element;
  label: string;
}

interface GenericDashboardProps {
  links: LinkItem[];
  pageName: string;
}

export default function GenericDashboard({ links, pageName }: GenericDashboardProps) {
  return (
    <Box p={10}>
      <Welcome pageName={pageName} />

      <Box zIndex={50} boxShadow="md" borderRadius="lg" p={4}>
        <Flex gap={4} overflowX="auto">
          {links.map((link, index) => (
            <Link href={link.href} key={index}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                borderRadius="lg"
                borderWidth={2}
                borderColor="teal.400"
                bg="teal.500"
                _hover={{ bg: "teal.100" }}
                color="gray.800"
                width="80"
                height="64"
                textAlign="center"
                cursor="pointer"
                transition="background-color 0.3s"
              >

                {link.icon}
                <Text color="white" fontWeight={600} mt={2}>{link.label}</Text>
              </Box>
            </Link>
          ))}
        </Flex>
      </Box>

      <Box mt={10}>
        <Text>Informações gerais</Text>
      </Box>
    </Box>
  );
}