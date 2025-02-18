import * as React from 'react';
import { Button } from '../ui/button';

export interface FileInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
	onFilesChange?: (files: File[]) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
	({ onFilesChange, ...props }, ref) => {
		const inputRef = React.useRef<HTMLInputElement>(null);
		const [fileNames, setFileNames] = React.useState<string>('');

		const handleClick = () => {
			inputRef.current?.click();
		};

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(event.target.files || []);

			if (files.length > 0) {
				setFileNames(files.map((f) => f.name).join(', '));
			} else {
				setFileNames('');
			}
			onFilesChange?.(files);
		};

		return (
			<div className='flex items-center gap-3 w-full'>
				<Button type='button' variant='secondary' onClick={handleClick}>
					Choose files
				</Button>

				{fileNames && (
					<span className='text-sm text-muted-foreground truncate'>
						{fileNames}
					</span>
				)}

				<input
					type='file'
					className='hidden'
					onChange={handleChange}
					ref={(e) => {
						// Handle both refs
						if (typeof ref === 'function') {
							ref(e);
						} else if (ref) {
							ref.current = e;
						}
						inputRef.current = e;
					}}
					{...props}
				/>
			</div>
		);
	}
);

FileInput.displayName = 'FileInput';

export { FileInput };
