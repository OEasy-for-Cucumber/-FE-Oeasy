import loadingImg from "@/assets/img/loading.webp";
import "./loading.css";

function Loading() {
  return (
    <div className="loader w-full h-svh">
      <img src={loadingImg} alt="로딩 이미지 1" />
      <img src={loadingImg} alt="로딩 이미지 2" />
      <img src={loadingImg} alt="로딩 이미지 3" />
    </div>
  );
}

export default Loading;
