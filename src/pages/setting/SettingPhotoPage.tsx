import CheckItem from '@/src/components/setting/setting-photo/CheckItem';
import InfoBox from '@/src/components/setting/setting-photo/InfoBox';
const SettingPhotoPage = () => {
	return (
		<div className="pt-6 text-neutral-900">
			<InfoBox>
				<CheckItem text="최대 5개까지 사진을 등록할 수 있어요." />
				<CheckItem text="가상 피팅에 사용할 사진을 등록해주세요." />
				<CheckItem text="최대 5개까지 사진을 등록할 수 있어요." />
			</InfoBox>
		</div>
	);
}
export default SettingPhotoPage;
