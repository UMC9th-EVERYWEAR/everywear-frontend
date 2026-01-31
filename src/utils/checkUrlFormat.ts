
function checkUrlFormat(url: string) {
	try {
		const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
		return /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(parsed.hostname);
	} catch {
		return false;
	}
}
export default checkUrlFormat

// TODO: 확장해서 무신사 지그재그 등의 링크만 되도록 검사