import loading from "../../../public/img/loading.webm";

interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps) {
  return (
    <video autoPlay muted loop>
      <source src={loading} type="video/webm" className={className} />
    </video>
  );
}

export default Loading;
