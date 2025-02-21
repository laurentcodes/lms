'use client';

import Link from 'next/link';

export default function Dashboard() {
	return (
		<div className='container mx-auto p-4 max-w-7xl'>
			<div className='mb-6'>
				<h1 className='text-2xl font-bold'>
					Hi Admin, Welcome to Legislative Management System
				</h1>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{/* Legislative Dashboard Card */}
				<Link href='/dashboard/legislative' className='group'>
					<div className='border rounded-lg p-6 hover:border-primary transition-colors'>
						<h2 className='text-2xl font-semibold mb-2 group-hover:text-primary'>
							Legislative Dashboard
						</h2>

						<p className='text-muted-foreground'>
							Manage and track legislative bills, their status, and related
							activities.
						</p>
					</div>
				</Link>

				{/* Voting Dashboard Card */}
				<Link href='/dashboard/voting' className='group'>
					<div className='border rounded-lg p-6 hover:border-primary transition-colors'>
						<h2 className='text-2xl font-semibold mb-2 group-hover:text-primary'>
							Voting Dashboard
						</h2>

						<p className='text-muted-foreground'>
							Create and manage votes, view results, and analyze voting trends.
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
