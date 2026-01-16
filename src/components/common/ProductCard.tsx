interface ProductCardProps {
  company: string;
  name: string;
  price: string;
  rating: number;
  imageUrl: string;
}

const StarIcon = () => (
  <svg width="8.3" height="7.9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.59375 7.91667L2.27083 4.98958L0 3.02083L3 2.76042L4.16667 0L5.33333 2.76042L8.33333 3.02083L6.0625 4.98958L6.73958 7.91667L4.16667 6.36458L1.59375 7.91667Z" fill="#2A323F"/>
  </svg>
);

const ProductCard = ({ company, name, price, rating, imageUrl }: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center w-[137px] shrink-0 cursor-pointer active:scale-[0.98] transition-transform">
      
      {/* 1. 이미지 영역 (137 x 178) */}
      <div className="w-[137px] h-[178px] rounded-[10px] overflow-hidden bg-[#F2F2F2]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. 정보 카드 (137 x 67, 위로 -34px 겹침) */}
      <div className="w-[137px] h-[67px] bg-white -mt-[34px] px-[10px] pt-[8px] pb-[12px] rounded-b-[10px] shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10 flex flex-col justify-between">
        
        {/* 회사명 & 별점 */}
        <div className="flex justify-between items-center">
          <span className="text-[#767676] text-[10px]">
            {company}
          </span>
          <div className="flex items-center gap-[2px]">
            <StarIcon />
            <span className="text-[#2A323F] text-[10px]">
              {rating}
            </span>
          </div>
        </div>

 
       {/* 상품명 */}
        <h3 className="w-[100px] h-[21px] overflow-hidden text-[#2A323F] text-[14px] font-medium leading-[21px] whitespace-nowrap text-ellipsis">
          {name}
        </h3>

        {/* 가격 */}
        <p className="w-[38px] h-[18px] overflow-hidden text-[#2A323F] text-[12px] leading-[18px] whitespace-nowrap">
          {price}
        </p>

      </div>
    </div>
  );
};


export default ProductCard;