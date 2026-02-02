// ENV_CONFIG 사용 방식
// import.meta.env를 여기저기서 직접 쓰지 않기 위해

export const ENV_CONFIG = {
	// EmailJS
	EMAILJS: {
		SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
		TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
		PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
	},

	// ImgBB
	IMGBB: {
		API_KEY: import.meta.env.VITE_IMGBB_API_KEY as string,
	},

	SERVER: {
		API_URL: import.meta.env.VITE_SERVER_API_URL as string,
	},
} as const;
