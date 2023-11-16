import { Suspense } from 'react'

import { Leaderboard } from '@/components/Leaderboard'
import { LoadingLeaderboard } from '@/components/LoadingLeaderboard'

export default async function Home() {
  // console.log('Page loaded', hackers)

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold text-center mb-4 text-slate-800 dark:text-slate-100">
        Moscow Hackers
      </h1>
      <h2 className="text-3xl font-bold text-center mb-4 text-green-400 dark:text-green-300">
        Leaderboard
      </h2>

      <Suspense fallback={<LoadingLeaderboard />}>
        <Leaderboard />
      </Suspense>
    </div>
  )
}
