import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import { accounts, sessions, users, verificationTokens } from '@/db/schema'
import { db } from '@/db'

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super()
    this.code = message || 'Login failed. Please check your username and password and try again.'
  }
}

export const { handlers, auth } = NextAuth({
  session: { strategy: 'jwt' },
  debug: true,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }),
  pages: {
    signIn: '/signin'
  },
  providers: [
    Credentials({
      name: 'Sign in',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new InvalidLoginError('Credentials not found.')
        }

        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, String(credentials.email).trim())
        })

        if (!user || !(await bcrypt.compare(String(credentials.password), user.password!))) {
          throw new InvalidLoginError('User with given credentials not found.')
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id
        }
      }
      return token
    },
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string
        }
      }
    }
  }
})
