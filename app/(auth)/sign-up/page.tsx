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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// store
import { authStore } from '@/app/store';

const AVAILABLE_ROLES = [
	'Legislator',
	'Committee Member',
	'Staff Member',
	// 'Administrator',
	// 'Legal Advisor',
	// 'Policy Analyst',
	// 'Research Assistant',
] as const;

export default function SignUp() {
	const { register } = authStore();

	const signUpSchema = z
		.object({
			firstName: z.string().min(1, 'First name is required'),
			lastName: z.string().min(1, 'Last name is required'),
			email: z
				.string()
				.min(1, 'Email is required')
				.email('Please enter a valid email'),
			role: z.enum(AVAILABLE_ROLES, {
				required_error: 'Please select your role',
				invalid_type_error: 'Please select a valid role',
			}),
			password: z.string().min(6, 'Password must be at least 6 characters'),
			passwordConfirm: z
				.string()
				.min(6, 'Password confirmation must be at least 6 characters'),
		})
		.refine((data) => data.password === data.passwordConfirm, {
			message: "Passwords don't match",
			path: ['passwordConfirm'],
		});

	const defaultValues = {
		firstName: '',
		lastName: '',
		email: '',
		role: undefined,
		password: '',
		passwordConfirm: '',
	};

	const methods = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues,
	});

	const { handleSubmit, control } = methods;

	const onSubmit = (values: z.infer<typeof signUpSchema>) => {
		const user = {
			id: 1,
			name: `${values.firstName} ${values.lastName}`,
			email: values.email,
			role: values.role,
		};
		register(user);
	};

	return (
		<main className='container max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-4 space-y-6'>
			<Card className='w-full'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl text-center'>
						Legislative Management System
					</CardTitle>

					<CardDescription className='text-center'>
						Create an account to access the dashboard
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder='Enter your first name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder='Enter your last name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='Enter your email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name='role'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select your role' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{AVAILABLE_ROLES.map((role) => (
													<SelectItem key={role} value={role}>
														{role}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Select the role that best describes your position
										</FormDescription>
										<FormMessage className='font-medium' />
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
												placeholder='Enter your password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name='passwordConfirm'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='Confirm your password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit' className='w-full'>
								Sign Up
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>

			<div className='text-center text-sm text-muted-foreground'>
				Already have an account?{' '}
				<Link href='/' className='text-primary font-medium hover:underline'>
					Sign in
				</Link>
			</div>
		</main>
	);
}
