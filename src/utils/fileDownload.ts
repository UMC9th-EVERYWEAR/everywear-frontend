// src/utils/downloadImage.ts

export const fileDownload = async (imgUrl: string, fileName: string = 'image.png') => {
	try {
		// 1. 이미지 데이터를 fetch로 받아옴
		const response = await fetch(imgUrl, {
			method: 'GET',
			mode: 'cors', // CORS 요청 명시
			headers: {
				'Cache-Control': 'no-cache',
			},
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		// 2. 받아온 데이터를 Blob(파일 객체)으로 변환
		const blob = await response.blob();

		// 3. 브라우저 메모리에 가상의 URL 생성
		const url = window.URL.createObjectURL(blob);

		// 4. 가상의 링크 태그를 생성해서 강제로 클릭 이벤트 발생
		const link = document.createElement('a');
		link.href = url;
		link.download = fileName; // 다운로드될 파일명 지정
		document.body.appendChild(link);
		link.click();

		// 5. 뒷정리 (메모리 해제 및 태그 삭제)
		link.remove();
		window.URL.revokeObjectURL(url);

	} catch (error) {
		console.error('이미지 다운로드 실패:', error);
		// 실패 시 새 탭으로라도 열어주는 폴백 처리
		window.open(imgUrl, '_blank');
	}
};
