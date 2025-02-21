import { useState } from 'react';

// icons
import { EyeOff, ThumbsDown, ThumbsUp, Users } from 'lucide-react';

// components
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export const VoteCard = ({ vote }: { vote: any }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className='border rounded-lg p-6 space-y-4'>
			<div className='flex justify-between items-start'>
				<div>
					<h2 className='text-2xl font-semibold'>{vote.title}</h2>

					<p className='text-sm text-muted-foreground'>
						Total Votes: {vote.totalVotes}
					</p>
				</div>

				<div className='flex items-center gap-2'>
					{vote.showVoters ? (
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<Button variant='ghost' size='sm' className='h-8'>
									<Users className='w-4 h-4 mr-1' />
									<span className='text-xs'>View Voters</span>
								</Button>
							</DialogTrigger>

							<DialogContent>
								<DialogHeader>
									<DialogTitle>Voters for "{vote.title}"</DialogTitle>
								</DialogHeader>

								<div className='space-y-4'>
									{vote.voters.length > 0 ? (
										<div className='divide-y'>
											{vote.voters.map((voter: any, index: number) => (
												<div
													key={index}
													className='flex items-center justify-between py-3'
												>
													<span className='font-medium'>{voter.name}</span>

													<span className='flex items-center gap-1'>
														{voter.vote === 'yes' ? (
															<ThumbsUp className='w-4 h-4 text-green-600' />
														) : (
															<ThumbsDown className='w-4 h-4 text-red-600' />
														)}

														<span
															className={
																voter.vote === 'yes'
																	? 'text-green-600'
																	: 'text-red-600'
															}
														>
															Voted {voter.vote}
														</span>
													</span>
												</div>
											))}
										</div>
									) : (
										<p className='text-center text-muted-foreground'>
											No voters to display
										</p>
									)}
								</div>
							</DialogContent>
						</Dialog>
					) : (
						<Button variant='ghost' size='sm' className='h-8' disabled>
							<EyeOff className='w-4 h-4 mr-1' />

							<span className='text-xs'>Voters Hidden</span>
						</Button>
					)}
					<span
						className={`px-2 py-1 rounded-full text-xs ${
							vote.status === 'active'
								? 'bg-green-100 text-green-800'
								: 'bg-gray-100 text-gray-800'
						}`}
					>
						{vote.status}
					</span>
				</div>
			</div>

			<div className='space-y-2'>
				<div className='flex justify-between text-sm'>
					<span>Yes: {vote.yes}</span>
					<span>No: {vote.no}</span>
				</div>

				<Progress value={(vote.yes / vote.totalVotes) * 100} className='h-2' />
			</div>

			{vote.status === 'active' && (
				<div className='flex gap-2 mt-4'>
					<Button
						className='flex-1 bg-green-400 text-white hover:bg-green-600 hover:text-white'
						variant='outline'
					>
						<ThumbsUp className='w-4 h-4 mr-2' />
						Vote Yes
					</Button>

					<Button
						className='flex-1 bg-red-400 text-white hover:bg-red-600 hover:text-white'
						variant='outline'
					>
						<ThumbsDown className='w-4 h-4 mr-2' />
						Vote No
					</Button>
				</div>
			)}
		</div>
	);
};
