function Recipes() {
  return (
    <section className="border border-red-600 h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)]">
      <button className="w-full border px-[24px] py-[16px] rounded-lg border-greenoe-600 bg-greenoe-50 bg-recipes_btn_bg bg-no-repeat bg-right bg-contain text-black text-left ">
        <div className="text-sm xl:text-base">Oeasy픽</div>
        <div className="font-h5 xl:text-2xl">
          오늘의 <span className="text-greenoe-600">오이요리</span> 추천 받기
        </div>
      </button>
    </section>
  );
}

export default Recipes;
