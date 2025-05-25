import { Skeleton } from "./ui/skeleton";

export default function SquareSkeletons({ count = 5 }: { count?: number }) {
  return (
    <div className="grid items-stretch gap-8 mt-4 grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={"recently_played_" + index}
          className="aspect-square col-span-1 w-full rounded-md"
        />
      ))}
    </div>
  );
}
