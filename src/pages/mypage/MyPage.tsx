import Button from "../../components/Button";
import OEIndex from "../home/components/OEIndex";

function MyPage() {
  return (
    <div>
      <div className="w-full flex py-4">
        <div className="w-full flex gap-2 items-center">
          <div className="w-[48px] h-[48px] rounded-full bg-white p-2 text-black"></div>
          <h6 className="font-h6">떠들썩한아몬드</h6>
        </div>
        <Button size="small">프로필 편집</Button>
      </div>
      <OEIndex/>
    </div>
  );
}

export default MyPage;
