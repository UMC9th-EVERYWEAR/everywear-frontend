import React from 'react';

// 임시 데이터: api연동 필요
const fittingHistory = [
  
  
];

const RecentFitting = () => {
  const months = ['2025년 6월', '2025년 5월', '2025년 4월'];

  // 데이터가 없을 경우 표시할 화면
  if (fittingHistory.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center h-[calc(100vh-110px)] bg-white">
        <p className="text-[#999999] text-[16px] font-medium font-['Pretendard']">
          피팅 내역이 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white pb-20">
      {months.map((month) => (
        <section key={month} className="mt-8">
          <h2 className="px-4 mb-4 text-[#2A323F] font-['Pretendard'] text-[20px] font-semibold leading-normal">
            {month}
          </h2>
          
          <div className="flex gap-[10px] overflow-x-auto no-scrollbar pl-4 pr-4">
            {fittingHistory
              .filter(item => item.month === month)
              .map((item) => (
                <div 
                  key={item.id} 
                  className="min-w-[calc((100%-32px-20px)/2.5)] aspect-[3/4] rounded-[10px] overflow-hidden bg-gray-100 shrink-0 relative"
                >
                  <img 
                    src={item.imageUrl} 
                    alt="피팅 이미지" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 w-full text-center">
                    <span className="text-white text-[11px] font-medium drop-shadow-md">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default RecentFitting;