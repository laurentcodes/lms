'use client';

import Link from 'next/link';

// icons
import { Plus, LogOut } from 'lucide-react';

// components
import Bill from '@/components/bills/bill';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// utils
import { bills } from '@/utils/mock';

// store
import { authStore } from '@/app/store';

export default function Dashboard() {
	const { logout } = authStore();

	return (
		<main className='container mx-auto p-4 max-w-7xl'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Legislative Dashboard</h1>

				<div className='flex gap-4'>
					<Button asChild>
						<Link href='/bills/create'>
							<Plus className='w-4 h-4 mr-2' />
							Create Bill
						</Link>
					</Button>

					<Button variant='outline' onClick={logout}>
						<LogOut className='w-4 h-4 mr-2' />
						Sign Out
					</Button>
				</div>
			</div>

			<Tabs defaultValue='my-bills' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='my-bills'>My Bills</TabsTrigger>
					<TabsTrigger value='all-bills'>All Bills</TabsTrigger>
				</TabsList>

				<TabsContent value='my-bills' className='space-y-4'>
					{bills.slice(0, 1).map((bill) => (
						<Bill key={bill.id} bill={bill} />
					))}
				</TabsContent>

				<TabsContent value='all-bills'>
					{bills.map((bill) => (
						<Bill key={bill.id} bill={bill} />
					))}
				</TabsContent>
			</Tabs>
		</main>
	);
}
