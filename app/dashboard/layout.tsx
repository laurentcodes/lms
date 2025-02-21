'use client';

import Link from 'next/link';

// icons
import { LogOut, Home } from 'lucide-react';

// components
import { Button } from '@/components/ui/button';

// store
import { authStore } from '@/app/store';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, logout } = authStore();

	return (
		<div className='min-h-screen flex flex-col'>
			<header className='border-b'>
				<div className='container mx-auto p-4 max-w-7xl flex justify-between items-center'>
					<div className='flex items-center gap-4'>
						<Button variant='ghost' size='sm' asChild>
							<Link href='/dashboard'>
								<Home className='w-4 h-4' />
							</Link>
						</Button>
					</div>

					<div className='flex items-center gap-4'>
						<p className='text-sm text-gray-500 font-semibold'>{user?.name}</p>

						<Button variant='outline' size='sm' onClick={logout}>
							<LogOut className='w-4 h-4 mr-2' />
							Sign Out
						</Button>
					</div>
				</div>
			</header>

			<main className='flex-1'>{children}</main>
		</div>
	);
}
