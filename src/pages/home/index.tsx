import TopBtn from "../../components/common/TopBtn";
import Landing from "./components/Landing";
import OEIndex from "./components/OEIndex";
import OeTip from "./components/OeTip";
import Recipe from "./components/recipe/Recipe";

function Home() {
  return (
    <>
      <TopBtn />
      <Landing />
      <div className="xl:px-[200px]">
        <OEIndex />
        <OeTip />
        <Recipe />
      </div>
    </>
  );
}

export default Home;
