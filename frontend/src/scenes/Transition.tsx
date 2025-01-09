import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Transition = () => {
  return (
    <main className="flex items-center justify-center h-full p-8 bg-gray-200">
      <div className="flex flex-col items-center gap-x-4">
        <div className="w-32 h-32">
          <DotLottieReact
            src="https://lottie.host/3532e162-9ca3-4815-bd33-5c79d3a9f4c4/NPkrJdnscl.lottie"
            loop
            autoplay
            width={150}
            height={150}
          />
        </div>
      </div>
    </main>
  );
};

export default Transition;
