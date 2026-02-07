const ALLOWED_DOMAINS = [
	'musinsa.com',
	'zigzag.kr',
	'29cm.co.kr',
	'wconcept.co.kr',
];

export function checkUrlFormat(url: string) {
	try {
		const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
		return /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(parsed.hostname);
	} catch {
		return false;
	}
}


export function checkDomainDomainFormat(url: string) {
	try {
		const parsed = new URL(
			url.startsWith('http') ? url : `https://${url}`,
		);
		const hostname = parsed.hostname.replace(/^www\./, '');

		    const isAllowedDomain = ALLOWED_DOMAINS.some(
			(domain) =>
				hostname === domain || hostname.endsWith(`.${domain}`),
		);
		return isAllowedDomain;
	} catch {
		return false;
	}
}


