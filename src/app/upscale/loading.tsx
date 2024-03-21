export default function Loading() {
  return (
    <div className="flex items-center justify-center mb-10">
      <div className="w-1/2 aspect-square grid content-start">
        <div className="p-4 bg-zinc-100 border border-dashed w-full h-full animate-pulse aspect-square rounded-lg"></div>
        <div className="p-4 bg-zinc-100 border border-zinc-200 animate-pulse rounded-lg text-zinc-500 text-sm mt-4 grid content-start w-full min-h-16"></div>
      </div>
    </div>
  );
}
