export const fileDownload = async (imgUrl: string, fileName: string) => {
	try {
		// [해결책 1] URL 뒤에 무의미한 시간값을 붙여서 '새로운 URL'인 척 속임 (Cache Busting)
		// 브라우저는 URL이 다르면 캐시를 못 쓰고 무조건 서버로 요청을 보냄
		const urlWithTimestamp = `${imgUrl}?t=${new Date().getTime()}`;

		const response = await fetch(urlWithTimestamp, {
			method: 'GET',
			// [해결책 2] 명시적으로 캐시를 쓰지 말라고 선언
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
    
		// 뒷정리
		document.body.removeChild(link);
		window.URL.revokeObjectURL(blobUrl);

	} catch (error) {
		console.error('Download failed, opening new tab:', error);
		window.open(imgUrl, '_blank');
	}
};
