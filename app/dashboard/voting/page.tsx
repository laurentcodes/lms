'use client';

import { useState } from 'react';

// icons
import { Plus } from 'lucide-react';

// components
import VotingAnalytics from '@/components/voting/analytics';
import { VoteCard } from '@/components/voting/voters';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// store
import { authStore } from '@/app/store';

// mock
import { votes } from '@/utils/mock';

export default function VotingDashboard() {
	const { logout } = authStore();

	const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
	const [newVoteTitle, setNewVoteTitle] = useState<string>('');
	const [showVoters, setShowVoters] = useState<boolean>(true);

	const handleCreateVote = () => {
		// Here you would typically make an API call to create the vote
		console.log('Creating vote:', { title: newVoteTitle, showVoters });
		setShowCreateDialog(false);
		setNewVoteTitle('');
	};

	return (
		<div className='container mx-auto p-4 max-w-7xl'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Voting Dashboard</h1>

				<Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
					<DialogTrigger asChild>
						<Button>
							<Plus className='w-4 h-4 mr-2' />
							Create Vote
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create New Vote</DialogTitle>
						</DialogHeader>

						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='title'>Vote Title</Label>
								<Input
									id='title'
									value={newVoteTitle}
									onChange={(e) => setNewVoteTitle(e.target.value)}
									placeholder='Enter vote title'
								/>
							</div>

							<div className='flex items-center justify-between'>
								<Label htmlFor='show-voters'>Show Voters</Label>
								<Switch
									id='show-voters'
									checked={showVoters}
									onCheckedChange={setShowVoters}
								/>
							</div>

							<Button onClick={handleCreateVote} className='w-full'>
								Create Vote
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<Tabs defaultValue='active' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='active'>Active Votes</TabsTrigger>
					<TabsTrigger value='closed'>Closed Votes</TabsTrigger>
					<TabsTrigger value='analytics'>Analytics</TabsTrigger>
				</TabsList>

				<TabsContent value='active' className='space-y-4'>
					{votes
						.filter((vote) => vote.status === 'active')
						.map((vote) => (
							<VoteCard key={vote.id} vote={vote} />
						))}
				</TabsContent>

				<TabsContent value='closed' className='space-y-4'>
					{votes
						.filter((vote) => vote.status === 'closed')
						.map((vote) => (
							<VoteCard key={vote.id} vote={vote} />
						))}
				</TabsContent>

				<TabsContent value='analytics' className='space-y-6'>
					<VotingAnalytics votes={votes} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
