import loading from "../../../public/img/loading.gif";

interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps) {
  return (
    <>
      <img src={loading} alt="로딩 중.." className={className} />
    </>
  );
}

export default Loading;
