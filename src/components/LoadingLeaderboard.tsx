import { Skeleton } from '@/components/ui/skeleton'

export function LoadingLeaderboard() {
  return (
    <div className="transition flex flex-col gap-1 rounded-lg overflow-hidden w-full">
      <Skeleton className="h-12 w-full rounded-none" />
      <Skeleton className="h-12 w-full rounded-none" />
      <Skeleton className="h-12 w-full rounded-none" />
      <Skeleton className="h-12 w-full rounded-none" />
      <Skeleton className="h-12 w-full rounded-none" />
    </div>
  )
}
