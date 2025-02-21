export const bills = [
	{
		id: 1,
		title: 'Education Reform Act 2024',
		billNumber: 'HB-2024-001',
		category: 'Education',
		status: 'Under Review',
		progress: 40,
		description:
			'A comprehensive reform of the education system focusing on modernizing curriculum, improving teacher support, and enhancing student resources.',
		fullText: `Section 1. Purpose
This Act aims to modernize the education system by implementing comprehensive reforms in curriculum development, teacher support programs, and student resource allocation.

Section 2. Curriculum Modernization
(a) The Department of Education shall establish a task force to review and update the K-12 curriculum.
(b) The updated curriculum shall incorporate:
    (1) Digital literacy and technology skills
    (2) Critical thinking and problem-solving
    (3) Environmental education
    (4) Financial literacy`,
		sponsor: {
			name: 'Jane Smith',
			image: null,
			initials: 'JS',
		},
		coSponsors: [
			{
				name: 'Robert Johnson',
				image: null,
				initials: 'RJ',
			},
			{
				name: 'Maria Garcia',
				image: null,
				initials: 'MG',
			},
		],
		attachments: [
			{
				name: 'Education_Reform_Draft.pdf',
				type: 'application/pdf',
				size: 2500000,
				uploadedAt: '2024-03-15T09:00:00Z',
			},
			{
				name: 'Budget_Impact_Analysis.docx',
				type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				size: 1500000,
				uploadedAt: '2024-03-15T09:05:00Z',
			},
		],
		submissionDate: '2024-03-15',
		lastUpdate: '2024-03-20',
		committee: 'Education and Workforce',
		steps: ['Draft', 'Review', 'Committee', 'Voting', 'Enacted/Rejected'],
		currentStep: 1,
	},
	{
		id: 2,
		title: 'Healthcare Access Improvement Bill',
		billNumber: 'HB-2024-002',
		category: 'Health',
		status: 'Draft',
		progress: 20,
		description:
			'Legislation aimed at expanding healthcare access through improved insurance coverage and reduced prescription drug costs.',
		fullText: `Section 1. Purpose
This bill seeks to improve healthcare access by expanding insurance coverage options and implementing measures to reduce prescription drug costs.

Section 2. Insurance Coverage Expansion
(a) Establishment of a state healthcare marketplace
(b) Expansion of eligibility criteria for state-sponsored health insurance
(c) Creation of subsidies for low-income individuals

Section 3. Prescription Drug Cost Reduction
(a) Implementation of a prescription drug price negotiation program
(b) Establishment of a maximum price cap for essential medications`,
		sponsor: {
			name: 'John Doe',
			image: null,
			initials: 'JD',
		},
		coSponsors: [
			{
				name: 'Sarah Wilson',
				image: null,
				initials: 'SW',
			},
		],
		attachments: [
			{
				name: 'Healthcare_Bill_Draft.pdf',
				type: 'application/pdf',
				size: 3000000,
				uploadedAt: '2024-03-18T08:00:00Z',
			},
		],
		submissionDate: '2024-03-18',
		lastUpdate: '2024-03-18',
		committee: 'Health and Human Services',
		steps: ['Draft', 'Review', 'Committee', 'Voting', 'Enacted/Rejected'],
		currentStep: 0,
	},
	{
		id: 3,
		title: 'Renewable Energy Incentive Act',
		billNumber: 'HB-2024-003',
		category: 'Environment',
		status: 'Under Review',
		progress: 30,
		description:
			'Legislation aimed at incentivizing the adoption of renewable energy sources.',
		fullText: `Section 1. Purpose
This Act aims to incentivize the adoption of renewable energy sources by implementing financial incentives and regulatory frameworks.

Section 2. Financial Incentives
(a) Establishment of a renewable energy investment fund
(b) Implementation of tax incentives for renewable energy projects
(c) Creation of a revolving loan fund for renewable energy projects`,
		sponsor: {
			name: 'Jane Smith',
			image: null,
			initials: 'JS',
		},
		coSponsors: [
			{
				name: 'Jane Smith',
				image: null,
				initials: 'CD',
			},
		],
		attachments: [
			{
				name: 'Renewable_Energy_Incentive_Act_Draft.pdf',
				type: 'application/pdf',
				size: 2000000,
				uploadedAt: '2024-03-10T08:00:00Z',
			},
		],
		submissionDate: '2024-03-10',
		lastUpdate: '2024-03-15',
		committee: 'Environment and Natural Resources',
		steps: ['Draft', 'Review', 'Committee', 'Voting', 'Enacted/Rejected'],
		currentStep: 1,
	},
	{
		id: 4,
		title: 'Small Business Support Act',
		billNumber: 'HB-2024-004',
		category: 'Economy',
		status: 'Passed',
		progress: 100,
		description:
			'Legislation aimed at providing support and incentives to small businesses.',
		fullText: `Section 1. Purpose
This Act aims to provide support and incentives to small businesses by implementing various measures to reduce costs, increase access to capital, and enhance access to markets.

Section 2. Cost Reduction Measures
(a) Implementation of a small business tax credit program
(b) Establishment of a revolving loan fund for small businesses
(c) Creation of a small business development fund`,
		sponsor: {
			name: 'Eva Wilson',
			image: null,
			initials: 'EW',
		},
		coSponsors: [],
		attachments: [
			{
				name: 'Small_Business_Support_Act_Draft.pdf',
				type: 'application/pdf',
				size: 1000000,
				uploadedAt: '2024-03-01T10:00:00Z',
			},
		],
		submissionDate: '2024-03-01',
		lastUpdate: '2024-03-05',
		committee: 'Economic Development',
		steps: ['Draft', 'Review', 'Committee', 'Voting', 'Enacted/Rejected'],
		currentStep: 4,
	},
	{
		id: 5,
		title: 'Cybersecurity Enhancement Act',
		billNumber: 'HB-2024-005',
		category: 'Technology',
		status: 'Rejected',
		progress: 0,
		description:
			'Legislation aimed at enhancing cybersecurity measures and protections.',
		fullText: `Section 1. Purpose
This Act aims to enhance cybersecurity measures and protections by implementing various measures to improve cybersecurity awareness, strengthen cybersecurity infrastructure, and enhance cybersecurity response capabilities.

Section 2. Cybersecurity Awareness Measures
(a) Implementation of a cybersecurity awareness program
(b) Establishment of a cybersecurity advisory board
(c) Creation of a cybersecurity fund`,
		sponsor: {
			name: 'Jane Smith',
			image: null,
			initials: 'JS',
		},
		coSponsors: [],
		attachments: [
			{
				name: 'Cybersecurity_Enhancement_Act_Draft.pdf',
				type: 'application/pdf',
				size: 500000,
				uploadedAt: '2024-02-15T09:00:00Z',
			},
		],
		submissionDate: '2024-02-15',
		lastUpdate: '2024-02-20',
		committee: 'Technology and Innovation',
		steps: ['Draft', 'Review', 'Committee', 'Voting', 'Enacted/Rejected'],
		currentStep: 0,
	},
];

export const votes = [
	{
		id: 1,
		title: 'Budget Approval 2024',
		status: 'active' as const,
		showVoters: true,
		totalVotes: 15,
		yes: 10,
		no: 5,
		category: 'Finance',
		createdAt: '2024-03-15T09:00:00Z',
		voters: [
			{
				name: 'John Doe',
				vote: 'yes',
				timestamp: '2024-03-15T09:30:00Z',
			},
			{
				name: 'Jane Smith',
				vote: 'yes',
				timestamp: '2024-03-15T10:15:00Z',
			},
			{
				name: 'Bob Johnson',
				vote: 'no',
				timestamp: '2024-03-15T11:00:00Z',
			},
		],
	},
	{
		id: 2,
		title: 'New Committee Formation',
		status: 'closed',
		showVoters: false,
		totalVotes: 20,
		yes: 12,
		no: 8,
		category: 'Administrative',
		createdAt: '2024-03-10T08:00:00Z',
		closedAt: '2024-03-14T17:00:00Z',
		voters: [],
	},
	{
		id: 3,
		title: 'Environmental Policy Update',
		status: 'closed',
		showVoters: true,
		totalVotes: 18,
		yes: 15,
		no: 3,
		category: 'Environment',
		createdAt: '2024-03-01T10:00:00Z',
		closedAt: '2024-03-05T16:00:00Z',
		voters: [
			{
				name: 'Alice Brown',
				vote: 'yes',
				timestamp: '2024-03-01T11:00:00Z',
			},
			{
				name: 'Charlie Davis',
				vote: 'yes',
				timestamp: '2024-03-02T09:30:00Z',
			},
			{
				name: 'Eva Wilson',
				vote: 'no',
				timestamp: '2024-03-03T14:15:00Z',
			},
		],
	},
	{
		id: 4,
		title: 'Healthcare Initiative',
		status: 'closed',
		showVoters: true,
		totalVotes: 25,
		yes: 20,
		no: 5,
		category: 'Healthcare',
		createdAt: '2024-02-15T09:00:00Z',
		closedAt: '2024-02-20T17:00:00Z',
		voters: [
			{
				name: 'Frank Miller',
				vote: 'yes',
				timestamp: '2024-02-15T10:00:00Z',
			},
			{
				name: 'Grace Lee',
				vote: 'yes',
				timestamp: '2024-02-16T11:30:00Z',
			},
			{
				name: 'Henry Clark',
				vote: 'no',
				timestamp: '2024-02-17T09:45:00Z',
			},
		],
	},
	{
		id: 5,
		title: 'Transportation Infrastructure Plan',
		status: 'active',
		showVoters: true,
		totalVotes: 12,
		yes: 8,
		no: 4,
		category: 'Infrastructure',
		createdAt: '2024-03-18T08:00:00Z',
		voters: [
			{
				name: 'Isabel Rodriguez',
				vote: 'yes',
				timestamp: '2024-03-18T09:15:00Z',
			},
			{
				name: 'Jack Thompson',
				vote: 'yes',
				timestamp: '2024-03-18T10:30:00Z',
			},
			{
				name: 'Karen White',
				vote: 'no',
				timestamp: '2024-03-18T11:45:00Z',
			},
		],
	},
];
