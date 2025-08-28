import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
	title: 'Legislative Management System',
	description: 'A comprehensive legislative management system for tracking bills, voting records, and legislative processes',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className="antialiased">
				<Toaster position='top-right' richColors />
				{children}
			</body>
		</html>
	);
}
