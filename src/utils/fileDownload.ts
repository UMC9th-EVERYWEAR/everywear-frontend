export const toBlobURL = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`파일을 가져오는 데 실패했습니다: ${response.status} ${response.statusText}`);
	}
	const blob = await response.blob();
	return URL.createObjectURL(blob);
};

export const fileDownload = async (url: string, fileName?: string) => {
	let objectUrl;
	try {
		objectUrl = await toBlobURL(url);
		const a = document.createElement('a');
		a.href = objectUrl;
		a.download = fileName ?? 'download';

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	} catch (error) {
		console.error('파일 다운로드에 실패했습니다:', error);
	} finally {
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
		}
	}
};
