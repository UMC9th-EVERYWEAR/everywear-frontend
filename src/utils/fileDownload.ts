export const fileDownload = async (imgUrl: string, fileName: string) => {
	try {
		const urlWithTimestamp = `${imgUrl}?t=${new Date().getTime()}`;

		const response = await fetch(urlWithTimestamp, {
			method: 'GET',
			cache: 'no-store', 
			mode: 'cors',
		});

		if (!response.ok) throw new Error('Network Error');

		const blob = await response.blob();
		const blobUrl = window.URL.createObjectURL(blob);
    
		const link = document.createElement('a');
		link.href = blobUrl;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		window.URL.revokeObjectURL(blobUrl);

	} catch (error) {
		console.error('Download failed, opening new tab:', error);
		window.open(imgUrl, '_blank');
	}
};
