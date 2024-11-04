function Landing() {
  return (
    <section className="h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex justify-end items-center bg-greenoe-950 pr-6">
      <div className="w-[309px] xl:w-[95%] h-[210px] xl:h-[60%] flex justify-end items-center leading-none text-right font-LuckiestGuy">
        <div className="hidden xl:block text-[120px]">
          <div>EVERYTHING</div>
          <div>YOU NEVER KNEW</div>
          <div className="flex flex-row">
            ABOUT<p className="ml-1 text-green-600">CUCUMBER</p>
          </div>
        </div>
        <h1 className="block xl:hidden text-[50px]">
          EVERYTHING
          <br /> YOU NEVER
          <br /> KNEW ABOUT <span className="text-green-600">CUCUMBER</span>
        </h1>
      </div>
    </section>
  );
}

export default Landing;
