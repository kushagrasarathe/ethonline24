import Image from "next/image";

export default function Home() {
  return (
    <main className="text-center space-y-20 md:max-w-7xl mx-auto relative">
      {/* <Image
        src={"/board.avif"}
        width={1000}
        height={1000}
        alt="eth logo"
        className="absolute -top-[430px] left-1/2 transform -translate-x-1/2 -z-0"
      /> */}
      <div className="bg-primary text-white my-auto min-h-[80svh] w-full rounded-3xl py-10 px-20 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] overflow-hidden">
        <div className="flex items-center justify-between">
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
        <div>
          Native ETH re-staking is broken, and we are here to fix it. With
          Tesseract you can re-stake your ETH and earn rewards in just a few
          simple steps.
        </div>
      </div>
      <div className="bg-secondary text-primary py-10 px-20 shadow-[inset_0px_2px_10px_0px_#00000024] rounded-3xl min-h-[84svh]">
        <Image
          src={"/board.png"}
          width={1000}
          height={1000}
          alt="board"
          className=""
        />
      </div>
    </main>
  );
}
