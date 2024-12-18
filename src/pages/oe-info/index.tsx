import dadagi from "@/assets/img/info_cucumber.webp";
import growOE1 from "@/assets/img/oe1.webp";
import growOE2 from "@/assets/img/oe2.webp";
import growOE3 from "@/assets/img/oe3.webp";
import growOE4 from "@/assets/img/oe4.webp";
import growOE5 from "@/assets/img/oe5.webp";
import growOE6 from "@/assets/img/oe6.webp";
import { useEffect, useRef } from "react";

function OeInfo() {
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          entry.target.classList.remove("opacity-0");
        } else {
          entry.target.classList.remove("animate-slide-up");
          entry.target.classList.add("opacity-0");
        }
      });
    }, options);

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  return (
    <>
      <div>
        <div
          className={`font-LuckiestGuy bg-info_cucumber w-full h-[480px] xl:h-[400px] bg-cover bg-center bg-no-repeat flex justify-center items-center text-[60px] xl:text-[80px]`}
        >
          <p>cucumber</p>
        </div>
        <div className="w-full flex flex-col">
          <div className=" mx-6 xl:w-[1040px] my-20 flex flex-col gap-[104px] xl:mx-auto">
            <div className="w-full h-auto flex flex-col ">
              <p className="mx-auto font-h3 xl:font-h2 text-greenoe-600 mb-10">오이의 효능</p>
              <p className="mb-5 font-b1-semibold xl:font-h5" ref={addToRefs}>
                오이는 약 95% 정도가 수분으로 이루어져 있으며 청량감이 크고 아삭거리는 식감이 특징입니다. 비타민C가
                함유되어 있어 피부 미용과 보습효과가 좋으며 칼륨이 들어 있어 수분과 함께 이뇨 작용을 도와 숙취 해소에
                도움이 되고 나트륨의 배출도 돕습니다. 이때 체내의 중금속도 함께 배출 되어 피를 맑게 하는 효과가
                있습니다.
              </p>
              <p className="font-b1-semibold xl:font-h5" ref={addToRefs}>
                오이는 차가운 성질을 가지고 있어 체내의 열을 진정시켜 여드름 예방과 땀띠를 진정시키는데 좋으며 화상을
                입었을 때 오이를 갈아서 붙여놓으면 열독을 사라지게 하고 피부를 보호합니다. 또한 미네랄인 이산화규소가
                머리카락, 손톱, 발톱을 윤기 나고 강하게 해주며 모발 성장을 촉진하는 효과가 있습니다.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <p className="mx-auto font-h3 xl:font-h2 text-greenoe-600 mb-16">오이 품종</p>
              <div className="flex flex-col gap-12 xl:gap-20">
                <div className="flex-1 xl:flex xl:justify-between">
                  <p className="font-h4 xl:font-h2" ref={addToRefs}>
                    백다다기 오이
                  </p>
                  <div className="flex flex-col xl:w-[700px]">
                    <img
                      src={dadagi}
                      alt="백다다기 오이"
                      className="w-full h-[312px] rounded-lg my-6 xl:mb-10 xl:mt-0"
                      ref={addToRefs}
                    />
                    <div className="font-b1-semibold xl:font-h5 flex flex-col gap-5">
                      <p ref={addToRefs}>
                        백다다기오이는 눈마다 열매가 다닥다닥 열리는 특징 때문에 이름이 붙었습니다. 반백계 오이로
                        <span className="text-greenoe-600">
                          {" "}
                          연한 녹색을 띠며 씨가 적고 단단해 저장성이 뛰어납니다.
                        </span>
                      </p>
                      <p ref={addToRefs}>
                        이러한 특징 덕분에
                        <span className="text-greenoe-600"> 생으로 먹거나 샐러드, 오이지 담는 용도로 적합</span>합니다.
                        오이의 약 2/3는 연한 연둣빛을 띠며 겉면의 침 색깔에 따라 흑침계와 백침계로 나뉩니다.
                      </p>
                      <p ref={addToRefs}>
                        이 오이는 전국에서 연중 재배되며 특히 <span className="text-greenoe-600">4월과 5월이 제철</span>
                        입니다. 한국농촌경제연구원에 따르면 2018년 기준으로 가정에서
                        <span className="text-greenoe-600">가장 많이 소비된 오이 품종</span>이기도 합니다. 소비 비중이
                        무려 75%에 달하며 전국적으로 많은 사랑을 받고 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 xl:flex xl:justify-between">
                  <p className="font-h4 xl:font-h2" ref={addToRefs}>
                    취청 오이
                  </p>
                  <div className="flex flex-col xl:w-[688px]">
                    <img
                      src={dadagi}
                      alt="취청 오이"
                      className="w-full h-[312px] rounded-lg my-6 xl:mb-10 xl:mt-0"
                      ref={addToRefs}
                    />
                    <div className="font-b1-semibold xl:font-h5 flex flex-col gap-5">
                      <p ref={addToRefs}>
                        취청오이는 진한 녹색을 띠며 가시오이에 비해
                        <span className="text-greenoe-600"> 가시가 적고 표면이 매끄러운 것</span>이 특징입니다. 주로
                        호남 지역에서 생산되며 추위에 강해 겨울철에도 재배가 용이합니다.
                      </p>
                      <p ref={addToRefs}>
                        껍질이 단단하고 씨가 적어
                        <span className="text-greenoe-600"> 생으로 먹기에 적합한 품종으로 냉면 고명이나 냉국 재료</span>
                        로 많이 활용됩니다. 밝은 청록색의 외관과 무른 속살 덕분에 여름철 상큼한 요리에 자주 사용됩니다.
                      </p>
                      <p ref={addToRefs}>
                        ‘청오이’라는 별칭으로도 불리며 깔끔한 맛과 아삭한 식감으로 많은 사랑을 받고 있습니다. 겨울철에는
                        <span className="text-greenoe-600"> 남부 지방의 실내 재배로 공급이 지속</span>
                        됩니다. 특히 여름철에 시원한 요리로 인기를 얻는 오이 품종입니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 xl:flex xl:justify-between">
                  <p className="font-h4 xl:font-h2" ref={addToRefs}>
                    가시 오이
                  </p>
                  <div className="flex flex-col xl:w-[688px]">
                    <img
                      src={dadagi}
                      alt="가시 오이"
                      ref={addToRefs}
                      className="w-full h-[312px] rounded-lg my-6 xl:mb-10 xl:mt-0"
                    />
                    <div className="font-b1-semibold xl:font-h5 flex flex-col gap-5">
                      <p ref={addToRefs}>
                        가시오이는
                        <span className="text-greenoe-600"> 짙은 녹색과 겉면의 많은 가시, 주름</span>이 특징인
                        오이입니다. 껍질은 얇고 속살은 아삭아삭해 씹는 맛이 좋아 무침, 냉채, 샐러드 등 다양한 요리에
                        활용됩니다.{" "}
                      </p>
                      <p ref={addToRefs}>
                        더위와 병해에 강하지만 추위에는 약해 주로
                        <span className="text-greenoe-600"> 영남 지역에서 봄과 여름철에 재배</span>됩니다. 상온에서도
                        6~7일 정도 신선함을 유지할 수 있어 저장성이 좋은 편입니다.
                      </p>
                      <p ref={addToRefs}>
                        <span className="text-greenoe-600">단맛과 강한 향</span>을 지니고 있어 풍미가 돋보이며
                        <span className="text-greenoe-600"> 수분 함량이 높아 더운 날씨에 특히 잘 어울리는 품종</span>
                        입니다. 등산이나 야외 활동 시 간편하게 즐길 수 있는 건강한 간식으로도 적합합니다. 생김새와
                        식감에서 오는 독특한 매력으로 많은 사랑을 받고 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <p className="mx-auto font-h3 xl:font-h2 text-greenoe-600 mb-10">오이의 성장과정</p>
              <div className="grid grid-cols xl:grid-cols-2 gap-y-16 xl:gap-y-24 max-w-7xl relative font-b1-semibold xl:font-h6">
                <div className="w-[230px] justify-self-start xl:w-[424px] xl:col-start-1">
                  <img
                    src={growOE1}
                    alt="새싹 발아"
                    className="rounded-lg w-full h-[184px] xl:h-[336px] object-cover"
                    ref={addToRefs}
                  />
                  <p className=" pt-2" ref={addToRefs}>
                    1. 오이 파종 후 새싹 발아
                  </p>
                </div>

                <div className="w-[230px] xl:w-[424px] xl:col-start-2 justify-self-end xl:mt-[250px]">
                  <img
                    src={growOE2}
                    alt="새싹 발아"
                    className="rounded-lg w-full h-[184px] xl:h-[336px] object-cover"
                    ref={addToRefs}
                  />
                  <p className="pt-2" ref={addToRefs}>
                    2. 오이 파종 후 새싹 발아
                  </p>
                </div>

                <div className="w-[230px] justify-self-start xl:w-[424px] xl:col-start-1 xl:mt-[-200px] xl:ml-[100px]">
                  <img
                    src={growOE3}
                    alt="새싹 발아"
                    className="rounded-lg w-full h-[184px] xl:h-[336px] object-cover"
                    ref={addToRefs}
                  />
                  <p className="pt-2" ref={addToRefs}>
                    3. 오이 파종 후 새싹 발아
                  </p>
                </div>

                <div className="w-[230px] xl:w-[424px] xl:col-start-2 justify-self-end xl:mt-[230px] xl:mr-40">
                  <img
                    src={growOE4}
                    alt="새싹 발아"
                    className="rounded-lg w-full h-[184px] xl:h-[336px] object-cover"
                    ref={addToRefs}
                  />
                  <p className="pt-2" ref={addToRefs}>
                    4. 오이 파종 후 새싹 발아
                  </p>
                </div>

                <div className="w-[230px] xl:w-[424px] xl:col-start-1 xl:mt-[-20px]">
                  <img
                    src={growOE5}
                    alt="새싹 발아"
                    className="rounded-lg w-full h-[184px] xl:h-[336px] object-cover"
                    ref={addToRefs}
                  />
                  <p className="pt-2" ref={addToRefs}>
                    5. 오이 파종 후 새싹 발아
                  </p>
                </div>
                <div className="w-[312px] xl:w-[668px] justify-self-center xl:col-start-2 xl:mt-[450px] xl:mr-[400px]">
                  <img
                    src={growOE6}
                    alt="새싹 발아"
                    className="rounded-lg w-[312px] h-[184px] xl:w-[668px] xl:h-[336px] object-cover"
                    ref={addToRefs}
                  />
                  <p className="pt-2" ref={addToRefs}>
                    6. 오이 재배 완료
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OeInfo;
