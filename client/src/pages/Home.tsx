import PropertyList from "../components/PropertyList/PropertyList";
import TypeSelector from "../components/TypeSelector/TypeSelector";

const Home = () => {
  return (
    <div style={{margin: '2rem 7rem'}}>
        <TypeSelector />
        <PropertyList />
    </div>
  );
};

export default Home;
