import { Modal } from '../common/Modal';
import { PATH } from '@/src/constants/path';
import type { ResultType } from '@/src/types/products/product';
import { useNavigate } from 'react-router';



interface ProductsModalsProps {
  type: ResultType;
  onClose: () => void;
}


const RESULT_CONFIG: Record<
 ResultType,
{
  title: string,
  text?: string,
  btn1Text: string,
  btn1Action?: string,
  btn2Text?: string,
}
> = {
	FAIL: {
		title: '상품추가를 실패했습니다.',
		text: '상품 등록에 실패했습니다. 링크를 다시 확인해주세요.',
		btn1Text: '확인',

  	},
	SUCCESS: {
		title: '상품이 추가되었습니다.',
		text: '상품을 확인하러 가시겠습니까?',
		btn1Text: '예',
		btn2Text: '아니오',
		btn1Action: PATH.PRODUCTS.ROOT,

	},
};


const ProductsModals = ({ type, onClose }: ProductsModalsProps) => {
	const navigate = useNavigate();
	const { title, text, btn1Text, btn1Action, btn2Text } =
    RESULT_CONFIG[type];  

	const handlePrimaryAction = () => {
		if (btn1Action) {
			navigate(btn1Action);
		}
		onClose();
	};

	return (
		<>
			<Modal
				isOpen={true}
				onClose={onClose}
				title={title}
				text={text}
				btn1Text={btn1Text}
				btn1Action={handlePrimaryAction}
				btn2Text={btn2Text}
				btn2Action={onClose}
			/>
		</>
	)
}

export default ProductsModals
