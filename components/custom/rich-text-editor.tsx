// tiptap
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';

// icons
import {
	Bold as BoldIcon,
	Italic as ItalicIcon,
	Underline as UnderlineIcon,
	List,
	ListOrdered,
	Heading1,
	Heading2,
	Heading3,
	Quote,
} from 'lucide-react';

// utils
import { cn } from '@/lib/utils';

// components
import { Button } from '../ui/button';

interface RichTextEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
}

const MenuButton = ({
	isActive,
	onClick,
	children,
}: {
	isActive: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) => (
	<Button
		type='button'
		variant={isActive ? 'secondary' : 'ghost'}
		size='sm'
		className='h-8 px-2'
		onClick={onClick}
	>
		{children}
	</Button>
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) return null;

	return (
		<div className='border-b flex flex-wrap gap-1 p-1'>
			<MenuButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				isActive={editor.isActive('bold')}
			>
				<BoldIcon className='h-4 w-4' />
			</MenuButton>

			<MenuButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				isActive={editor.isActive('italic')}
			>
				<ItalicIcon className='h-4 w-4' />
			</MenuButton>

			<MenuButton
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				isActive={editor.isActive('underline')}
			>
				<UnderlineIcon className='h-4 w-4' />
			</MenuButton>

			<div className='w-px h-full bg-border mx-1' />

			<MenuButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				isActive={editor.isActive('blockquote')}
			>
				<Quote className='h-4 w-4' />
			</MenuButton>

			<div className='w-px h-full bg-border mx-1' />

			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				isActive={editor.isActive('heading', { level: 1 })}
			>
				<Heading1 className='h-4 w-4' />
			</MenuButton>

			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				isActive={editor.isActive('heading', { level: 2 })}
			>
				<Heading2 className='h-4 w-4' />
			</MenuButton>

			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				isActive={editor.isActive('heading', { level: 3 })}
			>
				<Heading3 className='h-4 w-4' />
			</MenuButton>

			<div className='w-px h-full bg-border mx-1' />

			<MenuButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				isActive={editor.isActive('bulletList')}
			>
				<List className='h-4 w-4' />
			</MenuButton>

			<MenuButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				isActive={editor.isActive('orderedList')}
			>
				<ListOrdered className='h-4 w-4' />
			</MenuButton>
		</div>
	);
};

export function RichTextEditor({
	content,
	onChange,
	placeholder,
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: false,
				orderedList: false,
			}),
			Heading.configure({
				levels: [1, 2, 3],
			}),
			BulletList,
			OrderedList,
			Bold,
			Italic,
			Underline,
		],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: cn(
					'prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none'
				),
			},
		},
	});

	return (
		<div className='min-h-[300px] rounded-md border bg-background'>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} placeholder={placeholder} />
		</div>
	);
}
