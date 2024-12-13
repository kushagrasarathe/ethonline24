import Image from "next/image";

export default function Home() {
  return (
    <main className="text-center space-y-20 md:max-w-7xl mx-auto relative">
      <div className="bg-primary text-white my-auto min-h-[80svh] w-full rounded-3xl py-10 px-20 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] overflow-hidden">
        <div className="flex items-center justify-between mt-14">
          <video
            src={"/videos/all.mp4"}
            autoPlay
            loop
            muted
            className="w-6/12 z-30"
          />
          <Image
            src={"/eth.avif"}
            width={1000}
            height={1000}
            alt="eth logo"
            className="md:w-7/12 drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="bg-secondary text-primary py-10 px-20 shadow-[inset_0px_2px_10px_0px_#00000024] rounded-3xl min-h[90svh] flex flex-col justify-between items-center relative gap-14 overflow-hidden">
        <div className="max-w-2xl text-primary font-semibold">
          Native ETH re-staking is broken, and we are here to fix it. With
          Tesseract you can run your own validator using SSV Network and
          Eigenlayer in just a few simple steps.
        </div>

        <div className="drop-shadow-2xl w-full p-2 rounded-xl mx-auto bg-white">
          <Image
            src={"/app-flow.jpeg"}
            width={1000}
            height={1000}
            alt="flow"
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="text-gray-500 font-semibold text-sm">Powered by</div>
          <div className="flex items-center justify-center gap-5">
            <div className="md:w-48 h-20 b-white px-4 py-2 rounded-xl flex items-center justify-center">
              <Image
                src={
                  "https://ssv.network/wp-content/uploads/2024/06/logo-1.svg"
                }
                width={1000}
                height={1000}
                alt="ssv logo"
                className="drop-shadow-2xl"
              />
            </div>
            <div className="text-gray-500 font-semibold text-sm">{`&`}</div>
            <div className="md:w-40 h-20 b-white px-4 py-2 rounded-xl flex items-center justify-center">
              <Image
                src={"/eigen.png"}
                width={1000}
                height={1000}
                alt="eigen logo"
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
