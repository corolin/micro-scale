export default function Loading() {
  return (
    <div className="min-h-dvh flex flex-col pt-20 gap-6 mx-auto">
      <div className="justify-center items-center flex flex-col">
        <h1 className="font-heading leading-none text-3xl text-zinc-800 text-center">
          Fetching the image...
        </h1>
        <p className="text-zinc-500 text-center mt-4 max-w-[30rem] text-balance">
          Please wait while we fetch the upscaled image for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full h-full">
        <div className="w-full aspect-square max-w-96 mx-auto bg-zinc-100 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}
