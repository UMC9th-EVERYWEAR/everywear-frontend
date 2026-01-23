import AddProductSection from './components/AddProductSection';
import BrowseProductsSection from './components/BrowseProductsSection';
import PartnerMallSection from './components/PartnerMallSection';
import RecentFittingSection from './components/RecentFittingSection';


const HomePageWidget = () => {
	return (
		<div className="flex flex-col w-full bg-white pb-10">
			<PartnerMallSection />
			<AddProductSection />
			<BrowseProductsSection />
			<RecentFittingSection />
		</div>
	);
};

export default HomePageWidget;
