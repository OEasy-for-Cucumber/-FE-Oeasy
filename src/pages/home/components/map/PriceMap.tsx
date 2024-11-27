import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import mapSvg from "../../../../assets/southKoreaLow.svg";

function PriceMap() {
  const [regionColors, setRegionColors] = useState<{ [key: string]: string }>({});

  const handleRegionClick = (event: Event) => {
    const target = event.target as SVGElement; // 네이티브 이벤트의 `target`을 사용
    const regionId = target.id;
    if (!regionId) return;

    setRegionColors((prev) => ({
      ...prev,
      [regionId]: prev[regionId] === "red" ? "#ccc" : "red", // 색상 토글
    }));

    target.style.fill = regionColors[regionId] === "red" ? "#ccc" : "red"; // 동적 스타일 적용
  };

  return (
    <div className="w-full mx-auto">
      <ReactSVG
        src={mapSvg}
        beforeInjection={(svg) => {
          svg.addEventListener("click", handleRegionClick); // 네이티브 이벤트를 추가
        }}
      />
    </div>
  );
}

export default PriceMap;
