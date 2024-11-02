'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'

type QueryProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default QueryProvider
