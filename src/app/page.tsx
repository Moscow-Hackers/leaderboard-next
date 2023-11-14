import {
  MoscowHacker,
  PwnCollegeHacker,
  PwnCollegeHackerWithImage,
} from '@/types'
import { getHackers } from '@/lib/getHackers'
import { getPwnCollegeHackers } from '@/lib/getPwnCollegeHackers'
import { getBlurredImage } from '@/lib/getBlurredImage'
import { Leaderboard } from '@/components/Leaderboard'

const getBlurredImages = async (
  hackers: PwnCollegeHacker[]
): Promise<PwnCollegeHackerWithImage[]> =>
  await Promise.all(
    hackers.map(
      async ({ avatar, ...hacker }): Promise<PwnCollegeHackerWithImage> => {
        if (avatar) {
          const image = await getBlurredImage(avatar)
          return { avatar, image, ...hacker }
        } else {
          return { avatar, ...hacker }
        }
      }
    )
  )

async function getData(): Promise<PwnCollegeHackerWithImage[]> {
  const hackers = await getHackers()
  const pwnCollegeHackers = await getPwnCollegeHackers(hackers)
  const pwnCollegeHackersWithImage = await getBlurredImages(pwnCollegeHackers)

  return pwnCollegeHackersWithImage.sort((a, b) => b.solves - a.solves)
}

export default async function Home() {
  const hackers = await getData()
  // console.log('Page loaded', hackers)

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold text-center mb-4 text-slate-800 dark:text-slate-100">
        Moscow Hackers
      </h1>
      <h2 className="text-3xl font-bold text-center mb-4 text-green-400 dark:text-green-300">
        Leaderboard
      </h2>

      <Leaderboard hackers={hackers} />
    </div>
  )
}
