const getFileTypeLabel = (file: File) => {
	const extension = file.name.split('.').pop()?.toLowerCase();
	switch (extension) {
		case 'pdf':
			return 'PDF';
		case 'doc':
		case 'docx':
			return 'WORD';
		case 'txt':
			return 'TEXT';
		default:
			return extension?.toUpperCase() || 'FILE';
	}
};

export { getFileTypeLabel };
