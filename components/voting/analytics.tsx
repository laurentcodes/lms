import { BarChart, PieChart, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function VotingAnalytics({ votes }: { votes: any }) {
	// Calculate overall statistics
	const totalVotes = votes.reduce(
		(acc: number, vote: any) => acc + vote.totalVotes,
		0
	);
	const totalYesVotes = votes.reduce(
		(acc: number, vote: any) => acc + vote.yes,
		0
	);
	const totalNoVotes = votes.reduce(
		(acc: number, vote: any) => acc + vote.no,
		0
	);
	const averageParticipation = Math.round(totalVotes / votes.length);

	// Calculate category statistics
	const categoryStats = votes.reduce(
		(
			acc: Record<
				string,
				{ total: number; yes: number; no: number; count: number }
			>,
			vote: any
		) => {
			if (!acc[vote.category]) {
				acc[vote.category] = { total: 0, yes: 0, no: 0, count: 0 };
			}
			acc[vote.category].total += vote.totalVotes;
			acc[vote.category].yes += vote.yes;
			acc[vote.category].no += vote.no;
			acc[vote.category].count += 1;
			return acc;
		},
		{} as Record<
			string,
			{ total: number; yes: number; no: number; count: number }
		>
	);

	return (
		<div className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				<div className='border rounded-lg p-4 space-y-2'>
					<div className='flex items-center gap-2 text-muted-foreground'>
						<BarChart className='w-4 h-4' />

						<span className='text-sm font-medium'>Total Votes Cast</span>
					</div>

					<p className='text-2xl font-bold'>{totalVotes}</p>
				</div>

				<div className='border rounded-lg p-4 space-y-2'>
					<div className='flex items-center gap-2 text-muted-foreground'>
						<PieChart className='w-4 h-4' />

						<span className='text-sm font-medium'>Average Participation</span>
					</div>

					<p className='text-2xl font-bold'>{averageParticipation}</p>
				</div>

				<div className='border rounded-lg p-4 space-y-2'>
					<div className='flex items-center gap-2 text-muted-foreground'>
						<ThumbsUp className='w-4 h-4' />

						<span className='text-sm font-medium'>Total Yes Votes</span>
					</div>

					<p className='text-2xl font-bold text-green-600'>{totalYesVotes}</p>
				</div>

				<div className='border rounded-lg p-4 space-y-2'>
					<div className='flex items-center gap-2 text-muted-foreground'>
						<ThumbsDown className='w-4 h-4' />

						<span className='text-sm font-medium'>Total No Votes</span>
					</div>

					<p className='text-2xl font-bold text-red-600'>{totalNoVotes}</p>
				</div>
			</div>

			<div className='border rounded-lg p-6'>
				<h3 className='text-lg font-semibold mb-4'>Voting by Category</h3>

				<div className='space-y-4'>
					{Object.entries(categoryStats).map(([category, stats]: any) => (
						<div key={category} className='space-y-2'>
							<div className='flex justify-between items-center'>
								<span className='font-medium'>{category}</span>

								<span className='text-sm text-muted-foreground'>
									{stats.total} votes across {stats.count} polls
								</span>
							</div>

							<div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
								<div
									className='h-full bg-primary'
									style={{
										width: `${(stats.yes / stats.total) * 100}%`,
									}}
								/>
							</div>

							<div className='flex gap-4 text-sm text-muted-foreground'>
								<span>Yes: {stats.yes}</span>
								<span>No: {stats.no}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='border rounded-lg p-6'>
				<h3 className='text-lg font-semibold mb-4'>Recent Activity</h3>

				<div className='space-y-4'>
					{votes
						.slice()
						.sort(
							(a: any, b: any) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
						)
						.slice(0, 5)
						.map((vote: any) => (
							<div key={vote.id} className='flex justify-between items-center'>
								<div>
									<p className='font-medium'>{vote.title}</p>

									<p className='text-sm text-muted-foreground'>
										{vote.category} • {vote.totalVotes} votes
									</p>
								</div>

								<div className='flex items-center gap-4'>
									<div className='text-sm'>
										<span className='text-green-600'>{vote.yes}</span> /{' '}
										<span className='text-red-600'>{vote.no}</span>
									</div>

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
						))}
				</div>
			</div>
		</div>
	);
}
