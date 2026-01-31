const Skeleton = ({ className }: { className: string }) => {
	return (
		<div className={`bg-neutral-200 animate-pulse ${className}`} />
	);
};
export default Skeleton;
