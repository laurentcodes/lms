'use client';

import Link from 'next/link';

// icons
import { Plus } from 'lucide-react';

// components
import Bill from '@/components/bills/bill';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// utils
import { bills } from '@/utils/mock';

// store
import { authStore } from '@/app/store';

export default function LegislativeDashboard() {
	const { user } = authStore();

	const filteredBills = bills.filter(
		(bill) => bill?.sponsor?.name === user?.name
	);

	return (
		<div className='container mx-auto p-4 max-w-7xl'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Legislative Dashboard</h1>

				<Button asChild>
					<Link href='/dashboard/legislative/bills/create'>
						<Plus className='w-4 h-4 mr-2' />
						Create Bill
					</Link>
				</Button>
			</div>

			<Tabs defaultValue='my-bills' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='my-bills'>My Bills</TabsTrigger>
					<TabsTrigger value='all-bills'>All Bills</TabsTrigger>
				</TabsList>

				<TabsContent value='my-bills' className='space-y-4'>
					{filteredBills.map((bill) => (
						<Link
							key={bill.id}
							href={`/dashboard/legislative/bills/${bill.id}`}
							className='block transition-opacity hover:opacity-70'
						>
							<Bill bill={bill} />
						</Link>
					))}
				</TabsContent>

				<TabsContent value='all-bills'>
					{bills.map((bill) => (
						<Link
							key={bill.id}
							href={`/dashboard/legislative/bills/${bill.id}`}
							className='block transition-opacity hover:opacity-70'
						>
							<Bill bill={bill} />
						</Link>
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
}
