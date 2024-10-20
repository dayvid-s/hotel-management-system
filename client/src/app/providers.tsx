'use client'

import { newTheme } from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={newTheme}>{children}</ChakraProvider>
}