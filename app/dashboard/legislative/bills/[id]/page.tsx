'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// icons
import { ArrowLeft, Eye, FileText, Pencil, Save } from 'lucide-react';

// components
import { RichTextEditor } from '@/components/custom/rich-text-editor';
import { FileInput } from '@/components/custom/file-input';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

// store & data
import { billStore } from '@/app/store';
import { bills } from '@/utils/mock';

const billSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	category: z.string().min(1, 'Category is required'),
	committee: z.string().min(1, 'Committee is required'),
	description: z.string().min(1, 'Description is required'),
	fullText: z.string().min(1, 'Bill text is required'),
	status: z.string(),
	progress: z.number().min(0).max(100),
	sponsors: z.string().min(1, 'At least one sponsor is required'),
});

export default function BillPage() {
	const { id } = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const { billCategories } = billStore();
	// const [fullText, setFullText] = useState('');

	// Find the bill in our mock data
	const bill = bills.find((b) => b.id === Number(id));

	// Combine primary sponsor and co-sponsors into a comma-separated string
	const allSponsors = [
		bill?.sponsor?.name,
		...(bill?.coSponsors?.map((cs) => cs.name) || []),
	].join(', ');

	// Move the useForm hook here to ensure it's called unconditionally
	const form = useForm<z.infer<typeof billSchema>>({
		resolver: zodResolver(billSchema),
		defaultValues: {
			title: bill?.title || '',
			category: bill?.category || '',
			committee: bill?.committee || '',
			description: bill?.description || '',
			fullText: bill?.fullText || '',
			status: bill?.status || '',
			progress: bill?.progress || 0,
			sponsors: allSponsors,
		},
	});

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'draft':
				return 'bg-yellow-100 text-yellow-800';
			case 'under review':
				return 'bg-blue-100 text-blue-800';
			case 'passed':
				return 'bg-green-100 text-green-800';
			case 'rejected':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	function onSubmit(values: z.infer<typeof billSchema>) {
		console.log(values);
		// TODO: Implement update logic
		setIsEditing(false);
	}

	if (!bill) {
		return (
			<div className='container mx-auto p-4 max-w-3xl'>
				<h1 className='text-2xl font-bold'>Bill not found</h1>
			</div>
		);
	}

	return (
		<main className='container mx-auto p-4 max-w-3xl'>
			<div className='flex justify-between items-center mb-6'>
				<div className='flex items-center space-x-4'>
					<Button variant='outline' asChild>
						<Link href='/dashboard/legislative'>
							<ArrowLeft className='w-4 h-4 mr-2' />
							Back
						</Link>
					</Button>
				</div>

				{bill?.status !== 'Rejected' && (
					<div className='flex items-center space-x-2'>
						<Button onClick={() => setIsEditing(!isEditing)}>
							{isEditing ? (
								<Eye className='w-4 h-4 mr-2' />
							) : (
								<Pencil className='w-4 h-4 mr-2' />
							)}
							{isEditing ? 'View' : 'Edit'}
						</Button>
					</div>
				)}
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bill Title</FormLabel>
								<FormControl>
									<Input {...field} disabled={!isEditing} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={!isEditing}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{billCategories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>

									{isEditing ? (
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select status' />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												<SelectItem value='Draft'>Draft</SelectItem>
												<SelectItem value='Under Review'>
													Under Review
												</SelectItem>
												<SelectItem value='Passed'>Passed</SelectItem>
												<SelectItem value='Rejected'>Rejected</SelectItem>
											</SelectContent>
										</Select>
									) : (
										<div className='flex items-center h-10'>
											<Badge className={getStatusColor(field.value)}>
												{field.value}
											</Badge>
										</div>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='committee'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Committee</FormLabel>

									<FormControl>
										<Input {...field} disabled={!isEditing} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='progress'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress</FormLabel>

									<FormControl>
										<div className='space-y-2'>
											<Progress value={field.value} className='h-2' />

											<div className='flex justify-between text-sm text-gray-500'>
												<span>Submitted: {bill.submissionDate}</span>
												<span>Last Update: {bill.lastUpdate}</span>
											</div>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='sponsors'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sponsor(s)</FormLabel>

								<FormControl>
									<Input
										{...field}
										disabled={!isEditing}
										placeholder='Enter sponsor names (comma-separated)'
									/>
								</FormControl>

								<FormDescription>
									List the primary sponsor and any co-sponsors
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										disabled={!isEditing}
										className='min-h-[100px]'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='fullText'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bill Content</FormLabel>

								<FormControl>
									{isEditing ? (
										<RichTextEditor
											content={field.value}
											onChange={(content) => {
												// setFullText(content);
												field.onChange(content);
											}}
											placeholder='Enter the complete text of the bill'
										/>
									) : (
										<div
											className='prose prose-sm max-w-none min-h-[100px] p-4 rounded-md border bg-gray-50'
											dangerouslySetInnerHTML={{ __html: field.value }}
										/>
									)}
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='space-y-2'>
						<FormLabel>Attachments</FormLabel>

						<div className='space-y-2'>
							{bill.attachments.map((attachment) => (
								<div
									key={attachment.name}
									className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'
								>
									<div className='flex items-center space-x-2'>
										<FileText className='w-4 h-4 text-gray-500' />
										<span className='text-sm'>{attachment.name}</span>
									</div>

									<Button variant='ghost' size='sm'>
										Download
									</Button>
								</div>
							))}

							{isEditing && (
								<FileInput
									accept='.pdf,.doc,.docx,.txt'
									multiple
									onFilesChange={(files) => console.log(files)}
								/>
							)}
						</div>
					</div>

					{isEditing && (
						<div className='flex justify-end space-x-2'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</Button>

							<Button type='submit'>
								<Save className='w-4 h-4 mr-2' />
								Save Changes
							</Button>
						</div>
					)}
				</form>
			</Form>
		</main>
	);
}
