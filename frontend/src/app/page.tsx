import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Create Eigenpod",
    description: "",
    image: "",
  },
  {
    title: "Generate Validator Keys",
    description: "",
    image: "",
  },
  {
    title: "Select Operators ",
    description: "",
    image: "",
  },
  {
    title: "Distribute Keys",
    description: "",
    image: "",
  },
  {
    title: "Stake Ethereum",
    description: "",
    image: "",
  },
];

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
        {/* https://cdn.prod.website-files.com/64053c5d931f167ecf5997be/6405771ffb64702144b3da4a_el-logo-p-500.png */}
      </div>

      <div className="bg-secondary text-primary py-10 px-20 shadow-[inset_0px_2px_10px_0px_#00000024] rounded-3xl min-h[90svh] flex flex-col justify-between items-center relative gap-14 overflow-hidden">
        <div className="max-w-2xl text-primary font-semibold">
          Native ETH re-staking is broken, and we are here to fix it. With
          Tesseract you can run your own validator using SSV Network and
          Eigenlayer in just a few simple steps.
        </div>

        {/* <div className="size-[400px] bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full absolute -right-36 -bottom-56" /> */}

        {/* <div className="size-[600px] bg-gradient-to-b from-primary to-primary/55 rounded-full absolute -right-5 transform -translate-y-1/2 top-1/2" />
        <div className="size-[400px] bg-gradient-to-b from-primary/90 via-primary/70 to-primary/55 rounded-full absolute -right-40 -bottom-40" /> */}
        {/* <div className="size-[600px] bg rounded-full absolute -right-5 transform -translate-y-1/2 top-1/2" /> */}
        {/* <Image
          src={"/board.png"}
          width={1000}
          height={1000}
          alt="board"
          className=""
        /> */}

        <Carousel className="w-full ">
          <CarouselContent className="max-w-2xl">
            {steps.map((step, idx) => (
              <CarouselItem className="w-full shadow-xl">
                <Card
                  key={idx}
                  className="w-full bg-primary rounded-xl py-6 border-0"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-secondary">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={"/eth.avif"}
                      width={1000}
                      height={1000}
                      alt="eth logo"
                      className="w-4/12 mx-auto"
                    />
                    <div className="text-secondary font-semibold max-w-2xl mx-auto">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptates saepe, non itaque laudantium, odio laboriosam
                      ratione animi, consectetur ea repellendus qui modi? Labore
                      reprehenderit reiciendis maiores maxime ut, doloribus
                      voluptate?
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="space-y-3">
          <div className="text-gray-500 font-semibold text-sm">Powered by</div>
          <div className="flex items-center justify-center gap-5">
            <div className="md:w-48 h-20 b-white px-4 py-2 rounded-xl flex items-center justify-center">
              <Image
                src={
                  "https://ssv.network/wp-content/uploads/logos/logo-ssv-full.svg"
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
