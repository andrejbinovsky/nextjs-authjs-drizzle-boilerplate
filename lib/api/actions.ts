'use server'

import { type z } from 'zod'
import { hash } from 'bcryptjs'

import { db } from '@/db'
import { users } from '@/db/schema'
import { type signUpSchema } from '@/app/(auth)/signup/signup-form'

export const registerUser = async (data: z.infer<typeof signUpSchema>) => {
  const hashed_password = await hash(data.password, 12)
  const res = await db
    .insert(users)
    .values({ email: data.email, password: hashed_password, name: `${data.firstName} ${data.lastName}`.trim() })
    .returning()
  if (res.length === 0) {
    throw new Error('Failed to create account')
  }
}
