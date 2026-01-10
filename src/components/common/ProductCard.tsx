interface ProductCardProps {
  company: string;    
  name: string;       
  price: string;     
  rating: number;     
  imageUrl: string; 
}

// 별점 아이콘 (스펙 반영)
const StarIcon = () => (
  <svg width="8.3" height="7.9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.59375 7.91667L2.27083 4.98958L0 3.02083L3 2.76042L4.16667 0L5.33333 2.76042L8.33333 3.02083L6.0625 4.98958L6.73958 7.91667L4.16667 6.36458L1.59375 7.91667Z" fill="#2A323F"/>
  </svg>
);

const ProductCard = ({ company, name, price, rating, imageUrl }: ProductCardProps) => {
  return (
    <div className="flex flex-col w-[160px] bg-white rounded-[12px] shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
      {/* 1. 옷 사진 부분 */}
      <div 
        className="w-full aspect-[160/151.84] bg-lightgray overflow-hidden rounded-t-[12px]"
      >
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover" 
        />
      </div>

      {/* 2. 상품 정보 부분 (Padding 적용) */}
      <div className="flex flex-col p-[8px_10px_12px_10px] gap-1 self-stretch">
        
        {/* 회사명 & 별점 */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#767676] font-['Pretendard'] text-[10px] font-[400] leading-[140%] tracking-[-0.2px]">
            {company}
          </span>
          <div className="flex items-center gap-[2px]">
            <StarIcon />
            <span className="text-[#2A323F] font-['Pretendard'] text-[10px] font-[400]">
              {rating}
            </span>
          </div>
        </div>

        {/* 제품 이름 (한 줄 생략 처리) */}
        <h3 className="self-stretch text-[#2A323F] font-['Pretendard'] text-[14px] font-[500] leading-[140%] tracking-[-0.28px] truncate">
          {name}
        </h3>

        {/* 제품 가격 */}
        <p className="self-stretch text-[#2A323F] font-['Pretendard'] text-[12px] font-[400] leading-[140%] tracking-[-0.24px]">
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;