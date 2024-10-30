function Main() {
  return (
    <>
      <section className="border border-red-700 h-screen flex justify-end">
        <div className="border border-blue-700 w-[309px] h-[200px] text-4xl text-right">
          <div className="hidden xl:block">
            <div>EVERYTHING</div>
            <div>YOU NEVER KNEW</div>
            <div className="flex flex-row">
              ABOUT<p className="ml-1 text-green-600">CUCUMBER</p>
            </div>
          </div>
          <h1 className="block xl:hidden">
            EVERYTHING
            <br /> YOU NEVER
            <br /> KNEW ABOUT <span className="text-green-600">CUCUMBER</span>
          </h1>
        </div>
      </section>
    </>
  );
}

export default Main;
