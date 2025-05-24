import { Skeleton } from "./ui/skeleton";

export default function TracksTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 justify-between">
        <Skeleton className="w-full h-4 col-span-1" />
        <Skeleton className="w-full h-4 col-span-5" />
        <Skeleton className="w-full h-4 col-span-5" />
        <Skeleton className="w-full h-4 col-span-1" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
