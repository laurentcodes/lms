import { create } from 'zustand';
import { toast } from 'sonner';

// utils
import { setCookie, clearCookie } from '@/utils/cookies';

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
}

interface AuthStore {
	user: User | null;
	setUser: (user: User | null) => void;
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
	register: (user: User) => void;
}

const authStore = create<AuthStore>((set) => ({
	user: {
		id: 1,
		name: 'Jane Smith',
		email: 'admin@lms.com',
		role: 'admin',
	},
	setUser: (user) => set({ user }),
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
	login: (email: string, password: string) => {
		if (email === 'admin@lms.com' && password === 'admin1234') {
			setCookie('isAuthenticated', 'true', 4 * 3600);

			set({ isAuthenticated: true });
			set({
				user: {
					id: 1,
					name: 'Jane Smith',
					email: 'admin@lms.com',
					role: 'admin',
				},
			});

			toast.success('Logged in successfully.');

			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 2000);
		} else {
			toast.error('Invalid email or password');
		}
	},
	logout: () => {
		clearCookie('isAuthenticated');
		set({ isAuthenticated: false });

		toast.success('Logged out successfully.');

		setTimeout(() => {
			window.location.href = '/';
		}, 2000);
	},
	register: (user: User) => {
		// Simulate a registration process
		set({ user });
		set({ isAuthenticated: true });
		setCookie('isAuthenticated', 'true', 4 * 3600);

		toast.success('Registered successfully.');

		setTimeout(() => {
			window.location.href = '/dashboard';
		}, 2000);
	},
}));

interface BillStore {
	billCategories: string[];
	setBillCategories: (billCategories: string[]) => void;
}

const billStore = create<BillStore>((set) => ({
	billCategories: [
		'Education',
		'Health',
		'Finance',
		'Environment',
		'Transportation',
		'Technology',
		'Agriculture',
		'Defense',
		'Labor',
		'Justice',
		'Other',
	],
	setBillCategories: (billCategories) => set({ billCategories }),
}));

export { authStore, billStore };
