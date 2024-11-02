import { type ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

import QueryProvider from '@/providers/query-provider'

const Providers = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <SessionProvider>{children}</SessionProvider>
  </QueryProvider>
)

export default Providers
