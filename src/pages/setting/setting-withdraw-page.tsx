
import Button from '@/src/components/common/Button';
import Loading from '@/src/components/common/Loading';
import { Modal } from '@/src/components/common/Modal';
import { SETTING_IMAGES } from '@/src/constants/images';
import { useMe } from '@/src/hooks/service/auth/useMe';
import { useWithdraw } from '@/src/hooks/service/auth/useWithdraw';
import { useState } from 'react';
const SettingWithdraw = () => {
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [openWithdraw, setOpenWithdraw] = useState(false)
	const { withdraw, isLoading : withdrawLoading } = useWithdraw();
	const { data, isLoading: meLoading } = useMe();

	if(meLoading) 	{
		return <Loading />
	}

	const handleWithdraw = async () => {
		if (withdrawLoading) return;

		try {
			await withdraw();
		} catch (e) {
			console.error('회원 탈퇴 실패', e);
		}
	};


	const toggleWithdraw = () => {
		setIsConfirmed((prev)=> !prev)
	}

	return <div className='mx-4 mt-3.5 text-neutral-900 h-screen overflow-hidden flex flex-col items-center'>
		<div className='w-full flex-1 flex flex-col items-center max-w-sm'>
			<div className='w-full text-regular-16 mb-5 text-start'>{data?.name}님, 탈퇴하기 전에 꼭 확인해 주세요</div>
			<div className=" border border-primary-300 py-4 px-2.5  rounded-lg flex items-start gap-3 w-full">
				<img
					src={ SETTING_IMAGES.CHECK_BLUE }
					alt='check'
				/>
				<div className='text-regular-14'>
					<p>찜한 상품, 상품 정보 등</p>
					<p>{data?.name}님 소중한 기록이 모두 사라져요</p>
					<p className="text-[#6E6E6E] text-regular-12">탈퇴하면 되돌릴 수 없어요</p>
				</div>
			</div>

		</div>
		
		<div className='pb-30'>
			<div>
				<button
					className='flex cursor-pointer gap-1 mb-4'
					onClick={toggleWithdraw}
				>
					<img
						src={isConfirmed ? SETTING_IMAGES.COMPLETE_CHECK: SETTING_IMAGES.CHECK_INCOMPLETE }
						alt='check'
					/>
					<p className='text-regular-16'>탈퇴 유의사항을 모두 확인했어요.</p>
				</button>
			</div>
			<Button
				variant='filled'
				disabled={!isConfirmed}
				size='lg'
				onClick={()=>setOpenWithdraw(true)}
			>탈퇴하기</Button>
		</div>

		{
			openWithdraw && <Modal
				isOpen={openWithdraw}
				title='정말 탈퇴하시겠습니까?'
				btn1Action={handleWithdraw}
				btn1Text={withdrawLoading ? '탈퇴 중...' : '예'}
				btn2Action={()=> setOpenWithdraw(false)}
				btn2Text='아니오'
				onClose={()=>setOpenWithdraw(false)}
			                />
		}
	</div>;
}       
export default SettingWithdraw;
