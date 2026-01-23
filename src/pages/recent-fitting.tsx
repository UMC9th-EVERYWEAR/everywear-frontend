import React from 'react';

// 임시 데이터: api연동 필요
const fittingHistory = [
  { id: 1, date: '2025.6.7', month: '2025년 6월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 2, date: '2025.6.7', month: '2025년 6월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 3, date: '2025.6.7', month: '2025년 6월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 4, date: '2025.5.7', month: '2025년 5월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 5, date: '2025.5.7', month: '2025년 5월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 6, date: '2025.5.7', month: '2025년 5월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 7, date: '2025.4.7', month: '2025년 4월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 8, date: '2025.4.7', month: '2025년 4월', imageUrl: 'https://via.placeholder.com/300' },
  { id: 9, date: '2025.4.7', month: '2025년 4월', imageUrl: 'https://via.placeholder.com/300' },
];

const RecentFitting = () => {
  const months = ['2025년 6월', '2025년 5월', '2025년 4월'];

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
                  {/* 이미지 하단 날짜 */}
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