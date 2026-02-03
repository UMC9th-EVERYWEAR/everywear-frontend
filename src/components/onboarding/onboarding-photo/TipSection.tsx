const TipSection = () => {
	return(
		<div className="bg-verifying text-neutral-900 rounded-lg border-verifying-border border py-4 px-5 animate-frame-in">
			<p className="w-full text-start">
				더 나은 피팅을 위한 팁
			</p>
			<div className="w-full text-start">

				<p className="flex items-center gap-1">
					<span className="text-regular-10">●</span> 전신이 잘 보이는 사진을 사용하세요
				</p>
				<p className="flex items-center gap-1">
					<span className="text-regular-10">●</span> 밝은 조명에서 촬영한 사진이 좋아요</p>
				<p className="flex items-center gap-1">
					<span className="text-regular-10">●</span> 몸에 맞는 옷을 입은 사진을 추천해요			
				</p>
			</div>
		</div>
	)
}
export default TipSection
