export const STORAGE_KEY = {
	accessToken: 'accessToken',
};

export const TOKEN_STORAGE_TYPE: 'local' | 'session' = 'local';


export type StorageType = 'local' | 'session'; // 로컬스토리지와 세션스토리지 모두 사용하므로 타입으로 구분

// 스토리지 안에 어떤 값이 있는지 제너릭으로 판단 => T 사용
export const createStorage = <T>(key: string, type: StorageType = 'local') => {
	// 서버에는 window가 없으므로 window.localStorage 사용 시 런타임 에러 발생
	// 브라우저가 아니라면 undefined로 맞다면 local, session으로 storage 구분
	const storage =
    typeof window === 'undefined'
    	? null
    	: type === 'local'
    		? window.localStorage
    		: window.sessionStorage;

	const setItem = (value: T) => {
		if (!storage) return; // storage가 없다면 리턴
		// setItem으로 들어온 값이 문자열이면 그대로 저장, 그 외에는 JSON.stringify 사용
		// JSON.stringify : 객체를 JSON 문자열로 변환
		try {
			const valueToStore =
        typeof value === 'string' ? value : JSON.stringify(value);
			storage.setItem(key, valueToStore);
		} catch (error) {
			console.error(error);
		}
	};

	const getItem = (): T | string | null => {
		if (!storage) return null;
		const item = storage.getItem(key);
		if (item === null) return null; // 아이템이 없으면 null 리턴

		try {
			// 우선 JSON.parse 시도
			// JSON.parse : JSON 문자열을 객체로 변환
			return JSON.parse(item) as T;
		} catch {
			// 파싱에 실패 => 순수 문자열
			// 원본값을 그대로 반환
			return item;
		}
	};

	const removeItem = () => {
		if (!storage) return;
		try {
			storage.removeItem(key);
		} catch (error) {
			console.error(error);
		}
	};

	return { setItem, getItem, removeItem };
};
