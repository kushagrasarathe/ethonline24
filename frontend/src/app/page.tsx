import Image from "next/image";

export default function Home() {
  return (
    <main className="text-center space-y-20 md:max-w-7xl mx-auto">
      <div className="bg-primary text-white my-auto min-h-[80svh] w-full rounded-3xl py-10 px-20 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] flex items-center justify-between relative z-40">
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
      <div className="bg-secondary text-primary py-10 px-20 shadow-[inset_0px_5px_20px_0px_#00000024] rounded-3xl min-h-[84svh]"></div>
    </main>
  );
}
