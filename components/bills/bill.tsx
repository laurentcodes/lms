// components
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

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

export default function Bill({ bill }: { bill: any }) {
	return (
		<Card key={bill.id} className='mb-4'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<div>
					<CardTitle className='text-xl mb-1'>{bill.title}</CardTitle>

					<CardDescription>
						Bill #{bill.billNumber} • {bill.category}
					</CardDescription>
				</div>

				<Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
			</CardHeader>

			<CardContent>
				<div className='space-y-4'>
					<div className='flex items-center space-x-4'>
						<Avatar>
							<AvatarImage src={bill.sponsor.image || undefined} />
							<AvatarFallback>{bill.sponsor.initials}</AvatarFallback>
						</Avatar>

						<div>
							<p className='text-sm font-medium'>
								Sponsor: {bill.sponsor.name}
							</p>

							<p className='text-sm text-gray-500'>
								Committee: {bill.committee}
							</p>
						</div>
					</div>

					<div>
						<div className='flex justify-between text-sm text-gray-500 mb-2'>
							<span>Progress</span>
							<span>{bill.progress}%</span>
						</div>

						<Progress value={bill.progress} className='h-2' />
					</div>

					<div className='flex items-center justify-between text-sm'>
						<div className='flex space-x-4'>
							{bill.steps.map((step: number, index: number) => (
								<div key={step} className='flex items-center'>
									<div
										className={`w-2 h-2 rounded-full ${
											index <= bill.currentStep ? 'bg-blue-600' : 'bg-gray-200'
										}`}
									/>

									{/* {index < bill.steps.length - 1 && (
										<Separator className='w-8 mx-2' />
									)} */}
								</div>
							))}
						</div>
					</div>

					<div className='flex justify-between text-sm text-gray-500'>
						<span>Submitted: {bill.submissionDate}</span>
						<span>Last Update: {bill.lastUpdate}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
