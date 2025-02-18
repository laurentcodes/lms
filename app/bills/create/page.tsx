'use client';

import Link from 'next/link';
import { useState } from 'react';

// form
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// icons
import { ArrowLeft, Save, Send, X, XCircle } from 'lucide-react';

// components
import { FileInput } from '@/components/custom/file-input';
import { RichTextEditor } from '@/components/custom/rich-text-editor';

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

// store
import { billStore } from '@/app/store';

// utils
import { getFileTypeLabel } from '@/utils/functions';

const ACCEPTED_FILE_TYPES = [
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'text/plain',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function CreateBill() {
	const [attachments, setAttachments] = useState<File[]>([]);
	const [fullText, setFullText] = useState('');

	const { billCategories } = billStore();

	console.log(billCategories);

	const createBillSchema = z.object({
		title: z.string().min(1, 'Title is required'),
		category: z.enum(billCategories as [string, ...string[]], {
			required_error: 'Please select a category',
		}),
		sponsors: z.string().min(1, 'At least one sponsor is required'),
		description: z.string().min(1, 'Description is required'),
		fullText: z.string().min(1, 'Bill text is required'),
	});

	const defaultValues = {
		title: '',
		description: '',
		sponsors: '',
		fullText: '',
	};

	const methods = useForm<z.infer<typeof createBillSchema>>({
		resolver: zodResolver(createBillSchema),
		defaultValues,
	});

	const { handleSubmit, control } = methods;

	const handleFileChange = (files: File[]) => {
		const validFiles = files.filter(
			(file) =>
				ACCEPTED_FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
		);

		if (validFiles.length !== files.length) {
			alert(
				'Some files were rejected. Please only upload PDF, Word documents, or text files under 10MB.'
			);
		}

		setAttachments((prev) => [...prev, ...validFiles]);
	};

	const removeAttachment = (index: number) => {
		setAttachments((prev) => prev.filter((_, i) => i !== index));
	};

	function onSubmit(values: z.infer<typeof createBillSchema>) {
		// TODO: Implement form submission with attachments
		console.log({ ...values, attachments });
	}

	return (
		<main className='container mx-auto p-4 max-w-3xl'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Create New Bill</h1>
				<Button variant='outline' asChild>
					<Link href='/'>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Back
					</Link>
				</Button>
			</div>

			<Form {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bill Title</FormLabel>
								<FormControl>
									<Input placeholder='Enter bill title' {...field} />
								</FormControl>
								<FormDescription>
									Provide a clear and concise title for the bill
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
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
								<FormDescription>
									Choose the most relevant category for your bill
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='sponsors'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sponsor(s)</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter sponsor names (comma-separated)'
										{...field}
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
						control={control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Enter a brief description of the bill'
										className='min-h-[100px]'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Provide a summary of the bill&apos;s purpose and main
									provisions
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='fullText'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bill Content</FormLabel>
								<FormControl>
									<RichTextEditor
										content={fullText}
										onChange={(content) => {
											setFullText(content);
											field.onChange(content);
										}}
										placeholder='Enter the complete text of the bill'
									/>
								</FormControl>
								<FormDescription>
									Enter the complete legislative text of the bill
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormItem>
						<FormLabel>Attachments</FormLabel>
						<div className='space-y-4'>
							<FormControl>
								<FileInput
									accept='.pdf,.doc,.docx,.txt'
									multiple
									onFilesChange={handleFileChange}
								/>
							</FormControl>
							<FormDescription>
								Upload supporting documents (PDF, Word, or text files, max 10MB
								each)
							</FormDescription>

							{attachments.length > 0 && (
								<div className='space-y-2'>
									{attachments.map((file, index) => (
										<div
											key={`${file.name}-${index}`}
											className='flex items-center justify-between bg-muted/50 p-2 rounded-md'
										>
											<div className='flex items-center space-x-2'>
												<Badge variant='outline' className='text-xs'>
													{getFileTypeLabel(file)}
												</Badge>

												<span className='text-sm text-muted-foreground'>
													{file.name}
												</span>
											</div>

											<Button
												type='button'
												variant='ghost'
												size='sm'
												onClick={() => removeAttachment(index)}
												className='h-auto p-1 hover:bg-muted'
											>
												<X className='h-4 w-4' />
											</Button>
										</div>
									))}
								</div>
							)}
						</div>
					</FormItem>

					<div className='flex justify-between'>
						<div className='flex gap-4'>
							<Button type='submit'>
								<Send className='w-4 h-4 mr-2' />
								Submit
							</Button>
							<Button type='submit' variant='outline'>
								<Save className='w-4 h-4 mr-2' />
								Save Draft
							</Button>
						</div>

						<Button type='button' variant='destructive' asChild>
							<Link href='/'>
								<XCircle className='w-4 h-4 mr-2' />
								Cancel
							</Link>
						</Button>
					</div>
				</form>
			</Form>
		</main>
	);
}
