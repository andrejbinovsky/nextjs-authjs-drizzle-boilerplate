'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
const SignInForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      signIn('credentials', {
        ...credentials,
        redirect: false
      }),

    onError: (error) => {
      console.error(error)
      toast.error(`Failed to sign in: ${error.message}`, { id: 'loginIn' })
    },
    onSuccess: async (data) => {
      if (data?.error) {
        console.error(data.error)
        toast.error(data.code, { id: 'loginIn' })
      } else {
        toast.success('Signed in', { id: 'loginIn' })
        router.push('/')
      }
    }
  })

  useEffect(() => {
    if (isPending) toast.loading('Signing in...', { id: 'loginIn' })
  }, [isPending])

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    mutate(values)
  }

  return (
    <Card className='w-full max-w-sm'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='m@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button className='w-full'>Sign in</Button>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/signup/' className='underline'>
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default SignInForm
