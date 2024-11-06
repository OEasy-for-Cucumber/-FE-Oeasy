function Landing() {
  return (
    <section className="h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex justify-end items-center bg-greenoe-950 pr-6">
      <div className="h-[600px] bg-main_cucumber bg-no-repeat bg-75% animate-background-move">
        <div className="h-[600px] flex justify-end items-center leading-none text-right font-LuckiestGuy bg-piece_1 bg-no-repeat bg-18%">
          <div className="hidden xl:block text-[120px]">
            <div>EVERYTHING</div>
            <div>YOU NEVER KNEW</div>
            <div className="flex flex-row">
              ABOUT<p className="ml-1 text-green-600">CUCUMBER</p>
            </div>
          </div>

          <div className="block xl:hidden text-[50px] bg-piece_2 bg-no-repeat bg-18%">
            EVERYTHING
            <br /> YOU NEVER
            <br /> KNEW ABOUT <span className="text-green-600">CUCUMBER</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
