function Landing() {
  return (
    <section className="xl:max-w-[1440px] mx-auto h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex justify-end items-center bg-greenoe-950 pr-6 animate-main-title-move">
      <div className="w-full h-[600px] xl:h-full bg-mobile_cucumber xl:bg-web_cucumber bg-no-repeat bg-81% xl:bg-50% animate-mobile-move xl:animate-web-move">
        <div className="h-[600px] xl:h-full flex justify-end items-center xl:items-end leading-none text-right font-LuckiestGuy">
          <div className="hidden xl:block leading-[104%] text-[150px] mb-[75px]">
            <div>EVERYTHING</div>
            <div>YOU NEVER KNEW</div>
            <div className="flex flex-row">
              ABOUT<p className="ml-7 text-greenoe-600 drop-shadow-[2px_2px_20px_rgba(0,200,83,0.25)]">CUCUMBER</p>
            </div>
          </div>

          <div className="flex flex-col leading-[105%] xl:hidden w-[300px] text-[50px] pt-[30px]">
            EVERYTHING
            <div>YOU NEVER</div>
            <div>KNEW ABOUT</div>
            <div className="text-greenoe-600 drop-shadow-[2px_2px_20px_rgba(0,200,83,0.25)]">CUCUMBER</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
