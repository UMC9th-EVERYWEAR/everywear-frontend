export const PRODUCT_CATEGORIES = {
	전체: {
		queryKey: 'all',
		icon: 'All',
	},
	상의: {
		queryKey: 'top',
		icon: 'Top',
	},
	하의: {
		queryKey: 'bottom',
		icon: 'Bottom',
	},
	아우터: {
		queryKey: 'outer',
		icon: 'Outer',
	},
	원피스: {
		queryKey: 'dress',
		icon: 'Dress',
	},
	기타: {
		queryKey: 'etc',
		icon: 'Etc',
	},
} as const;

export type CategoryKey = keyof typeof PRODUCT_CATEGORIES;
export type CategoryQueryKey =
	(typeof PRODUCT_CATEGORIES)[CategoryKey]['queryKey'];

