function Landing() {
  return (
    <section className="h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex justify-end items-center bg-greenoe-950 pr-6">
      <div className="w-full h-[600px] bg-main_cucumber bg-no-repeat bg-75% animate-background-move">
        <div className="h-[600px] flex justify-end items-center leading-none text-right font-LuckiestGuy">
          <div className="hidden xl:block text-[120px]">
            <div>EVERYTHING</div>
            <div>YOU NEVER KNEW</div>
            <div className="flex flex-row">
              ABOUT<p className="ml-1 text-green-600">CUCUMBER</p>
            </div>
          </div>

          <div className="flex flex-col leading-[105%] xl:hidden w-[300px] text-[50px] pt-[30px]">
            EVERYTHING
            <div>YOU NEVER</div>
            <div>KNEW ABOUT</div>
            <div className="text-green-600">CUCUMBER</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
