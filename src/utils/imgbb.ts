export type ImgBBUploadResult = {
  url: string;        // 실제 이미지 링크 (메일에 img로 쓰기 좋음)
  deleteUrl: string;  // 삭제 링크 
  id: string;
};

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY as string;

export async function uploadImageToImgBB(file: File): Promise<ImgBBUploadResult> {
	if (!IMGBB_API_KEY) {
		throw new Error('VITE_IMGBB_API_KEY가 없습니다.');
	}

	const formData = new FormData();
	formData.append('image', file);

	const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
		method: 'POST',
		body: formData,
	});

	const data = await res.json();

	if (!res.ok || !data?.success) {
		console.error('ImgBB upload fail:', data);
		throw new Error('ImgBB 업로드 실패');
	}

	return {
		id: data.data.id,
		url: data.data.url, // 이걸 메일 본문 <img src> 로 쓰면 됨
		deleteUrl: data.data.delete_url,
	};
}
