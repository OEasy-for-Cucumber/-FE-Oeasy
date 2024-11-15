import TopBtn from "../../components/common/TopBtn";
import Landing from "./components/Landing";
import OeGraph from "./components/OeGraph";
import OeIndex from "./components/OEIndex";
// import OeTip from "./components/OeTip";
import Recipe from "./components/recipe/Recipe";

function Home() {
  return (
    <>
      <TopBtn />
      <Landing />
      <div className="xl:px-[200px]">
        <OeIndex />
        {/* <OeTip /> */}
        <OeGraph/>
        <Recipe />
      </div>
    </>
  );
}

export default Home;
