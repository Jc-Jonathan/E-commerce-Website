import '../Components/PagesStyles/Shope.css';
interface ShopProps {
  PopularComponent: React.ComponentType;
  CollectionComponent: React.ComponentType;
  HeroComponent: React.ComponentType;
  OffersComponent: React.ComponentType;
}

const Shop: React.FC<ShopProps> = ({ PopularComponent, CollectionComponent,HeroComponent,OffersComponent }) => {
  return (
    <div className='main-container'>
      <div className="hero-edit">
        <HeroComponent/>
      </div>

      <div className="popularaitems">
        <PopularComponent />
      </div>

      <div className="offer">
        <OffersComponent />
      </div>

      <div className="newcollection">
        <CollectionComponent />
      </div>
    </div>
  );
};

export default Shop;
