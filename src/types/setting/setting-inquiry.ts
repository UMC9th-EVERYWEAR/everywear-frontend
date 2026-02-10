export type TagCategory = '앱 오류신고' | '앱 개선제안' | '앱 이용문의';

export type InquiryDraft = {
  tagCategory: TagCategory;
  title: string;
  email: string;
  message: string;
};

export type InquiryFormState = {
	tagCategory: TagCategory;
	title: string;
	email: string;
	message: string;
}
