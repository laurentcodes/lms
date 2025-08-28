'use client';

import Link from 'next/link';

// form
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// components
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// store
import { authStore } from '../store';

const signInSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email'),
	password: z.string().min(1, 'Password is required'),
});

export default function SignIn() {
	const { login } = authStore();

	const defaultValues = {
		email: 'admin@lms.com',
		password: 'admin1234',
	};

	const methods = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues,
	});

	const { handleSubmit, control } = methods;

	const onSubmit = (values: z.infer<typeof signInSchema>) => {
		login(values.email, values.password);
	};

	return (
		<main className='container max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-4 space-y-6'>
			<Card className='w-full'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl text-center'>
						Legislative Management System
					</CardTitle>

					<CardDescription className='text-center'>
						Sign in to access the dashboard
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='admin@lms.com'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='admin1234'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='text-center text-sm text-muted-foreground bg-muted/30 p-3 rounded-md'>
								<strong>Demo Credentials</strong>
								<br />
								Email: admin@lms.com | Password: admin1234
							</div>

							<Button type='submit' className='w-full'>
								Sign In
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>

			<div className='text-center text-sm text-muted-foreground'>
				Don&apos;t have an account?{' '}
				<Link
					href='/sign-up'
					className='text-primary font-medium hover:underline'
				>
					Create an account
				</Link>
			</div>
		</main>
	);
}
