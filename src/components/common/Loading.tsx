import loading from "../../../public/img/loading.webm";

function Loading() {
  return (
    <div className="w-full h-svh">
    <video autoPlay muted loop 
     playsInline
     style={{
       width: "500px", 
       height: "400px",
       position: "absolute",
       top: "50%",   
       left: "50%",
       transform: "translate(-50%, -50%)", 
     }}>
      <source src={loading} type="video/webm" />
    </video>
    </div>
  );
}

export default Loading;
