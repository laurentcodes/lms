import { create } from 'zustand';
import { toast } from 'sonner';

// utils
import { setCookie, clearCookie } from '@/utils/cookies';

interface AuthStore {
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
}

const authStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
	login: (email: string, password: string) => {
		if (email === 'admin@lms.com' && password === 'admin1234') {
			setCookie('isAuthenticated', 'true', 4 * 3600);
			set({ isAuthenticated: true });

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
