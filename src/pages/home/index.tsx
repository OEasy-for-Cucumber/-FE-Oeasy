import TopBtn from "../../components/common/TopBtn";
import Landing from "./components/Landing";
import OeGraph from "./components/OeGraph";
import OeTip from "./components/OeTip";
import AiOe from "./components/AiOe";
import Recipe from "./components/recipe/Recipe";
import OeIndex from "./components/OEIndex";

function Home() {
  return (
    <>
      <AiOe />
      <TopBtn />
      <Landing />
      <div className="xl:px-[200px]">
        <OeIndex />
        <OeTip />
        <OeGraph />
        <Recipe />
      </div>
    </>
  );
}

export default Home;
